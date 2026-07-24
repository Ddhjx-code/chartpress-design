# ChartPress — Product Hunt 发布文案包

> 用法：PH 发布是网页手动填表（producthunt.com → Post → Product）。把下面的内容复制粘贴进去即可。
> 发布时机：**太平洋时间 00:01**（北京时间约下午 3-4 点），**周二/三/四**最佳。

---

## 1. 基本信息

| 字段 | 内容 |
|------|------|
| **Name** | ChartPress |
| **Link** | https://chartpress-design.vercel.app |
| **Pricing** | Free |
| **Topics** | Design Tools · E-Commerce · Productivity · Marketing · Developer Tools |

---

## 2. Tagline（≤60 字符，选一个）

1. `Size charts, pressed & listing-ready — free, no signup` ⭐（推荐，呼应品牌）
2. `Free POD size charts, ready in 30 seconds`
3. `Pick a blank, get a listing-ready size chart in 30s`
4. `Free POD size chart generator — cut "doesn't fit" returns`
5. `Stop losing sales to sizing — free charts for POD sellers`

---

## 3. Description（贴到 PH 描述框）

```
Sizing is the #1 reason apparel gets returned — and for POD sellers on
Etsy, Shopify, and TikTok Shop, every return eats your margin.

ChartPress gives you a beautiful, accurate size chart in about 30 seconds.
Pick your blank — Gildan 5000, Bella+Canvas 3001, Comfort Colors 1717, and
more — and get a listing-ready image sized for Etsy & Amazon image slots,
or an HTML snippet to embed in your store.

→ Pre-loaded with official flat measurements for 13 popular blanks
→ Inches / centimetres toggle for any market
→ 5 clean themes that read well at thumbnail size
→ Download PNG or copy HTML — no account, no watermark, no catch

It's a static page. There's no server bill, so it's free forever. We're
just testing whether sellers actually want it. If it helps you, tell a
friend — that's the whole deal.
```

---

## 4. First Comment（发布后立刻发，maker 自评）

```
Hi Product Hunt 👋 I'm the maker of ChartPress.

The idea came from a simple frustration: I kept seeing POD sellers lose
sales (and eat return costs) because their listings had no size chart — or
a wrong one. Size is the #1 reason apparel gets returned, and most sellers
either skip the chart or hand-type a messy table.

So I built the tool I wished existed: pick your blank garment, and a clean,
accurate size chart just… appears. No measuring, no guessing, no signup.

A few things I'm proud of:
• Every measurement is the manufacturer's official flat spec (Gildan,
  Bella+Canvas, Comfort Colors, Next Level, AS Colour) — not guesswork.
• It exports a PNG sized for Etsy/Amazon image slots, plus an HTML snippet
  for Shopify and custom stores.
• It's 100% free and always will be. It's a static page with zero running
  cost — I'm validating a hunch, not extracting rent.

I'd love your feedback:
– Which blanks should I add next?
– Any export format you wish it had?

Thanks for checking it out 🙏
```

---

## 5. Gallery 截图清单（1270×760，准备 4-5 张）

从 https://chartpress-design.vercel.app 截图：

1. **Hero 首屏** — 标题 + 右侧尺码表预览（第一印象）
2. **生成器** — 选底衫 + 主题/单位切换面板 + 实时预览
3. **导出的尺码表 PNG** — 单独展示一张漂亮的成品图（核心卖点）
4. **5 个主题对比** — 展示主题切换效果
5. **（可选）SEO 页** — 如 /gildan-5000-size-chart，展示独立型号页

> Logo：240×240 PNG。可以用品牌的红色菱形 tag 图标。

---

## 6. 发布当天行动清单

- [ ] 太平洋时间 00:01 定时发布
- [ ] 发布后立刻发 First Comment（上面第 4 节）
- [ ] 分享到 Reddit（r/printondemand, r/EtsySellers）、Twitter/X
- [ ] 每条评论都回复（PH 算法看互动）
- [ ] 不要直接喊 "vote for me"（PH 反感拉票），分享产品本身

---

## 7. 发布前可选优化

- 绑定正式域名（比 vercel.app 更专业，也利于 SEO）
- 在 Vercel 设 `SITE_DOMAIN=https://你的域名` 重新部署，让 canonical/sitemap 指向正式域名

---

## 8. Logo 文生图 Prompt

品牌基调：工业/服装印刷坊风格，红色「服装吊牌」菱形图标，配色 墨黑 #16191F / 纸白 #F6F5F0 / 裁缝红 #E8432A。

### 方案 A：App 图标（红色吊牌，推荐用于 240×240）

```
A minimal flat app icon for a print-on-demand size chart tool. A single
red clothing price tag shaped like a rotated square (diamond) with a small
circular hole near the top corner, in tailor red #E8432A, centered on a
warm paper-white background #F6F5F0. Clean vector style, sharp geometric
edges, a subtle hard offset shadow in ink black #16191F. Industrial
garment-printing aesthetic. No text, no gradients, bold and memorable,
perfectly centered, suitable for a 240x240 app icon.
```

### 方案 B：图标 + 字标（横版完整 logo）

```
A bold industrial logo for "ChartPress", a size chart generator for
print-on-demand sellers. Left: a red diamond-shaped clothing tag icon
(rotated square with a circular hole) in tailor red #E8432A. Right: the
wordmark "ChartPress" in a heavy condensed sans-serif (Archivo Black
style), ink black #16191F, with "Press" in red. Warm paper-white
background #F6F5F0. Workwear / print-shop aesthetic, flat vector, sharp
edges, subtle hard shadow. Horizontal layout, clean and confident.
```

### 方案 C：徽章风（圆形贴纸感，适合社交头像）

```
A circular badge logo for "ChartPress". Inside the circle: a red diamond
clothing tag and a dashed cut-line motif with tiny scissors, in tailor red
#E8432A and ink black #16191F on paper white #F6F5F0. Vintage industrial
print-shop sticker style, flat vector, bold outlines, no gradients.
Centered, suitable for a square social avatar.
```

> 生成后建议：用矢量工具（Figma/Illustrator）重绘一版以保证清晰度，文生图
> 主要用来快速定方向。最终 logo 导出 240×240 PNG（PH）+ 512×512（社交头像）。

---

## 9. Gallery 截图（已生成）

位于 `launch/gallery/`（2x 高清，2540×1520）：
- `01-hero.png` — 首屏（标题 + 尺码表预览）
- `02-generator.png` — 生成器（选底衫 + 主题/单位 + 实时预览）
- `03-chart.png` — 尺码表成品特写
- `04-themes.png` — 5 主题切换
- `05-seo-page.png` — 独立型号 SEO 页

> PH gallery 推荐 1270×760，当前为 2x（2540×1520），上传时 PH 会自动适配，
> 或自行缩放到 1270×760。
