/**
 * Capture high-value dashboard screenshots for /product gallery.
 * Requires: pnpm exec playwright + local next dev with a live desk.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "product");
const base = process.env.SHOT_BASE_URL ?? "http://localhost:3044";

const shots = [
  { name: "desk-command.png", path: "/dashboard", wait: "text=Farm command", scroll: "Farm command" },
  { name: "desk-incident.png", path: "/projects/evidence-north-block-04", wait: "text=Fall armyworm", scroll: "Fall armyworm" },
  { name: "desk-intake.png", path: "/new", wait: "text=New incident", scroll: "New incident" },
  { name: "desk-fields.png", path: "/fields", wait: "text=Blocks", scroll: "Blocks" },
  { name: "desk-market.png", path: "/market", wait: "text=Prices", scroll: "Prices" },
  { name: "desk-weather.png", path: "/weather", wait: "text=Kaduna window", scroll: "Kaduna window" },
];

const seedAssessment = {
  id: "evidence-north-block-04",
  createdAt: "2026-09-01T06:00:00.000Z",
  input: {
    mode: "upload",
    crop: "Maize",
    symptom: "Chewed whorls, fresh frass, and ragged leaf windows across three hot zones",
    location: "Kaduna, NG",
    farmSizeHa: 86,
    fieldName: "North Block 04",
    imageName: "north-block-04-leaf-scout.jpg",
    artifactName: "north-block-04-field-evidence.zip",
  },
  disease: "Fall armyworm outbreak",
  category: "pest",
  confidence: 94,
  treatment: [
    "Confirm larval pressure in each affected zone before the first spray pass",
    "Stage selective insect control with the North Block 04 response crew",
    "Tighten perimeter scouting so edge spread is logged before dusk",
  ],
  estimatedImpact: "18.4 hectares at risk if the response slips beyond the six-hour action window",
  fertilizerNote:
    "Hold foliar feeding inside the affected rows until larval pressure drops after treatment.",
  weatherNote: "Dry six-hour morning window supports same-day coverage before evening humidity builds.",
  nextActions: ["Confirm zone pressure", "Deploy spray crew", "Schedule 72-hour recovery review"],
  yieldHint: "Protecting North Block 04 today keeps the recovery plan on line for this week.",
  incidentId: "incident-north-block-04",
  evidenceSource: "seed",
  fieldName: "North Block 04",
  artifactName: "north-block-04-field-evidence.zip",
};

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  channel: "chrome",
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

await page.addInitScript((assessment) => {
  localStorage.setItem(
    "ibrahim_session",
    JSON.stringify({ email: "me@gmail.com", createdAt: "2026-09-01T06:00:00.000Z" }),
  );
  localStorage.setItem("ibrahim_desk_live", "1");
  localStorage.setItem("ibrahim_assessments", JSON.stringify([assessment]));
}, seedAssessment);

await page.goto(`${base}/login`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', "me@gmail.com");
await page.fill('input[name="password"]', "demo-screen");
await page.click('button[type="submit"]');
await page.waitForURL("**/dashboard", { timeout: 15000 });
await page.evaluate((assessment) => {
  localStorage.setItem("ibrahim_desk_live", "1");
  localStorage.setItem("ibrahim_assessments", JSON.stringify([assessment]));
}, seedAssessment);
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(600);

for (const shot of shots) {
  await page.goto(`${base}${shot.path}`, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "nextjs-portal, [data-nextjs-toast] { display: none !important; }",
  });
  try {
    await page.waitForSelector(shot.wait, { timeout: 10000 });
  } catch {
    console.warn(`[shots] selector miss ${shot.wait} on ${shot.path}`);
  }
  if (shot.scroll) {
    const heading = page.getByRole("heading", { name: shot.scroll }).first();
    if (await heading.count()) {
      await heading.scrollIntoViewIfNeeded();
    }
  }
  await page.waitForTimeout(700);
  const file = path.join(outDir, shot.name);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`[IbrahimOS Shots] ${shot.name} ← ${shot.path}`);
}

await browser.close();
console.log(`[IbrahimOS Shots] wrote ${shots.length} files to public/product/`);
