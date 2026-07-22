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
| **M1 单页工具** | ✅ 已完成 | 8 底衫 + 5 主题 + IN/CM + 真实 PNG 导出 + 真实 HTML 复制 |
| **M2 Programmatic SEO** | ⏳ 待开始 | 每型号独立 URL 页 + 构建脚本 + sitemap |
| **M3 上线 + 观察** | ⏳ 待开始 | 部署 + 提交收录 + 埋点 |
| **M4 验证后扩展** | ⏳ 待定 | 扩底衫库 / 自定义数据 / PDF / Logo |

---

## M1 已完成清单

- [x] 8 个底衫数据（含 `slug` 字段，用于 SEO URL）：
  - Gildan 5000 / Gildan 18500 / Bella+Canvas 3001 / Comfort Colors 1717
  - Next Level 3600 / AS Colour 001 / Champion S700 / Russell Athletic 017M
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
- [ ] 切换 8 个底衫 → hero + demo 预览同步更新
- [ ] 切 IN/CM、切 5 主题 → 数值/配色正确
- [ ] 点 `Press PNG` → 真实下载 PNG，文件名 `{slug}-size-chart-{unit}.png`
- [ ] 点 `Copy HTML` → 粘贴到空白页，表格正常、不依赖外部 CSS
- [ ] 375px 移动端布局不溢出

### 🟡 中优先级：底衫数据调研补全（**重要，尚未完成**）
> 当前 8 个底衫基于设计文档的既有调研选定，但**未亲自验证当前市场热度**。
> 本机网络环境无法访问 Google Trends / Reddit MCP（超时/未配置凭据），需在另一台机器补做：
- [ ] 用 Google Trends 对比各型号搜索热度，确认是否漏了热门型号
  - **重点怀疑遗漏**：`Gildan 64000`（Softstyle，极热门）、`Gildan 18000`（Heavy Blend Hoodie）
- [ ] 用 Reddit（r/printondemand, r/EtsySellers）验证卖家实际常用底衫
- [ ] 核对每个底衫的官方 flat measurements 是否准确（当前为近似值，需对照官网）
- [ ] 决定是否扩充底衫库（MVP 目标 8-10 个）

### 🟢 M2：Programmatic SEO 多页
- [ ] `data/blanks.js`：抽出共享数据（与主页面共用）
- [ ] `templates/seo-page.html`：型号页模板（含占位符 + 静态表格）
- [ ] `scripts/build-seo-pages.js`：为每个 slug 生成 HTML + `sitemap.xml`
- [ ] 每页 `<title>` / `<meta description>` / canonical / OG 标签
- [ ] 内链（同品牌型号 + 主工具页）
- [ ] 部署到 Vercel / Netlify，提交 sitemap

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
