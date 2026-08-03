#!/usr/bin/env node
/**
 * ChartPress — IndexNow submission.
 *
 * Pings the IndexNow API (Bing, Yandex, Seznam, Naver) with every URL
 * from the live sitemap so they get crawled/indexed within minutes.
 *
 * Requirements:
 *   - indexnow-key.txt at repo root (the key)
 *   - https://<host>/<key>.txt must be live (build script deploys it)
 *
 * Usage:  node scripts/indexnow-submit.js
 * Env:    SITE_DOMAIN / VERCEL_URL (same resolution as the build script)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HOST = (process.env.SITE_DOMAIN ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""))
  .replace(/\/$/, "")
  .replace(/^https?:\/\//, "");

if (!HOST) {
  console.error("✗ No host: set SITE_DOMAIN or VERCEL_URL");
  process.exit(1);
}

const key = fs.readFileSync(path.join(ROOT, "indexnow-key.txt"), "utf8").trim();
const origin = `https://${HOST}`;

async function fetchSitemapUrls() {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
}

async function verifyKeyFile() {
  const res = await fetch(`${origin}/${key}.txt`);
  const body = res.ok ? (await res.text()).trim() : "";
  return res.ok && body === key;
}

async function main() {
  console.log(`IndexNow → host: ${HOST}`);

  if (!(await verifyKeyFile())) {
    console.error(`✗ Key file not live yet at ${origin}/${key}.txt — deploy first, then re-run.`);
    process.exit(1);
  }
  console.log(`✓ Key file verified at ${origin}/${key}.txt`);

  const urlList = await fetchSitemapUrls();
  console.log(`✓ ${urlList.length} URLs from sitemap`);

  const payload = {
    host: HOST,
    key,
    keyLocation: `${origin}/${key}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`✓ IndexNow accepted (${res.status}) — Bing & partners will crawl shortly.`);
  } else {
    console.error(`✗ IndexNow rejected: HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }
}

main().catch(e => {
  console.error("✗", e.message);
  process.exit(1);
});
