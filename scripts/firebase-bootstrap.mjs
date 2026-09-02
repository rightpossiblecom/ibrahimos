/**
 * Bootstrap IbrahimOS on the signed-in Firebase CLI account.
 * Tokens stay in-process. Nothing secret is printed.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "ibrahimos-ops";
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
    body: payload ? JSON.stringify(payload) : undefined,
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

async function main() {
  const command = process.argv[2] ?? "status";
  const store = loadStore();
  const token = await refreshAccessToken(store);
  const email = store.user?.email ?? "unknown";
  console.log(`[bootstrap] account=${email} project=${PROJECT_ID} cmd=${command}`);

  if (command === "available") {
    const result = await api(
      token,
      "GET",
      "https://firebase.googleapis.com/v1beta1/availableProjects",
    );
    console.log(JSON.stringify({ status: result.status, count: result.json?.projectInfo?.length ?? 0 }));
    return;
  }

  if (command === "add") {
    const result = await api(
      token,
      "POST",
      `https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}:addFirebase`,
      {},
    );
    console.log(JSON.stringify({ status: result.status, error: result.json?.error?.message ?? null }));
    return;
  }

  if (command === "enable") {
    const services = [
      "firebase.googleapis.com",
      "firestore.googleapis.com",
      "identitytoolkit.googleapis.com",
      "firebasehosting.googleapis.com",
      "securetoken.googleapis.com",
    ];
    for (const service of services) {
      const result = await api(
        token,
        "POST",
        `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/${service}:enable`,
      );
      console.log(JSON.stringify({ service, status: result.status, error: result.json?.error?.message ?? null }));
    }
    return;
  }

  if (command === "firestore") {
    const result = await api(
      token,
      "POST",
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases?databaseId=(default)`,
      { type: "FIRESTORE_NATIVE", locationId: "nam5" },
    );
    console.log(JSON.stringify({ status: result.status, error: result.json?.error?.message ?? result.json?.name ?? null }));
    return;
  }

  if (command === "auth") {
    const initAttempts = [
      ["POST", `https://identitytoolkit.googleapis.com/v2/projects/${PROJECT_ID}/identityPlatform:initializeAuth`, {}],
      ["POST", `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT_ID}/config`, {}],
    ];
    for (const [method, url, payload] of initAttempts) {
      const result = await api(token, method, url, payload);
      console.log(JSON.stringify({ step: "init", status: result.status, error: result.json?.error?.message ?? null }));
    }
    const result = await api(
      token,
      "PATCH",
      `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT_ID}/config?updateMask=signIn.email,authorizedDomains`,
      {
        signIn: { email: { enabled: true, passwordRequired: true } },
        authorizedDomains: [
          "localhost",
          "ibrahimos.vercel.app",
          "ibrahimos.top",
        ],
      },
    );
    console.log(JSON.stringify({ step: "patch", status: result.status, error: result.json?.error?.message ?? "ok" }));
    return;
  }

  if (command === "apikey") {
    await api(
      token,
      "POST",
      `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/apikeys.googleapis.com:enable`,
    );
    const result = await api(
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
    const key = result.json?.keyString ?? null;
    console.log(JSON.stringify({ status: result.status, hasKey: Boolean(key), error: result.json?.error?.message ?? null, key }));
    return;
  }

  if (command === "get") {
    const result = await api(
      token,
      "GET",
      `https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}`,
    );
    console.log(JSON.stringify({ status: result.status, state: result.json?.state ?? result.json?.error?.status }));
    return;
  }

  const listed = await api(token, "GET", "https://firebase.googleapis.com/v1beta1/projects");
  const available = await api(
    token,
    "GET",
    "https://firebase.googleapis.com/v1beta1/availableProjects",
  );
  console.log(
    JSON.stringify({
      firebaseProjects: listed.status,
      firebaseCount: listed.json?.results?.length ?? listed.json?.error?.message ?? 0,
      availableStatus: available.status,
      availableCount: available.json?.projectInfo?.length ?? 0,
      availableIds: (available.json?.projectInfo ?? []).map((item) => item.project),
    }),
  );
}

main().catch((error) => {
  console.error(`[bootstrap] ${error.message}`);
  process.exit(1);
});
