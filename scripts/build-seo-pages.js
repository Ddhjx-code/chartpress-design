#!/usr/bin/env node
/**
 * ChartPress — Programmatic SEO build script.
 *
 * Reads data/blanks.js + data/seo-copy.js, fills templates/seo-page.html
 * for every blank, and writes a complete static site to dist/:
 *   dist/index.html                     (main tool)
 *   dist/{slug}-size-chart.html         (one per blank)
 *   dist/sitemap.xml
 *   dist/data/blanks.js                 (for the main tool)
 *
 * Usage:  node scripts/build-seo-pages.js
 * Env:    SITE_DOMAIN (default https://chartpress.com)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const STATIC = path.join(ROOT, "static");
const DOMAIN = (process.env.SITE_DOMAIN || "https://chartpress.com").replace(/\/$/, "");

const { BLANKS, THEMES } = require(path.join(ROOT, "data", "blanks.js"));
const { SEO_COPY } = require(path.join(ROOT, "data", "seo-copy.js"));
const template = fs.readFileSync(path.join(ROOT, "templates", "seo-page.html"), "utf8");

const fmtIn = v => (v % 1 ? parseFloat(v.toFixed(3)).toString() : String(v));
const hexToRgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
const escapeHtml = s =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function staticTeeSVG(chest, length) {
  return `<svg viewBox="0 0 240 260" fill="none">
    <path d="M82 32 L58 42 L24 86 L60 108 L68 82 L68 232 L172 232 L172 82 L180 108 L216 86 L182 42 L158 32 Q120 56 82 32 Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
    <line class="dimline" x1="68" y1="150" x2="172" y2="150" stroke-width="2" stroke-dasharray="5 4"/>
    <line class="dimline" x1="68" y1="141" x2="68" y2="159" stroke-width="2"/>
    <line class="dimline" x1="172" y1="141" x2="172" y2="159" stroke-width="2"/>
    <rect x="92" y="139" width="56" height="18" fill="var(--c-bg)"/>
    <text class="dimtext" x="120" y="152" text-anchor="middle">CHEST ${fmtIn(chest * 2)}</text>
    <line class="dimline" x1="196" y1="32" x2="196" y2="232" stroke-width="2" stroke-dasharray="5 4"/>
    <line class="dimline" x1="188" y1="32" x2="204" y2="32" stroke-width="2"/>
    <line class="dimline" x1="188" y1="232" x2="204" y2="232" stroke-width="2"/>
    <text class="dimtext" x="206" y="135" transform="rotate(90 206 135)" text-anchor="middle">LEN ${fmtIn(length)}</text>
  </svg>`;
}

function renderStaticChart(b) {
  const t = THEMES.ink;
  const mid = b.sizes[Math.floor(b.sizes.length / 2)];
  const hasSleeve = b.sizes[0].sleeve != null;
  const rows = b.sizes
    .map(r => `<tr><td>${r.s}</td><td>${fmtIn(r.chest * 2)}</td><td>${fmtIn(r.length)}</td>${hasSleeve ? `<td>${fmtIn(r.sleeve)}</td>` : ""}</tr>`)
    .join("");
  return `
  <div class="chart" style="--c-bg:${t.bg};--c-fg:${t.fg};--c-ac:${t.ac};--c-border:${hexToRgba(t.fg, 0.22)}">
    <div class="c-top">
      <div class="c-brand">${b.brand} ${b.model}<small>${b.name.toUpperCase()} · ${b.audience || "UNISEX ADULT"}</small></div>
      <span class="c-badge">SIZE CHART</span>
    </div>
    <div class="c-mid">${staticTeeSVG(mid.chest, mid.length)}</div>
    <table>
      <thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th>${hasSleeve ? "<th>Sleeve (in)</th>" : ""}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="c-foot"><span>Flat garment measurement · ±0.5 in tolerance</span><span>chartpress</span></div>
  </div>`;
}

function relatedLinks(currentKey) {
  const cur = BLANKS[currentKey];
  const others = Object.entries(BLANKS).filter(([k]) => k !== currentKey);
  const sameBrand = others.filter(([, b]) => b.brand === cur.brand);
  const diffBrand = others.filter(([, b]) => b.brand !== cur.brand);
  return [...sameBrand, ...diffBrand]
    .slice(0, 8)
    .map(([, b]) => `<a href="/${b.slug}-size-chart"><b>${b.brand} ${b.model}</b><span>${b.name}</span></a>`)
    .join("\n      ");
}

function buildPage(key) {
  const b = BLANKS[key];
  const copy = (SEO_COPY[key] && SEO_COPY[key].blurb) ||
    `${b.brand} ${b.model} ${b.name} size chart with official flat garment measurements.`;
  const fullName = `${b.brand} ${b.model} ${b.name}`;
  const title = `${b.brand} ${b.model} Size Chart — Free PNG & HTML | ChartPress`;
  const metaDesc = `Free ${b.brand} ${b.model} ${b.name} size chart with official flat measurements. Download a listing-ready PNG or copy an HTML snippet for Etsy, Shopify & Amazon. Inches & CM.`;
  const canonical = `${DOMAIN}/${b.slug}-size-chart`;
  const h1 = `${b.brand} ${b.model} <span class="red">Size Chart</span>`;

  return template
    .replace(/\{\{TITLE\}\}/g, escapeHtml(title))
    .replace(/\{\{META_DESCRIPTION\}\}/g, escapeHtml(metaDesc))
    .replace(/\{\{CANONICAL_URL\}\}/g, canonical)
    .replace(/\{\{H1\}\}/g, h1)
    .replace(/\{\{BLANK_FULL_NAME\}\}/g, escapeHtml(fullName))
    .replace(/\{\{STATIC_CHART\}\}/g, renderStaticChart(b))
    .replace(/\{\{SEO_COPY\}\}/g, escapeHtml(copy))
    .replace(/\{\{RELATED_LINKS\}\}/g, relatedLinks(key))
    .replace(/\{\{BLANK_JSON\}\}/g, JSON.stringify({ [key]: b }))
    .replace(/\{\{THEMES_JSON\}\}/g, JSON.stringify(THEMES))
    .replace(/\{\{BLANK_KEY\}\}/g, key);
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [`${DOMAIN}/`];
  Object.values(BLANKS).forEach(b => urls.push(`${DOMAIN}/${b.slug}-size-chart`));
  const body = urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  let count = 0;
  for (const key of Object.keys(BLANKS)) {
    const b = BLANKS[key];
    const file = path.join(DIST, `${b.slug}-size-chart.html`);
    fs.writeFileSync(file, buildPage(key));
    count++;
  }

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), buildSitemap());
  fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);

  fs.copyFileSync(path.join(ROOT, "chartpress-design.html"), path.join(DIST, "index.html"));
  fs.mkdirSync(path.join(DIST, "data"), { recursive: true });
  fs.copyFileSync(path.join(ROOT, "data", "blanks.js"), path.join(DIST, "data", "blanks.js"));

  if (fs.existsSync(STATIC)) {
    fs.cpSync(STATIC, DIST, { recursive: true });
  }

  console.log(`✓ Built ${count} size-chart pages + sitemap + robots + index → ${DIST}`);
  console.log(`  Domain: ${DOMAIN}`);
}

build();
