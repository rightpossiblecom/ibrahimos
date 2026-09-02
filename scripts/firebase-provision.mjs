/**
 * Provision IbrahimOS on the signed-in Firebase CLI account.
 * Writes .env.local. Never prints secrets.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "ibrahimos-ops";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storePath = path.join(homedir(), ".config", "configstore", "firebase-tools.json");

function loadStore() {
  const store = JSON.parse(readFileSync(storePath, "utf8"));
  if (!store.tokens?.refresh_token) {
    throw new Error("Firebase CLI is not logged in.");
  }
  return store;
}

async function refreshAccessToken(store) {
  if (store.tokens.access_token && Number(store.tokens.expires_at) > Date.now() + 60_000) {
    return store.tokens.access_token;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: store.tokens.refresh_token,
    client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e2.apps.googleusercontent.com",
    client_secret: "jEQVZheiYAUAKFS_WHpR89zx",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`token refresh failed ${res.status}`);
  const json = await res.json();
  return json.access_token;
}

async function api(token, method, url, payload) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text.slice(0, 400) };
  }
  return { status: res.status, json };
}

async function waitOp(token, name, { timeoutMs = 180_000 } = {}) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const result = await api(token, "GET", `https://cloudresourcemanager.googleapis.com/v1/${name}`);
    if (result.json?.done || result.status === 404) return result;
    const firestoreOp = await api(token, "GET", `https://firestore.googleapis.com/v1/${name}`);
    if (firestoreOp.json?.done) return firestoreOp;
    const keysOp = await api(token, "GET", `https://apikeys.googleapis.com/v2/${name}`);
    if (keysOp.json?.done || keysOp.json?.keyString) return keysOp;
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }
  return { status: 408, json: { error: { message: "operation timeout" } } };
}

function readEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return {};
  const values = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    values[match[1]] = match[2];
  }
  return values;
}

function writeEnvLocal(values) {
  const lines = Object.entries(values)
    .filter(([, value]) => value != null && value !== "")
    .map(([key, value]) => `${key}=${value}`);
  writeFileSync(path.join(ROOT, ".env.local"), `${lines.join("\n")}\n`, "utf8");
}

async function main() {
  const store = loadStore();
  const token = await refreshAccessToken(store);
  const email = store.user?.email ?? "unknown";
  const report = { account: email, project: PROJECT_ID, steps: [] };

  const services = [
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "cloudbilling.googleapis.com",
    "firestore.googleapis.com",
    "apikeys.googleapis.com",
    "identitytoolkit.googleapis.com",
    "firebase.googleapis.com",
    "serviceusage.googleapis.com",
  ];
  for (const service of services) {
    const result = await api(
      token,
      "POST",
      `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/${service}:enable`,
    );
    report.steps.push({
      step: "enable",
      service,
      status: result.status,
      error: result.json?.error?.message ?? null,
    });
  }

  const addFirebase = await api(
    token,
    "POST",
    `https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}:addFirebase`,
    {},
  );
  report.steps.push({
    step: "addFirebase",
    status: addFirebase.status,
    error: addFirebase.json?.error?.message ?? addFirebase.json?.error?.status ?? null,
  });

  const billingAccounts = await api(token, "GET", "https://cloudbilling.googleapis.com/v1/billingAccounts");
  const accounts = billingAccounts.json?.billingAccounts ?? [];
  report.steps.push({
    step: "billingAccounts",
    status: billingAccounts.status,
    count: accounts.length,
    open: accounts.filter((item) => item.open).length,
  });

  if (accounts.some((item) => item.open)) {
    const accountName = accounts.find((item) => item.open).name;
    const linked = await api(
      token,
      "PUT",
      `https://cloudbilling.googleapis.com/v1/projects/${PROJECT_ID}/billingInfo`,
      { billingAccountName: accountName },
    );
    report.steps.push({
      step: "linkBilling",
      status: linked.status,
      error: linked.json?.error?.message ?? null,
    });
  }

  const firestoreGet = await api(
    token,
    "GET",
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)`,
  );
  report.steps.push({
    step: "firestoreGet",
    status: firestoreGet.status,
    type: firestoreGet.json?.type ?? null,
    error: firestoreGet.json?.error?.message ?? null,
  });

  if (firestoreGet.status === 404) {
    const created = await api(
      token,
      "POST",
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases?databaseId=(default)`,
      { type: "FIRESTORE_NATIVE", locationId: "nam5" },
    );
    report.steps.push({
      step: "firestoreCreate",
      status: created.status,
      name: created.json?.name ?? null,
      error: created.json?.error?.message ?? null,
    });
    if (created.json?.name) {
      await waitOp(token, created.json.name);
    }
  }

  const initAuth = await api(
    token,
    "POST",
    `https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/identityPlatform:initializeAuth`,
    {},
  );
  report.steps.push({
    step: "initializeAuth",
    status: initAuth.status,
    error: initAuth.json?.error?.message ?? null,
  });

  const patchAuth = await api(
    token,
    "PATCH",
    `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT_ID}/config?updateMask=signIn.email,authorizedDomains`,
    {
      signIn: { email: { enabled: true, passwordRequired: true } },
      authorizedDomains: ["localhost", "ibrahimos.vercel.app", "ibrahimos.top"],
    },
  );
  report.steps.push({
    step: "patchAuth",
    status: patchAuth.status,
    error: patchAuth.json?.error?.message ?? null,
  });

  const existingKeys = await api(
    token,
    "GET",
    `https://apikeys.googleapis.com/v2/projects/${PROJECT_ID}/locations/global/keys`,
  );
  let apiKey = null;
  const keyNames = existingKeys.json?.keys ?? [];
  report.steps.push({
    step: "listKeys",
    status: existingKeys.status,
    count: keyNames.length,
    error: existingKeys.json?.error?.message ?? null,
  });

  if (keyNames[0]?.name) {
    const keyGet = await api(token, "GET", `https://apikeys.googleapis.com/v2/${keyNames[0].name}/keyString`);
    apiKey = keyGet.json?.keyString ?? null;
    report.steps.push({ step: "getKey", status: keyGet.status, hasKey: Boolean(apiKey) });
  } else {
    const createdKey = await api(
      token,
      "POST",
      `https://apikeys.googleapis.com/v2/projects/${PROJECT_ID}/locations/global/keys`,
      {
        displayName: "IbrahimOS web",
        restrictions: {
          apiTargets: [
            { service: "identitytoolkit.googleapis.com" },
            { service: "securetoken.googleapis.com" },
            { service: "firestore.googleapis.com" },
          ],
        },
      },
    );
    report.steps.push({
      step: "createKey",
      status: createdKey.status,
      hasKey: Boolean(createdKey.json?.keyString),
      op: createdKey.json?.name ?? null,
      error: createdKey.json?.error?.message ?? null,
    });
    apiKey = createdKey.json?.keyString ?? createdKey.json?.response?.keyString ?? null;
    if (!apiKey && createdKey.json?.name) {
      const done = await waitOp(token, createdKey.json.name);
      apiKey = done.json?.response?.keyString ?? done.json?.keyString ?? null;
      report.steps.push({ step: "createKeyOp", status: done.status, hasKey: Boolean(apiKey) });
    }
  }

  const saId = "ibrahimos-app";
  const saEmail = `${saId}@${PROJECT_ID}.iam.gserviceaccount.com`;
  const saGet = await api(
    token,
    "GET",
    `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts/${saEmail}`,
  );
  if (saGet.status === 404) {
    const saCreate = await api(
      token,
      "POST",
      `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts`,
      { accountId: saId, serviceAccount: { displayName: "IbrahimOS app" } },
    );
    report.steps.push({
      step: "createServiceAccount",
      status: saCreate.status,
      error: saCreate.json?.error?.message ?? null,
    });
    await new Promise((resolve) => setTimeout(resolve, 8000));
  } else {
    report.steps.push({ step: "serviceAccount", status: saGet.status, exists: true });
  }

  const policyGet = await api(
    token,
    "POST",
    `https://cloudresourcemanager.googleapis.com/v1/projects/${PROJECT_ID}:getIamPolicy`,
    {},
  );
  const policy = policyGet.json ?? { bindings: [] };
  const roles = ["roles/datastore.user", "roles/firebase.admin", "roles/iam.serviceAccountTokenCreator"];
  const bindings = policy.bindings ?? [];
  for (const role of roles) {
    const existing = bindings.find((item) => item.role === role);
    const member = `serviceAccount:${saEmail}`;
    if (existing) {
      existing.members = Array.from(new Set([...(existing.members ?? []), member]));
    } else {
      bindings.push({ role, members: [member] });
    }
  }
  const policySet = await api(
    token,
    "POST",
    `https://cloudresourcemanager.googleapis.com/v1/projects/${PROJECT_ID}:setIamPolicy`,
    { policy: { ...policy, bindings } },
  );
  report.steps.push({
    step: "setIamPolicy",
    status: policySet.status,
    error: policySet.json?.error?.message ?? null,
  });

  const keyCreate = await api(
    token,
    "POST",
    `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts/${saEmail}/keys`,
    { keyAlgorithm: "KEY_ALG_RSA_2048", privateKeyType: "TYPE_GOOGLE_CREDENTIALS_FILE" },
  );
  const saJson = keyCreate.json?.privateKeyData
    ? Buffer.from(keyCreate.json.privateKeyData, "base64").toString("utf8")
    : null;
  report.steps.push({
    step: "serviceAccountKey",
    status: keyCreate.status,
    hasKey: Boolean(saJson),
    error: keyCreate.json?.error?.message ?? null,
  });

  const currentEnv = readEnvLocal();
  const sessionSecret = currentEnv.IBRAHIMOS_SESSION_SECRET || randomBytes(32).toString("hex");
  const nextEnv = {
    ...currentEnv,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: `${PROJECT_ID}.firebaseapp.com`,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: `${PROJECT_ID}.appspot.com`,
    IBRAHIMOS_SESSION_SECRET: sessionSecret,
  };
  if (apiKey) nextEnv.NEXT_PUBLIC_FIREBASE_API_KEY = apiKey;
  if (saJson) {
    delete nextEnv.FIREBASE_SERVICE_ACCOUNT;
    nextEnv.FIREBASE_SERVICE_ACCOUNT_B64 = Buffer.from(saJson).toString("base64");
  }
  writeEnvLocal(nextEnv);

  report.envWritten = true;
  report.hasApiKey = Boolean(apiKey);
  report.hasServiceAccount = Boolean(saJson);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(`[provision] ${error.message}`);
  process.exit(1);
});
