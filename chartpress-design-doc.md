# ChartPress 设计文档
**版本**：v0.1（免费验证版）
**日期**：2026-07-22
**状态**：待开发
**视觉参考**：`chartpress-design.html`（可交互原型）

---

## 1. 一句话定位

> 为 POD（按需印刷）卖家提供**预置空白底衫官方尺码数据、一键生成 listing 尺码表图片**的免费纯前端工具。

**不是**：通用表格生成器、需要填数据的空壳、订阅制 SaaS。
**是**：一个"已经知道 Gildan 5000 所有尺寸"的工具，选一下型号就出一张能直接放进 Etsy listing 的漂亮尺码表。

---

## 2. 为什么做（调研依据）

| 证据 | 数据 |
|------|------|
| 需求爆发 | "size chart generator" 搜索 2025.7 起跳升 **6 倍**，2026 春季持续（峰值 100） |
| 驱动因素 | POD 新卖家大爆发（Printful/Printify 搜索同步暴涨），AI 出图 + TikTok Shop 降低门槛 |
| 用户要"生成"不是"查询" | "gildan size chart"（查询）5 年平稳，"size chart **generator**"（生成）暴涨 |
| 精确到型号 | "gildan 5000" +110%、"gildan heavy cotton size chart" +50% |
| 竞品空白 | G2 上无独立跨平台尺码表工具，全是平台锁定插件（$5-20/月） |
| 差异化 | 订阅疲劳普遍存在 → **免费 + 买断心智**是天然切入点 |

**核心洞察**：预置品牌数据库是产品，生成能力只是功能。

---

## 3. 目标用户与场景

**主力用户**：Etsy / Shopify / TikTok Shop 的 POD 服装卖家（英语市场，印度为最大增量）。

**典型场景**：
1. 卖家选定空白底衫（如 Gildan 5000），上传 AI 设计到 Printful
2. 创建 listing 时需要一张尺码表图片放进图片位
3. 打开 ChartPress → 选 "Gildan 5000" → 下载 PNG → 上传到 listing
4. 全程 < 1 分钟，无需注册

**次要场景**：独立站卖家复制 HTML 表格嵌入商品页。

---

## 4. MVP 功能范围（验证版，刻意做减法）

### ✅ 做（P0）
- 单页工具，**无需注册、无需登录、无后端**
- 预置 **8-10 个最热门空白底衫**（官方扁平尺码数据）：
  - Gildan 5000（Heavy Cotton Tee）
  - Gildan 18500（Heavy Blend Crewneck）
  - Bella+Canvas 3001（Unisex Jersey Tee）
  - Comfort Colors 1717（Garment-Dyed Heavyweight）
  - Next Level 3600（Premium Fitted Tee）
  - AS Colour 001（Staple Tee）
  - Champion S700（Powerblend Hoodie）
  - Russell Athletic 017M（Dri-Power Tee）
- 选品牌型号 → 自动生成尺码表（含 T 恤示意图 + 尺寸标注）
- 英寸 / 厘米切换
- 5 个主题色（Ink / Paper / Kraft / Mint / Blush）
- **下载 PNG**（html2canvas，预置 Etsy/Amazon 图片位尺寸）
- **复制 HTML 表格**（嵌入独立站）
- 尺码表带 ±0.5" 公差提示（专业感 + 降低退货纠纷）

### ❌ 不做（验证后再说）
- 用户系统 / 登录
- 支付 / 订阅 / 任何收费
- 自定义品牌数据录入（先验证"预置数据"假设是否成立）
- Logo 上传
- PDF 导出
- 多语言
- 后端 / 数据库

**原则**：如果一个功能不能帮助回答"用户到底要不要这个东西"，就砍掉。

---

## 5. 信息架构与页面流程

单页，自上而下：

```
[顶部] 品牌型号选择条（核心操作，首屏即达）
   ↓
[主区] 实时尺码表预览（左：控制 / 右：预览）
   ↓  操作：选型号 → 切单位 → 选主题 → 下载PNG / 复制HTML
[下方] 为什么需要尺码表（退货率数据，建立认知，SEO 内容）
   ↓
[底部] 支持的底衫清单（每个型号一个锚点/独立 URL）
```

**关键流程（3 步内完成）**：
1. 选型号（1 次点击）
2. 看预览（自动）
3. 下载（1 次点击）

---

## 6. 核心交互设计

| 交互 | 设计 |
|------|------|
| 选型号 | 品牌芯片（chip）横排，点击即切换预览，当前项高亮 |
| 预览更新 | 表格行逐行 stagger 动画（55ms 递增），尺寸标注线重绘 |
| 单位切换 | IN / CM 分段按钮，数字实时换算 |
| 主题切换 | 色块 swatch，点击即换预览配色 |
| 下载 PNG | 点击后 toast 反馈"已生成"，文件自动下载 |
| 复制 HTML | 点击后 toast"已复制"，可直接粘贴 |
| 空状态 | 无（默认加载 Gildan 5000，永远有内容） |

**反馈原则**：每次操作都有可感知的视觉变化（预览即时更新 + toast），让用户感到"工具在响应我"。

---

## 7. 视觉设计规范

完整可运行示例见 `chartpress-design.html`。核心 token：

### 色彩
| 用途 | 色值 | 说明 |
|------|------|------|
| 背景纸白 | `#F6F5F0` | 打版纸质感，叠加 26px 方格 |
| 主墨色 | `#16191F` | 文字 / 边框 |
| 强调红 | `#E8432A` | CTA / 裁切线 / 标注（裁缝红） |
| 裁床绿 | `#17352A` | 深色区块背景（裁床垫） |
| 粉笔蓝 | `#2B4BC8` | 次级强调 |

### 字体（三套，各司其职）
| 字体 | 用途 |
|------|------|
| **Archivo Black** | 大标题（工业/工装感） |
| **Space Grotesk** | 正文 |
| **IBM Plex Mono** | 所有尺码数据、标签、按钮（测量数据天然等宽） |

### 组件语言
- 直角/微圆角，**不用** rounded-2xl
- 硬阴影（`box-shadow: 4px 4px 0 墨色`），不用模糊阴影
- 虚线 = 裁切线（配 ✂ 图标），贯穿全站作为分隔母题
- 尺码表卡片 = "吊牌"意象（打孔 + 胶带贴角）

---

## 8. 技术方案

| 项 | 方案 |
|----|------|
| 架构 | **纯前端**，零后端、零数据库 |
| 实现 | 单 HTML 文件起步（Vanilla JS），验证后可迁 React |
| PNG 导出 | `html2canvas` 或 `dom-to-image-more` |
| 部署 | Vercel / Netlify / GitHub Pages（静态站，零成本） |
| 数据 | 尺码数据以 JS 常量内置（JSON 结构，易扩展） |
| 成本 | **$0**（域名除外） |

### 增长引擎：Programmatic SEO（免费工具的关键）
每个底衫型号一个独立 URL，吃长尾搜索：
```
/gildan-5000-size-chart
/bella-canvas-3001-size-chart
/comfort-colors-1717-size-chart
...
```
- 每页 = 该型号的完整尺码表 + 生成工具 + SEO 文案
- 目标词："gildan 5000 size chart"（+110%）、"bella canvas 3001 size chart" 等几百个长尾词
- 这是免费工具获取自然流量的核心，**比工具本身更重要**

---

## 9. 验证指标（北极星 + 过程）

**北极星**：周 PNG 下载量（= 真实使用）

| 指标 | 目标（上线 8 周） | 说明 |
|------|-----------------|------|
| 自然搜索 UV | 1,000+/周 | SEO 页是否被收录排名 |
| 尺码表生成次数 | 500+/周 | 工具有人用 |
| 下载转化率 | > 30% | 访问→下载，验证价值 |
| 型号选择分布 | Top3 占比 < 70% | 验证多型号预置是否有用 |
| 回访率 | > 15% | 卖家会重复来（上新品） |

**验证成功标准**：下载转化率 > 30% 且有自然回访 → 值得投入扩展底衫库 + 做增强功能。
**验证失败标准**：8 周后周下载 < 50 → 需求假设不成立，止损。

---

## 10. 里程碑

| 阶段 | 内容 | 周期 |
|------|------|------|
| M1 | 单页工具（8 底衫 + PNG/HTML 导出 + 3 主题） | 1 周 |
| M2 | Programmatic SEO 页（每型号独立 URL）+ 基础埋点 | 1 周 |
| M3 | 上线 + 提交收录 + 观察数据 | 持续 |
| M4（验证后） | 扩底衫库 / 自定义数据 / 更多导出格式 | 视数据定 |

**商业化（验证成功后才考虑，当前完全免费）**：
- 保持核心免费，靠流量做相邻工具矩阵（发票生成器、图片重命名等）
- 或接受捐赠 / 联盟链接（Printful/Printify 推荐佣金）
- 不做订阅。

---

## 11. 风险与对策

| 风险 | 对策 |
|------|------|
| 底衫官方数据变更 | 数据源标注 + 定期核对，公差提示兜底 |
| 被大平台（Printful）内置 | 差异化：跨平台 + 独立站 HTML 导出 + SEO 长尾壁垒 |
| 同质化抄袭 | 先发 + 底衫库完整度 + 品牌词 SEO 占位 |
| 免费无收入 | 本就是验证工具，成本 $0，失败代价极低 |

---

## 12. 技术实现细节

### 12.1 数据结构（JS 内置常量，零后端）

所有尺码数据以 JS 常量内置，结构如下：

```js
const BLANKS = {
  gildan5000: {
    brand: "Gildan",
    model: "5000",
    name: "Heavy Cotton Tee",
    slug: "gildan-5000",          // 用于 SEO URL
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 15.5 },
      { s: "M", chest: 20, length: 29, sleeve: 16.5 },
      // ...
    ],
  },
  // ... 其余底衫
};
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `brand` | string | 品牌名（Gildan / Bella+Canvas / Comfort Colors …） |
| `model` | string | 型号编号（5000 / 3001 / 1717 …） |
| `name` | string | 产品全称（Heavy Cotton Tee …） |
| `slug` | string | URL 友好标识，用于 Programmatic SEO 路由 |
| `sizes[]` | array | 每个尺码的 flat garment measurement（**单位始终为英寸**） |
| `sizes[].s` | string | 尺码标签（S / M / L / XL / 2XL / 3XL） |
| `sizes[].chest` | number | 胸宽（flat，非体围；显示时 ×2 为体围） |
| `sizes[].length` | number | 衣长（flat） |
| `sizes[].sleeve` | number | 袖长（flat） |

**主题数据**：

```js
const THEMES = {
  ink:   { bg: "#16191F", fg: "#F6F5F0", ac: "#E8432A", name: "Ink" },
  paper: { bg: "#FFFFFF", fg: "#16191F", ac: "#2B4BC8", name: "Paper" },
  kraft: { bg: "#E8D9BC", fg: "#3D2E1C", ac: "#C4501F", name: "Kraft" },
  mint:  { bg: "#DDEDE2", fg: "#17352A", ac: "#1F7A53", name: "Mint" },
  blush: { bg: "#F6E3E1", fg: "#4A2320", ac: "#C2402F", name: "Blush" },
};
```

**全局状态**：

```js
const state = { blank: "gildan5000", unit: "in", theme: "ink" };
```

> 原则：内部计算始终用英寸，仅在渲染层做单位换算，避免双向误差。

### 12.2 单位换算与格式化

```js
const fmt = (vIn) =>
  state.unit === "cm"
    ? (vIn * 2.54).toFixed(1)
    : vIn % 1
      ? vIn.toFixed(2).replace(/0$/, "")
      : String(vIn);

const unitLbl = () => (state.unit === "cm" ? "cm" : "in");
```

| 规则 | 说明 |
|------|------|
| 内部存储 | 始终 `in` |
| CM 显示 | `vIn × 2.54`，保留 1 位小数 |
| IN 显示 | 整数直接输出；小数保留 2 位并去尾零 |
| 容差提示 | 底部脚注固定显示 `±0.5 in` 或 `±0.5 cm`（随单位切换） |

### 12.3 渲染管线（单一渲染函数，驱动多处 DOM）

```
state 变更 → sync() → renderChart(heroChart)
                    → renderChart(demoChart)
                    → renderThemeGrid()
                    → 更新 chip / swatch / unit-toggle 高亮
```

**`renderChart(el, opts)` 职责**：

1. 读取 `state.blank` → 取 `BLANKS[key]`
2. 读取 `state.theme` → 取 `THEMES[key]`，注入 CSS 变量 `--c-bg / --c-fg / --c-ac`
3. 构建 DOM：
   - **顶部**：品牌型号 + 产品名 + `SIZE CHART` 徽章
   - **中部**：T 恤 SVG 示意图（`teeSVG(chest, length)`），标注 CHEST / LEN 尺寸线
   - **表格**：`thead`（Size / Chest / Length / Sleeve）+ `tbody`（`sizes[]` 映射，逐行 stagger 动画 55ms）
   - **底部**：flat measurement 说明 + ±0.5 容差 + `chartpress` 水印
4. `opts.compact = true` 时隐藏中部 SVG（用于主题卡片网格）

**`teeSVG(chest, length)` 职责**：

- 输出内联 SVG（viewBox 240×260）
- 用 `currentColor` 继承主题前景色
- 尺寸标注线用 `--c-ac`（主题强调色）
- CHEST 显示 `fmt(chest × 2)`（体围），LEN 显示 `fmt(length)`

### 12.4 交互与状态同步

| 交互 | 触发 | 状态变更 | 副作用 |
|------|------|----------|--------|
| 点击底衫 chip | `chip[data-blank]` click | `state.blank = key` | `sync()` 重渲染所有预览 |
| 切换单位 | `unitToggle button` click | `state.unit = "in"/"cm"` | `sync()` 重渲染所有预览 |
| 切换主题 | `swatch[data-theme]` click | `state.theme = key` | `sync()` + toast 反馈 |
| 主题卡片点击 | `theme-card[data-theme]` click | `state.theme = key` | `sync()` + toast 反馈 |
| 下载 PNG | `downloadBtn` click | 无 | 执行导出 → toast |
| 复制 HTML | `htmlBtn` click | 无 | 执行复制 → toast |

**`sync()` 实现要点**：

```js
function sync() {
  // 1. 同步所有 chip 高亮（hero + demo 两处）
  document.querySelectorAll("[data-blank]")
    .forEach(c => c.classList.toggle("active", c.dataset.blank === state.blank));
  // 2. 同步主题 swatch 高亮
  document.querySelectorAll("[data-theme]")
    .forEach(s => s.classList.toggle("active", s.dataset.theme === state.theme));
  // 3. 同步单位 toggle
  document.querySelectorAll("#unitToggle button")
    .forEach(b => b.classList.toggle("active", b.dataset.unit === state.unit));
  // 4. 重渲染
  renderChart(document.getElementById("heroChart"));
  renderChart(document.getElementById("demoChart"));
  renderThemeGrid();
}
```

### 12.5 HTML 片段导出（复制到剪贴板）

**目标**：用户点击 `</> Copy HTML` 后，得到一段可直接粘贴到 Shopify 商品描述或任意 HTML 页面的独立片段。

**方案**：复制当前渲染的 `.chart` 容器 + 内联关键样式（不依赖外部 CSS）。

```js
document.getElementById("htmlBtn").addEventListener("click", async () => {
  const chartEl = document.querySelector("#demoChart .chart");
  const snippet = buildStandaloneSnippet(chartEl);
  await navigator.clipboard.writeText(snippet);
  toast(`&lt;/&gt; HTML snippet copied`);
});
```

**`buildStandaloneSnippet(chartEl)` 逻辑**：

1. 克隆 `chartEl` 节点
2. 将 CSS 变量（`--c-bg / --c-fg / --c-ac`）转为内联 `style` 属性
3. 将关键样式（字体、边框、padding、表格布局）内联到各元素
4. 移除动画相关 class（`row`、`animation-delay`）
5. 输出 `<div class="chartpress-size-chart">...</div>` 字符串

> 导出的 HTML 片段**不依赖**外部 CSS/JS，粘贴即可用。

### 12.6 PNG 导出（html2canvas）

**依赖**：`html2canvas`（CDN 引入，`<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js">`）

**导出流程**：

```js
document.getElementById("downloadBtn").addEventListener("click", async () => {
  const target = document.querySelector("#demoChart .chart");
  // 1. 等待字体加载完成，避免 fallback 字体
  await document.fonts.ready;
  // 2. 等一帧确保渲染稳定
  await new Promise(r => requestAnimationFrame(r));
  // 3. 渲染为 canvas
  const canvas = await html2canvas(target, {
    scale: 3,                    // 3x 清晰度，适合 listing 图片
    backgroundColor: null,       // 使用主题自身背景色
    useCORS: true,
    logging: false,
  });
  // 4. 触发下载
  const link = document.createElement("a");
  const b = BLANKS[state.blank];
  link.download = `${b.slug}-size-chart-${state.unit}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  // 5. toast 反馈
  toast(`⬇ <b>${b.brand} ${b.model}</b> chart pressed — PNG ready`);
});
```

| 参数 | 值 | 说明 |
|------|-----|------|
| `scale` | `3` | 3 倍渲染，保证 Etsy/Amazon 图片位清晰度 |
| `backgroundColor` | `null` | 让主题 `--c-bg` 自然生效 |
| `useCORS` | `true` | 兼容跨域字体/资源 |
| 文件命名 | `{slug}-size-chart-{unit}.png` | 如 `gildan-5000-size-chart-in.png` |

**已知风险与对策**：

| 风险 | 对策 |
|------|------|
| Google Fonts 未加载完就截图 | `await document.fonts.ready` + `requestAnimationFrame` |
| `color-mix()` 等现代 CSS 不被 html2canvas 支持 | 表格边框改用 `rgba()` 硬编码，避免 `color-mix` |
| 移动端 canvas 内存限制 | `scale` 在移动端降为 `2`（通过 `window.innerWidth < 768` 判断） |

### 12.7 主题系统

| 主题 | 背景 | 前景 | 强调 | 适用场景 |
|------|------|------|------|----------|
| Ink | `#16191F` | `#F6F5F0` | `#E8432A` | 深色 listing，高对比 |
| Paper | `#FFFFFF` | `#16191F` | `#2B4BC8` | 白底 listing，经典 |
| Kraft | `#E8D9BC` | `#3D2E1C` | `#C4501F` | 复古/手工感店铺 |
| Mint | `#DDEDE2` | `#17352A` | `#1F7A53` | 清新/环保品牌 |
| Blush | `#F6E3E1` | `#4A2320` | `#C2402F` | 女性向/柔和品牌 |

- 主题通过 CSS 变量 `--c-bg / --c-fg / --c-ac` 注入 `.chart` 容器
- 切换主题 = 更新 `state.theme` → `sync()` 重渲染
- 主题卡片网格（`renderThemeGrid`）展示所有主题的压缩预览，点击即切换

### 12.8 滚动动画与微交互

| 效果 | 实现 |
|------|------|
| 区块入场 | `IntersectionObserver` + `[data-reveal]` class，`opacity 0→1` + `translateY 26px→0` |
| 数字滚动 | `IntersectionObserver` + `requestAnimationFrame` 缓动（`1-(1-p)³`），1300ms |
| 表格行 stagger | 每行 `animation-delay: i × 55ms`，`translateX(-8px)→0` |
| 按钮 hover | `translate(-2px,-2px)` + `box-shadow: 4px 4px 0 ink`（硬阴影） |
| Toast | 固定底部居中，`translateY(20px)→0` + `opacity`，2600ms 后自动消失 |
| 跑马灯 | `marquee-track` 内容复制一份，`translateX(-50%)` 无限循环 32s |

---

## 13. Programmatic SEO 多页实现

### 13.1 路由策略

纯静态托管，**每个底衫型号一个独立 HTML 文件**：

```
/                           → index.html（主工具页）
/gildan-5000-size-chart     → gildan-5000-size-chart.html
/bella-canvas-3001-size-chart → bella-canvas-3001-size-chart.html
/comfort-colors-1717-size-chart → comfort-colors-1717-size-chart.html
...
```

**生成方式**：构建脚本（Node.js）读取 `BLANKS` 数据，为每个 slug 生成一个完整 HTML 文件。

### 13.2 页面模板结构

每个型号页面包含：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{Brand} {Model} Size Chart — Free PNG & HTML | ChartPress</title>
  <meta name="description" content="Free {Brand} {Model} size chart with official flat measurements. Download PNG for Etsy/Amazon or copy HTML for Shopify. Inches & CM.">
  <link rel="canonical" href="https://chartpress.com/{slug}-size-chart">
  <!-- Open Graph / Twitter Card -->
</head>
<body>
  <!-- 1. 顶部：品牌型号 + 返回主工具链接 -->
  <!-- 2. 主区：该型号的完整尺码表（默认展开，非折叠） -->
  <!-- 3. 生成器：单位切换 + 主题切换 + 下载 PNG / 复制 HTML -->
  <!-- 4. SEO 文案：该型号的 300-500 字描述（面料、版型、适合场景） -->
  <!-- 5. 相关型号推荐（同品牌其他型号 + 热门型号） -->
  <!-- 6. 底部：全站链接 + 版权 -->
</body>
</html>
```

### 13.3 SEO 内容策略

| 元素 | 内容 |
|------|------|
| `<title>` | `{Brand} {Model} Size Chart — Free PNG & HTML \| ChartPress` |
| `<meta description>` | 含品牌、型号、"size chart"、"free"、"PNG"、"HTML" |
| H1 | `{Brand} {Model} Size Chart` |
| H2 | `Official Flat Measurements` / `Download as PNG` / `Embed as HTML` |
| 正文 | 300-500 字：面料克重、版型特点、适合 POD 场景、公差说明 |
| 内链 | 每个型号页链接到同品牌其他型号 + 主工具页 |
| Schema | `Product` + `FAQPage` JSON-LD（可选，M2 后加） |

### 13.4 构建脚本

```
scripts/
  build-seo-pages.js    # 读取 BLANKS → 为每个 slug 生成 HTML
```

**逻辑**：

1. 读取 `data/blanks.js`（与主页面共享同一份数据）
2. 读取 `templates/seo-page.html`（模板，含占位符）
3. 对每个 blank：
   - 替换占位符（brand / model / name / slug / sizes 表格 / SEO 文案）
   - 内联该型号的尺码表 HTML（服务端预渲染，不依赖 JS）
   - 写入 `dist/{slug}-size-chart.html`
4. 同时生成 `sitemap.xml`（所有型号 URL）

**部署**：`dist/` 目录整体部署到 Vercel / Netlify / GitHub Pages。

### 13.5 数据一致性

| 问题 | 方案 |
|------|------|
| 主页面与 SEO 页数据不同步 | 共享同一份 `data/blanks.js`，构建时注入 |
| 尺码数据更新 | 修改 `blanks.js` → 重新运行构建脚本 → 重新部署 |
| 客户端 vs 服务端渲染 | SEO 页的表格为**静态 HTML**（利于爬虫），交互部分（单位/主题切换）由 JS 增强 |

---

## 14. 实现步骤（按里程碑拆解）

### M1：单页工具（第 1 周）

| 步骤 | 任务 | 产出 |
|------|------|------|
| 1.1 | 搭建项目结构，引入 Google Fonts + html2canvas CDN | 可运行的空壳 HTML |
| 1.2 | 实现 `BLANKS` 数据（8 个底衫，官方 flat measurements） | `data/blanks.js` 或内联常量 |
| 1.3 | 实现 `THEMES` 数据（5 个主题） | 同上 |
| 1.4 | 实现 `renderChart()` + `teeSVG()` | 尺码表 + T 恤示意图可渲染 |
| 1.5 | 实现 `sync()` + chip / swatch / unit-toggle 交互 | 选型号、切单位、切主题均可用 |
| 1.6 | 实现 PNG 导出（html2canvas，scale=3，`document.fonts.ready`） | 点击即下载 PNG |
| 1.7 | 实现 HTML 片段导出（内联样式，`navigator.clipboard`） | 点击即复制可粘贴片段 |
| 1.8 | 实现 toast 反馈 + 滚动动画 + 跑马灯 | 完整交互体验 |
| 1.9 | 移动端适配（grid 单列、scale 降为 2、touch 友好） | 手机可用 |
| 1.10 | 自测验收（见 §15） | 全部通过 |

### M2：Programmatic SEO 页（第 2 周）

| 步骤 | 任务 | 产出 |
|------|------|------|
| 2.1 | 编写 SEO 页面模板 `templates/seo-page.html` | 含占位符的模板 |
| 2.2 | 编写构建脚本 `scripts/build-seo-pages.js` | 为每个 slug 生成 HTML |
| 2.3 | 为每个型号撰写 300-500 字 SEO 文案 | 内嵌于模板或独立 JSON |
| 2.4 | 生成 `sitemap.xml` | 所有型号 URL |
| 2.5 | 每个页面添加 `<title>` / `<meta description>` / canonical / OG 标签 | SEO 基础 |
| 2.6 | 添加内链（同品牌型号 + 主工具页） | 爬虫可达 |
| 2.7 | 部署到 Vercel / Netlify，提交 sitemap 到 Google Search Console | 上线 |
| 2.8 | 基础埋点（Plausible / Umami，统计 PNG 下载点击） | 数据可观测 |

### M3：上线 + 观察（持续）

| 步骤 | 任务 |
|------|------|
| 3.1 | 提交 Google Search Console + Bing Webmaster |
| 3.2 | 在 Reddit（r/EtsySellers, r/printondemand）发帖介绍工具 |
| 3.3 | 每周检查：自然搜索 UV、PNG 下载量、型号选择分布 |
| 3.4 | 8 周后评估：下载转化率 > 30% → 进入 M4；< 50 次/周 → 止损 |

### M4：验证后扩展（视数据定）

- 扩充底衫库（60+ → 100+）
- 自定义底衫数据录入
- PDF 导出
- Logo 上传
- 更多导出尺寸预设

---

## 15. 验收清单

### 功能验收

- [ ] 选择任意底衫 → hero 预览 + demo 预览同步更新
- [ ] 切换 IN / CM → 所有数值正确换算，单位标签一致
- [ ] 切换 5 个主题 → 背景/前景/强调色正确，对比度可读
- [ ] 点击 `Press PNG` → 浏览器下载 PNG 文件，文件名含 slug + unit
- [ ] 打开下载的 PNG → 清晰（3x）、无裁切、主题背景正确、字体正确
- [ ] 点击 `Copy HTML` → 剪贴板内容粘贴到空白 HTML 页面 → 表格正常显示，不依赖外部 CSS
- [ ] 主题卡片网格点击 → 切换主题 + toast 反馈
- [ ] 所有 toast 正常显示并自动消失

### SEO 页验收

- [ ] 每个型号 URL 可访问（200）
- [ ] `<title>` 和 `<meta description>` 含品牌 + 型号 + "size chart"
- [ ] 尺码表为静态 HTML（禁用 JS 后仍可见）
- [ ] 单位/主题切换在 SEO 页仍可用（JS 增强）
- [ ] `sitemap.xml` 包含所有型号 URL
- [ ] 内链可达：型号页 → 主工具页，型号页 → 同品牌其他型号

### 移动端验收

- [ ] 375px 宽度下布局不溢出
- [ ] chip 可点击，不重叠
- [ ] PNG 导出在移动端可用（scale 降为 2）
- [ ] 表格横向可滚动或自适应

### 性能验收

- [ ] 首屏加载 < 2s（Lighthouse Performance > 90）
- [ ] 无后端请求（纯静态）
- [ ] Google Fonts 使用 `display=swap`，不阻塞渲染

---

## 16. 文件结构（目标）

```
chartpress-design/
├── index.html                  # 主工具页（M1 产出，即当前 chartpress-design.html 的正式版）
├── data/
│   └── blanks.js               # 共享底衫数据（BLANKS + THEMES）
├── templates/
│   └── seo-page.html           # SEO 页面模板（M2）
├── scripts/
│   └── build-seo-pages.js      # 构建脚本：生成型号页 + sitemap（M2）
├── dist/                       # 构建产出（部署目录）
│   ├── index.html
│   ├── gildan-5000-size-chart.html
│   ├── bella-canvas-3001-size-chart.html
│   ├── ...
│   └── sitemap.xml
├── chartpress-design-doc.md    # 本文档
└── chartpress-design.html      # 原始可交互原型（保留作参考）
```
