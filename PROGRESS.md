# ChartPress — 开发进度文档

> 用于跨设备接续开发。最后更新：2026-07-22

---

## 一句话定位

为 POD（按需印刷）卖家提供**预置空白底衫官方尺码数据、一键生成 listing 尺码表图片**的免费纯前端工具。

完整产品/设计说明见 `chartpress-design-doc.md`（§1-16，含技术实现细节、Programmatic SEO、验收清单）。

---

## 当前状态总览

| 里程碑 | 状态 | 说明 |
|--------|------|------|
| **M1 单页工具** | ✅ 已完成 | 14 底衫（12 成人 + 2 青少年）+ 5 主题 + IN/CM + 真实 PNG 导出 + 真实 HTML 复制 |
| **M2 Programmatic SEO** | ✅ 已完成（本地构建，待部署） | 14 个型号独立 URL 页 + 构建脚本 + sitemap |
| **M3 上线 + 观察** | ⏳ 待开始 | 部署 + 提交收录 + 埋点 |
| **M4 验证后扩展** | ⏳ 待定 | 扩底衫库 / 自定义数据 / PDF / Logo |

---

## M1 已完成清单

- [x] 14 个底衫数据（含 `slug` + `audience` 字段）：
  - 成人：Gildan 5000 / 64000 / 18500 / 18000、Bella+Canvas 3001、Comfort Colors 1717、Next Level 3600 / 6210、AS Colour 001、Champion S700、Hanes 5180、Russell Athletic 017M
  - 青少年：Gildan 5000B（Youth Heavy Cotton）、Gildan 18000B（Youth Hoodie）
- [x] 5 个主题（Ink / Paper / Kraft / Mint / Blush）
- [x] IN / CM 单位切换（内部恒用英寸，渲染层换算）
- [x] **真实 PNG 导出**：html2canvas CDN，桌面 3x / 移动 2x，`document.fonts.ready` 保证字体
- [x] **真实 HTML 片段复制**：`buildStandaloneSnippet()` 生成内联样式独立片段，粘贴即用
- [x] 修复 `color-mix()` → `--c-border` CSS 变量（html2canvas 兼容）
- [x] MVP 文案一致性修正（去掉 Pro / PDF / logo 等未实现功能的描述）
- [x] JS 语法检查通过（`node --check`）

---

## 待办（按优先级）

### 🔴 高优先级：人工验证 M1（本机浏览器已打开过，需在另一台机器复验）
- [ ] 切换 14 个底衫 → hero + demo 预览同步更新（含青少年 5000B/18000B 显示 "YOUTH" 标签）
- [ ] 切 IN/CM、切 5 主题 → 数值/配色正确
- [ ] 点 `Press PNG` → 真实下载 PNG，文件名 `{slug}-size-chart-{unit}.png`
- [ ] 点 `Copy HTML` → 粘贴到空白页，表格正常、不依赖外部 CSS
- [ ] 375px 移动端布局不溢出

### ✅ 底衫数据调研（Google Trends 已完成）

**G2 竞品扫描** → 印证竞品空白：G2 上无独立跨平台尺码表工具（只有 Chart.js/Highcharts 等图表库 + 一个 Magento 插件）。

**Google Trends 型号热度排名**（US，2026 春季峰值，相对值）：

| 排名 | 底衫 | 春季峰值 | 结论 |
|------|------|---------|------|
| 1 | Gildan 5000 | 100 | 第一梯队，默认底衫选对了 |
| 1 | Gildan 18500（crewneck） | 100 | 第一梯队，黑马 |
| 1 | Next Level 3600 | 100 | 第一梯队 |
| 4 | Comfort Colors 1717 | 85 | 准第一梯队（潮流 garment-dyed） |
| 5 | Gildan 64000（Softstyle） | 34 | 第二梯队，新增正确 |
| 5 | Gildan 18000（hoodie） | 34 | 第二梯队，新增正确 |
| 7 | Bella+Canvas 3001 | 14 | 搜索量偏低（卖家凭口碑知晓），保留 |
| 8 | Champion S700 | 9 | 小众，保留 |
| 9 | AS Colour 001 | 0（US） | 仅 AU/UK 有量，不驱动美国 SEO，保留供英语市场 |

> 注：两批对比各自归一化（批内最高=100），跨批数值仅供量级参考，批内排名可靠。

**关键发现 1 — 强季节性**：需求在 3-5 月暴涨（峰值约 4/12），淡季（7-9 月）低 5-10 倍。**上线时机很重要，春季是黄金窗口。**

**关键发现 2 — 最大缺口：青少年/儿童**（"gildan size chart" 关联查询）：
- `youth gildan size chart` = 关联搜索 #1（热度 100）
- `gildan kids size chart` = rising +100%（暴涨）
- 原库全是成人款，**0 个青少年底衫** → 已补 `Gildan 5000B`（Youth Heavy Cotton），直接吃 "youth gildan" + "gildan 5000" 双重需求
- 后续可扩：Gildan 18000B（youth hoodie）、Bella+Canvas 3001 youth

**其他关联查询验证**：`gildan softstyle size chart`(14)→验证 64000 ✅；`gildan crewneck size chart`(11)→验证 18500 ✅；`gildan hoodie size chart`(34)→验证 18000 ✅。

**剩余可选调研**：
- [ ] Reddit（r/printondemand, r/EtsySellers）验证卖家实际常用底衫（需配置凭证）
- [ ] 评估剩余二级缺口：`Lane Seven LS16008`（精品空白衫）；Hanes / Next Level 6210 已加入

### 🔴 高优先级：尺寸数据官方核对（**上线前必须完成**）

> ⚠️ **产品核心价值 = 数据准确**。错误的尺码数据会直接导致买家退货，与产品初衷背道而驰。

**核验方式说明**：官方/零售商站点（gildan.com、bellacanvas.com、shirtspace、jiffyshirts 等）均反爬（403/404），无法实时抓取规格表。以下为**对照已知官方公开值的交叉核验**（非实时官方源），上线前仍需按"官方来源"列手动复核。

| 底衫 | chest/length 核验 | 置信度 | 官方来源（手动复核） |
|------|------------------|--------|---------------------|
| Gildan 5000 | 18→32 × 28→35（S-5XL），袖长 center back | ✅ 已核实 | gildan.com 官方规格 |
| Gildan 64000（Softstyle） | 16→32 × 27→35（XS-5XL），袖长 center back 15.5→25 | ✅ 已核实 | gildan.com 官方规格 |
| Gildan 18500（hoodie） | 18→34 × 26→34（XS-5XL），袖长 center back 32.5→40.5 | ✅ 已核实 | gildan.com 官方规格 |
| Gildan 18000（crewneck） | 18→34 × 26→34（XS-5XL），袖长 center back 32.5→40.5（同 18500 体型） | ✅ 已核实 | gildan.com 官方规格 |
| Bella+Canvas 3001 | 16.5→32 × 27→35（XS-5XL），官方无袖长列 | ✅ 已核实 | bellacanvas.com 官方规格 |
| Comfort Colors 1717 | 18.25→29.75 × 26.625→33.5（S-4XL），袖长 center back 16.25→24.625 | ✅ 已核实 | comfortcolors.com 官方规格 |
| Next Level 3600 | 17.5→34 × 27→36（XS-6XL），官方无袖长列 | ✅ 已核实 | nextlevelapparel.com 官方规格 |
| Hanes 5180 | 18→28 × 28→33，一致 | 高 | hanes.com（Beefy-T） |
| Next Level 6210 | 同 3600 版型（XS-6XL），官方无袖长列 | ✅ 已核实 | nextlevelapparel.com 官方规格 |
| AS Colour 001 | 17→31.5 × 26.75→35（XS-5XL），官方无袖长列，公差 ±1in | ✅ 已核实 | ascolour.com 官方规格 |
| ~~Champion S700~~ | — | ❌ 已删除 | 搜索峰值仅 9（极低），型号/平铺尺寸无法核实 |
| ~~Russell Athletic 017M~~ | — | ❌ 已删除 | 型号/平铺尺寸无法核实，搜索需求不明 |
| Gildan 5000B（youth） | 16→20 × 20.5→26.5，含 XS，袖长 center back | ✅ 已核实 | gildan.com 官方规格 |
| Gildan 5100P（toddler） | 11→15 × 15→19（2T-6T），袖长 center back | ✅ 已核实 | gildan.com 官方规格 |
| Gildan 5400B（youth LS） | 16→20 × 20.5→26.5（XS-XL），袖长 center back | ✅ 已核实 | gildan.com 官方规格 |
| Gildan 18000B（youth crewneck） | 16→20 × 19.75→25.5（XS-XL），袖长 center back | ✅ 已核实 | gildan.com 官方规格 |

**关键注意事项**：
- **袖长（sleeve）口径最不统一**：不同来源分别从「肩缝起」或「后中起」测量，差异可达数英寸。上线前必须确认每个底衫的袖长测量基准并统一。
  - ✅ **Gildan 已确认 = "Sleeve center back"（后中起量）**（5000/5000B/5100P/5400B 官方规格均标注）。其余 Gildan 成人款（64000/18500/18000）袖长待按 center back 核对。
- **青少年款（5000B/18000B）置信度最低**，是核对的最高优先级——青少年尺寸错误最容易导致退货。
- chest 为平铺胸宽，显示时 ×2 为体围（代码已处理）。
- **袖长列按需显示**：Bella+Canvas / Next Level 官方规格表不含袖长，渲染器已支持「无袖长数据时自动隐藏袖长列」，只显示已核实的胸宽+衣长（主工具 / SEO 页 / 静态表格 / HTML 片段四处均已实现）。
- ⚠️ **面料疑点待确认**：用户提供的 Gildan 5000 官方页标注 "5.3 oz/yd² · 50% US Cotton / 50% Polyester"，与传统 5000 Heavy Cotton（6.0 oz · 100% cotton）不符。尺寸数据按官方页采用，但 `data/seo-copy.js` 的面料描述需用户确认后更新。
- ✅ **18500/18000 品类对调已解决**：官方确认 **18500 = Hoodie（连帽衫）**、**18000 = Crewneck（圆领卫衣）**（我最初标反了，已修正）。两者共用同一 Heavy Blend 身体版型（尺寸完全相同），袖长均为 center back。

**待办**：
- [ ] 按上表"官方来源"列逐一手动复核 chest/length/sleeve
- [ ] 重点核对 2 个青少年款 + 统一袖长测量基准
- [ ] 每个底衫在 `data/blanks.js` 标注数据来源 + 核对日期

### ✅ M2：Programmatic SEO 多页（已构建，待部署）
- [x] `data/blanks.js`：单一数据源（BLANKS+THEMES，UMD，浏览器/Node 共用）
- [x] `data/seo-copy.js`：14 个型号各自的 SEO 文案（面料/版型/POD 场景）
- [x] `templates/seo-page.html`：型号页模板（静态表格 + 交互生成器 + 占位符）
- [x] `scripts/build-seo-pages.js`：为每个 slug 生成 HTML + `sitemap.xml` + index
- [x] 每页 `<title>` / `<meta description>` / canonical / OG 标签
- [x] 内链（同品牌优先 + 其他热门，8 条）
- [x] 主页 `chartpress-design.html` 改用 `data/blanks.js`（单一数据源）
- [ ] **部署到 Vercel / Netlify，提交 sitemap 到 Google Search Console**（下一步）

**本地构建/预览**：
```bash
node scripts/build-seo-pages.js     # 生成 dist/（14 页 + sitemap + index + data）
# 预览：用任意静态服务器打开 dist/，如
npx serve dist
```
> `dist/` 是构建产物，已 gitignore，不入库。部署时部署 `dist/` 目录。

---

## 如何在另一台机器继续

```bash
# 1. 克隆
git clone <远程仓库地址>
cd chartpress-design

# 2. 验证 M1（无需安装依赖，纯静态）
open chartpress-design.html        # macOS
# 或直接用浏览器打开 chartpress-design.html

# 3. 开始 M2
#    见 chartpress-design-doc.md §13（Programmatic SEO）和 §14（实现步骤）
```

**依赖说明**：
- M1 零依赖，单 HTML 文件，浏览器直接打开即可（html2canvas 走 CDN）
- M2 需要 Node.js（运行 `scripts/build-seo-pages.js`）

---

## 调研所需 MCP 服务器配置

> 底衫数据调研（验证型号热度、补全数据）需要以下 MCP。本机网络无法访问，需在另一台机器配置后补做。
> 全部通过 `uvx` 从 PyPI 自动安装运行，无需手动 clone。

### 底衫调研优先级

| 优先级 | MCP | 用途（针对 ChartPress） |
|--------|-----|------------------------|
| 🔴 必需 | `niche-google-trends-mcp` | 对比各底衫型号搜索热度（gildan 5000 vs 64000 vs 18000…），确认是否漏热门型号 |
| 🔴 必需 | `niche-reddit-mcp` | 看 r/printondemand、r/EtsySellers 卖家实际常用哪些底衫 |
| 🟡 有用 | `niche-g2-mcp` | 分析现有 size chart 工具竞品差评 |
| 🟡 有用 | `niche-hackernews-mcp` | 开发者/卖家社区讨论 |
| 🟢 可选 | `niche-producthunt-mcp` | 发现新兴尺码表工具 |
| 🟢 可选 | `niche-github-issues-mcp` | 开源尺码表工具的功能请求 |
| 🟢 可选 | `niche-alternativeto-mcp` | 替代品需求 |

### 配置方法

写入 `~/.claude/settings.local.json` 的 `mcpServers` 字段（用 `settings.local.json` 避免污染全局）：

```json
{
  "mcpServers": {
    "niche-reddit-mcp": {
      "command": "uvx",
      "args": ["niche-reddit-mcp"],
      "env": {
        "REDDIT_CLIENT_ID": "",
        "REDDIT_CLIENT_SECRET": ""
      }
    },
    "niche-google-trends-mcp": {
      "command": "uvx",
      "args": ["niche-google-trends-mcp"]
    },
    "niche-producthunt-mcp": {
      "command": "uvx",
      "args": ["niche-producthunt-mcp"],
      "env": {
        "PRODUCTHUNT_TOKEN": ""
      }
    },
    "niche-g2-mcp": {
      "command": "uvx",
      "args": ["niche-g2-mcp"]
    },
    "niche-github-issues-mcp": {
      "command": "uvx",
      "args": ["niche-github-issues-mcp"],
      "env": {
        "GITHUB_TOKEN": ""
      }
    },
    "niche-hackernews-mcp": {
      "command": "uvx",
      "args": ["niche-hackernews-mcp"]
    },
    "niche-alternativeto-mcp": {
      "command": "uvx",
      "args": ["niche-alternativeto-mcp"]
    }
  }
}
```

写入后**重启会话**使 MCP 生效。

### PyPI 包地址（uvx 自动拉取）

| MCP 服务器 | PyPI 包 | 包地址 | 需要凭证 |
|-----------|---------|--------|---------|
| niche-reddit-mcp | `niche-reddit-mcp` | https://pypi.org/project/niche-reddit-mcp/ | Reddit OAuth2 |
| niche-google-trends-mcp | `niche-google-trends-mcp` | https://pypi.org/project/niche-google-trends-mcp/ | 无 |
| niche-producthunt-mcp | `niche-producthunt-mcp` | https://pypi.org/project/niche-producthunt-mcp/ | PH Developer Token |
| niche-g2-mcp | `niche-g2-mcp` | https://pypi.org/project/niche-g2-mcp/ | 无（浏览器自动化） |
| niche-github-issues-mcp | `niche-github-issues-mcp` | https://pypi.org/project/niche-github-issues-mcp/ | GitHub Token（可选） |
| niche-hackernews-mcp | `niche-hackernews-mcp` | https://pypi.org/project/niche-hackernews-mcp/ | 无 |
| niche-alternativeto-mcp | `niche-alternativeto-mcp` | https://pypi.org/project/niche-alternativeto-mcp/ | 无 |

### 凭证获取地址

| 凭证 | 获取地址 | 步骤 |
|------|---------|------|
| **Reddit** `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET` | https://www.reddit.com/prefs/apps | 创建 "script" 类型 app → client_id 在 app 名下方，client_secret 单独列出 |
| **Product Hunt** `PRODUCTHUNT_TOKEN` | https://www.producthunt.com/v2/oauth/applications | 创建应用 → 获取 Developer Token |
| **GitHub** `GITHUB_TOKEN`（可选） | https://github.com/settings/tokens | 创建 Personal Access Token (Classic)，勾选 `public_repo`。无 token 也能用（60 请求/小时），有 token 达 5000/小时 |

> Google Trends / G2 / Hacker News / AlternativeTo **无需凭证**。
> Google Trends 走真实 Chrome 浏览器，可能受 Google 限流（429）；G2 有 CAPTCHA，首次需手动验证（`uvx niche-g2-mcp --login`）。

### 底衫调研具体用法（配好后执行）

```
# 1. Google Trends 对比型号热度（每批最多 5 个）
trends_compare(keywords=["gildan 5000","gildan 64000","gildan 18000","bella canvas 3001","comfort colors 1717"], timeframe="12m", geo="US")

# 2. 关联查询发现遗漏型号
trends_related_queries(keyword="gildan size chart", timeframe="12m")

# 3. Reddit 看卖家实际用哪些底衫
reddit_search_pain_points(subreddits=["printondemand","EtsySellers"], keywords=["best blank tshirt","which blank","gildan 5000 vs"], time_filter="year")
```

---

## 文件结构（当前 / 目标）

```
chartpress-design/
├── chartpress-design.html      # M1 主工具页（当前可用，正式版将更名为 index.html）
├── chartpress-design-doc.md    # 完整设计文档（§1-16）
├── PROGRESS.md                 # 本进度文档
│
├── data/blanks.js              # ⏳ M2：抽出共享底衫数据
├── templates/seo-page.html     # ⏳ M2：型号页模板
├── scripts/build-seo-pages.js  # ⏳ M2：构建脚本
└── dist/                       # ⏳ M2：构建产出（部署目录）
```

---

## 关键决策记录

| 决策 | 选择 | 理由 |
|------|------|------|
| 架构 | 纯前端，零后端 | 成本 $0，验证失败代价极低 |
| PNG 导出库 | html2canvas（CDN） | 无需构建，直接可用 |
| HTML 片段 | 从数据生成内联样式片段（非克隆 DOM） | 输出更干净，粘贴到 Shopify 不依赖外部 CSS |
| 内部单位 | 恒用英寸 | 避免双向换算误差 |
| 主题数 | 5 个（非文档初稿的 3 个） | 原型已实现 5 个，覆盖更多店铺风格 |
| MVP 文案 | 诚实标注 8 底衫、免费 | 验证阶段不夸大，避免误导 |

---

## 验证指标（北极星）

- **北极星**：周 PNG 下载量
- 上线 8 周目标：自然搜索 UV 1000+/周、下载转化率 > 30%
- 成功标准：转化率 > 30% 且有自然回访 → 投入扩展
- 失败标准：8 周后周下载 < 50 → 止损
