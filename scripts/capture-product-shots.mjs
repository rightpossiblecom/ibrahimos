/**
 * Capture high-value dashboard screenshots for /product gallery.
 * Requires: pnpm exec playwright install chromium + local next dev.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "product");
const base = process.env.SHOT_BASE_URL ?? "http://localhost:3000";

const shots = [
  { name: "shot-01.png", path: "/dashboard", wait: "text=Overview" },
  { name: "shot-02.png", path: "/fields", wait: "text=Fields" },
  { name: "shot-03.png", path: "/market", wait: "text=Market" },
  { name: "shot-04.png", path: "/weather", wait: "text=Weather" },
  { name: "shot-05.png", path: "/projects/demo-maize-blight", wait: "text=Farm context" },
  { name: "shot-06.png", path: "/new", wait: "text=New assessment" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  channel: "chrome", // system Chrome — skip Playwright browser download
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

await page.goto(`${base}/login`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', "demo@ibrahimos.africa");
await page.fill('input[name="password"]', "demo-screen");
await page.click('button[type="submit"]');
await page.waitForURL("**/dashboard", { timeout: 15000 });
await page.waitForTimeout(800);

for (const shot of shots) {
  await page.goto(`${base}${shot.path}`, { waitUntil: "networkidle" });
  try {
    await page.waitForSelector(shot.wait, { timeout: 10000 });
  } catch {
    console.warn(`[shots] selector miss ${shot.wait} on ${shot.path}`);
  }
  await page.waitForTimeout(600);
  const file = path.join(outDir, shot.name);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`[IbrahimOS Shots] ${shot.name} ← ${shot.path}`);
}

await browser.close();
console.log(`[IbrahimOS Shots] wrote ${shots.length} files to public/product/`);
