/**
 * Upsert .env.local onto the linked Vercel project (production, preview, development).
 * Prints key names and HTTP status only. Never prints values or the CLI token.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const TARGETS = ["production", "preview", "development"];
const AUTH_PATH = join(homedir(), "AppData/Roaming/xdg.data/com.vercel.cli/auth.json");

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
  const auth = JSON.parse(readFileSync(AUTH_PATH, "utf8"));
  if (!auth.token) throw new Error("Vercel auth.json has no token. Run vercel login as rightpossiblecom.");
  return auth.token;
}

async function upsert(token, projectId, teamId, name, value) {
  const url = `https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}&upsert=true`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: name,
      value,
      type: "encrypted",
      target: TARGETS,
    }),
  });
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

  console.log(`keys=${pairs.map((item) => item.name).join(",")}`);
  console.log(`ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main();
