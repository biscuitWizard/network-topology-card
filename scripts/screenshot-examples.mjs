// Capture all example harness pages into images/examples/*.png.
// Usage: npm run screenshots
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const examples = [
  "01-minimal",
  "02-vlans-legend",
  "03-groups",
  "04-lagg-trunk-fanout",
  "05-custom-template",
  "06-live-status",
  "99-full-home-network",
];

const port = 8124;
const baseUrl = `http://127.0.0.1:${port}`;

await mkdir("images/examples", { recursive: true });

const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
  stdio: ["ignore", "pipe", "pipe"],
});

try {
  await waitForServer(`${baseUrl}/dev/example.html?example=${examples[0]}`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });

  for (const example of examples) {
    const url = `${baseUrl}/dev/example.html?example=${example}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__ntcReady === true);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `images/examples/${example}.png`, fullPage: true });
    console.log(`wrote images/examples/${example}.png`);
  }

  await browser.close();
} finally {
  server.kill("SIGTERM");
}

async function waitForServer(url) {
  const started = Date.now();
  while (Date.now() - started < 10000) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Timed out waiting for ${url}`);
}
