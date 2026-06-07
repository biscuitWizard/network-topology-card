// Renders the dev harness in headless Chromium and writes a PNG screenshot.
// Usage: node scripts/screenshot.mjs [url] [outfile]
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:8123/index.html";
const outfile = process.argv[3] ?? "dev/screenshot.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));

await page.goto(url, { waitUntil: "networkidle" });

// Wait for the card to define and render its canvas.
await page.waitForFunction(() => {
  const card = document.querySelector("network-topology-card");
  return card && card.shadowRoot && card.shadowRoot.querySelector("svg.ntc-canvas");
}, { timeout: 10000 });

// Give layout/fonts a beat to settle.
await page.waitForTimeout(400);

const card = await page.$("network-topology-card");
const box = await card.boundingBox();
console.log("card bounding box:", JSON.stringify(box));

await page.screenshot({ path: outfile, fullPage: true });

if (consoleErrors.length) {
  console.log("CONSOLE_ERRORS:\n" + consoleErrors.join("\n"));
} else {
  console.log("no console errors");
}

await browser.close();
console.log("wrote", outfile);
