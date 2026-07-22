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
