/**
 * Upsert the house .env.local onto the linked Vercel project.
 *
 * Run from the house folder (where .vercel/project.json and .env.local live):
 *   node ..\01docs\push-vercel-env.mjs
 *
 * Writes production + preview + development in one API call per key.
 * Prints key names and HTTP status only. Never prints values or the CLI token.
 *
 * Why this exists: Vercel CLI 54.1.0 in a Cursor agent session cannot add
 * Preview env (git_branch_required). Do not retry vercel env add for Preview.
 * Playbook: 01docs/VERCEL.md
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const TARGETS = ["production", "preview", "development"];
const AUTH_CANDIDATES = [
  join(homedir(), "AppData/Roaming/xdg.data/com.vercel.cli/auth.json"),
  join(homedir(), "AppData/Roaming/com.vercel.cli/Data/auth.json"),
];

function parseEnv(text) {
  const pairs = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    pairs.push({ name: line.slice(0, eq), value: line.slice(eq + 1) });
  }
  return pairs;
}

function loadAuthToken() {
  for (const path of AUTH_CANDIDATES) {
    try {
      const auth = JSON.parse(readFileSync(path, "utf8"));
      if (auth.token) return auth.token;
    } catch {
      // try the next known CLI auth path
    }
  }
  throw new Error("Vercel CLI has no token. vercel login as rightpossiblecom, then retry.");
}

function api(path, token, init = {}) {
  return fetch(`https://api.vercel.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

async function upsert(token, projectId, teamId, name, value) {
  const res = await api(
    `/v10/projects/${projectId}/env?teamId=${teamId}&upsert=true`,
    token,
    {
      method: "POST",
      body: JSON.stringify({
        key: name,
        value,
        type: "encrypted",
        target: TARGETS,
      }),
    },
  );
  const body = await res.text();
  let reason = "";
  try {
    const parsed = JSON.parse(body);
    reason = parsed.error?.code || parsed.error?.message || parsed.reason || parsed.message || "";
  } catch {
    reason = body.slice(0, 120);
  }
  return { ok: res.ok, status: res.status, reason };
}

async function removeDevelopmentOrphans(token, projectId, teamId) {
  const res = await api(`/v9/projects/${projectId}/env?teamId=${teamId}`, token);
  if (!res.ok) {
    console.log(`WARN env-list ${res.status}`);
    return 0;
  }
  const data = await res.json();
  const envs = data.envs || [];
  const byKey = new Map();
  for (const item of envs) {
    const rows = byKey.get(item.key) || [];
    rows.push({
      id: item.id,
      target: (item.target || []).slice().sort().join(","),
    });
    byKey.set(item.key, rows);
  }

  let removed = 0;
  for (const [key, rows] of byKey) {
    const full = rows.find((row) => row.target.includes("production") && row.target.includes("preview"));
    const orphans = rows.filter((row) => row.target === "development");
    if (!full || !orphans.length) continue;
    for (const orphan of orphans) {
      const del = await api(
        `/v9/projects/${projectId}/env/${orphan.id}?teamId=${teamId}`,
        token,
        { method: "DELETE" },
      );
      console.log(`${del.ok ? "RM" : "KEEP"} ${key} development-only ${del.status}`);
      if (del.ok) removed += 1;
    }
  }
  return removed;
}

async function main() {
  const project = JSON.parse(readFileSync(".vercel/project.json", "utf8"));
  const token = loadAuthToken();
  const pairs = parseEnv(readFileSync(".env.local", "utf8"));
  let ok = 0;
  let fail = 0;

  for (const { name, value } of pairs) {
    const result = await upsert(token, project.projectId, project.orgId, name, value);
    if (result.ok) {
      ok += 1;
      console.log(`OK ${name} ${result.status}`);
    } else {
      fail += 1;
      console.log(`FAIL ${name} ${result.status} ${result.reason}`.trim());
    }
  }

  const removed = await removeDevelopmentOrphans(token, project.projectId, project.orgId);
  console.log(`keys=${pairs.map((item) => item.name).join(",")}`);
  console.log(`ok=${ok} fail=${fail} orphans-removed=${removed}`);
  if (fail) process.exit(1);
}

main();
