# WebNav Hub

[English](#english) | [中文](#中文)

<div align="center">
  <img src="public/favicon.svg" alt="WebNav Hub" width="96">
</div>

<a name="english"></a>

## 🎨 Design Inspiration

This project's UI design and color scheme is directly inspired by Pornhub's iconic black and orange theme. The choice was deliberate, leveraging the instantly recognizable color palette that has become a cultural phenomenon and internet meme, often referenced in various UI design discussions and parodies.

- Primary Theme Color: `#ff9000` (Pornhub Orange)
- Background: `#0d0d0d` (Dark Black)
- Card Background: `#1a1a1a`
- Text: `#ffffff` (White)

## 🧱 Tech Stack

The site is built with **[Qwik](https://github.com/QwikDev/qwik) 2 + Qwik Router** (latest release, `2.0.0-rc.4`), the resumable framework: pages are server-rendered and then *resumed* on the client instead of hydrated, so the only JavaScript shipped is the code for interactions that actually exist (the category nav).

- Qwik `2.0.0-rc.4` (`@qwik.dev/core`) — component model, signals, lazily-loaded event handlers (`onClick$`)
- Qwik Router `2.0.0-rc.4` (`@qwik.dev/router`) — file-based routing, `DocumentHead`, static site generation
- Vite `8` (Rolldown) — dev server & bundler
- Bun — package manager, lockfile (`bun.lock`) and script runner
- TypeScript `7` — strict mode, `~/*` path alias (resolved natively by Vite 8)
- `@qwik.dev/router/adapters/ssg` — SSG adapter, emits a fully static `dist/`

## 🌟 Features

### Modern Design

- Responsive grid layout with beautiful cards
- Smooth animations and transitions
- Dark theme with modern color scheme
- Optimized for both desktop and mobile devices

### Content

- **160 link cards** across 6 categories on the home page
- **30 domain / DNS links** on a dedicated `/domains/` sub-page
- Every external link opens in a new tab with `rel="noopener noreferrer"`

### Technical Highlights

- Every card is statically rendered into the HTML at build time — the whole directory is visible with JavaScript disabled (no client-side `fetch` of `links.json`)
- Data-driven: categories and links live in `src/data/links.json` and are typed through `LinkItem`
- Components: `<LinkCard>` for the semantic `<a class="link-card">`, `<TopNav>` for the sticky category bar
- Smooth anchor navigation with `scroll-margin-top`, `IntersectionObserver` ScrollSpy and `history.pushState` hash sync — ported to Qwik signals, so the active state survives resume
- Route-level SEO: per-page `<title>`, description, canonical and Open Graph tags via `DocumentHead`
- Only the interactions that exist ship JavaScript; header/footer/cards are 0 KB of client JS
- CSS custom properties for the color palette and responsive breakpoints (1200px / 768px / 480px / 360px)
- Custom SVG favicon, no image assets required

## 📂 Project Structure

```
├── src/
│   ├── root.tsx                          # useQwikRouter(), global styles, <head>
│   ├── entry.dev.tsx                     # dev entry (client render)
│   ├── entry.ssr.tsx                     # SSR entry (shared by middleware + SSG)
│   ├── entry.preview.tsx                 # preview server entry
│   ├── global.css                        # Shared stylesheet (colors in :root)
│   ├── constants.ts                      # SITE_URL / SITE_NAME
│   ├── data/links.json                   # Centralized link data (6 categories / 160 cards + 30 domains)
│   ├── components/
│   │   ├── link-card.tsx                 # <a class="link-card"> card
│   │   ├── top-nav.tsx                   # Sticky nav + ScrollSpy (client-only behaviour)
│   │   └── router-head/router-head.tsx   # SEO / Open Graph / FontAwesome CDN <head>
│   └── routes/
│       ├── layout.tsx                    # <header> + <footer> site chrome
│       ├── index.tsx                     # Home page
│       └── domains/index.tsx             # Free domain / DNS sub-page
├── .github/workflows/deploy.yml          # GitHub Pages CI (build + deploy)
├── adapters/static/vite.config.ts        # SSG adapter (static output in dist/)
├── public/favicon.svg                    # Site icon
├── vite.config.ts                        # Vite 8 + Qwik Router + Qwik optimizer
├── tsconfig.json
├── package.json
└── bun.lock                              # Bun lockfile
```

## 🚀 Getting Started

This project uses **Bun** — no npm lockfile, no `npm run`.

```bash
bun install      # install dependencies (writes bun.lock)
bun run dev      # http://localhost:5173 — dev server with HMR
bun run build    # type-check + client build + static SSG into dist/
bun run preview  # serve the built output locally
```

`bun run build` produces a fully static site in `dist/` (`index.html`, `domains/index.html`, hashed JS in `dist/build/`, `sitemap.xml`). CI runs `bun install --frozen-lockfile && bun run build`.

## 🗂 Categories

| Category | ID | Cards |
| --- | --- | --- |
| Ai搜索 | `ai-search` | 54 |
| 托管社交 | `social` | 22 |
| 实用工具 | `tools` | 60 |
| 科技资讯 | `tech-news` | 9 |
| 云存储 | `cloud-storage` | 7 |
| 电子邮箱 | `email` | 8 |

The 实用工具 grid contains one internal card (`"internal": true`) that links to `/domains/`. That sub-page renders from the `domains` array in `src/data/links.json`.

## 🚀 Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`. Enable it once under **Settings → Pages → Source: GitHub Actions**.

A GitHub Pages *project* site is served from `https://<owner>.github.io/<repo>/`, so the build takes two env vars:

- `PUBLIC_BASE_PATH=/<repo>/` — Vite `base` + Qwik City `basePathname`; rewrites asset, favicon and internal-link URLs
- `PUBLIC_SITE_ORIGIN=https://<owner>.github.io` — SSG origin for canonical URLs, Open Graph tags and `sitemap.xml`

Both are derived from the repository in the workflow, so a repo rename needs no code change. The base path only rewrites URLs — the SSG always writes the site to `dist/`, which is what the workflow uploads.

### Any other static host

Run `bun run build` and publish `dist/`. On Cloudflare Pages: build command `bun run build`, output directory `dist` (install command `bun install`).

### Custom Domain

1. Point the domain's DNS at your host and add it as the Pages custom domain
2. Drop the base path: set `PUBLIC_BASE_PATH: /` in the workflow (or remove it) and rebuild
3. Match the origin so canonical/OG URLs stay correct: `PUBLIC_SITE_ORIGIN: https://your.domain` (the local fallback lives in `src/constants.ts`)

## 🛠 Customization

### Adding a New Link

Append an entry to the target category's `links` array (or to the `domains` array) in `src/data/links.json`:

```json
{
  "title": "[TITLE]",
  "url": "[URL]",
  "icon": "[ICON-CLASS]"
}
```

Add `"internal": true` for same-tab internal links. The item is rendered as a semantic `<a class="link-card">` at build time.

### Adding a New Category

Add a category object to the `categories` array in `src/data/links.json`:

```json
{
  "id": "[CATEGORY-ID]",
  "title": "[CATEGORY-NAME]",
  "links": [
    {
      "title": "[TITLE]",
      "url": "[URL]",
      "icon": "[ICON-CLASS]"
    }
  ]
}
```

The category section **and** its top-nav item are both generated from the JSON, so no JSX edit is needed — smooth scrolling and ScrollSpy active highlighting are wired up automatically.

### Changing Colors

All colors live in the `:root` block at the top of `src/global.css`:

```css
:root {
  --primary-color: #ff9000;
  --bg-color: #0d0d0d;
  --card-bg-color: #1a1a1a;
  --text-color: #fff;
}
```

## 📱 Browser Support

- Modern browsers with CSS Grid and `IntersectionObserver`
- Responsive down to 360px viewport width
- Content is server-rendered: with JavaScript disabled every card, category and page still renders; only scroll-spy highlighting is inert

## 🔒 Security

All external links include security attributes:

- `rel="noopener"`: Prevents `window.opener` exploitation
- `rel="noreferrer"`: Prevents referrer information leakage

## 📄 License

This project is open-source and available under the MIT License.

---

<a name="中文"></a>

## 🎨 设计灵感

本项目的界面设计和配色方案直接借鉴自 Pornhub 的标志性黑橙配色。这是一个刻意的设计选择，利用了这个已成为文化现象和网络模因的即时可识别配色方案，经常在各种 UI 设计讨论和模仿作品中被引用。

- 主题主色：`#ff9000`（Pornhub 橙）
- 背景色：`#0d0d0d`（深黑色）
- 卡片背景：`#1a1a1a`
- 文字颜色：`#ffffff`（白色）

## 🧱 技术栈

本项目使用 **[Qwik](https://github.com/QwikDev/qwik) 2 + Qwik Router**（最新版本 `2.0.0-rc.4`）这一“可恢复（resumable）”框架：页面先在服务端渲染，随后在客户端被**恢复**而非重新水合（hydration），因此浏览器只加载真实交互（分类导航）所需的代码。

- Qwik `2.0.0-rc.4`（`@qwik.dev/core`）—— 组件模型、signal 状态、按需懒加载的事件处理器（`onClick$`）
- Qwik Router `2.0.0-rc.4`（`@qwik.dev/router`）—— 约定式路由、`DocumentHead` 头部管理、静态站点生成
- Vite `8`（Rolldown）—— 开发服务器与打包器
- Bun —— 包管理器、锁文件（`bun.lock`）与脚本运行器
- TypeScript `7` —— strict 模式，`~/*` 路径别名（由 Vite 8 原生解析）
- `@qwik.dev/router/adapters/ssg` —— SSG 适配器，输出纯静态 `dist/`

## 🌟 功能特点

### 现代设计

- 响应式网格布局，精美卡片设计
- 流畅的动画和过渡效果
- 现代深色主题配色
- 同时优化桌面和移动设备体验

### 内容规模

- 首页 **6 个分类、160 张链接卡片**
- 独立子页 `/domains/` 收录 **30 个域名 / DNS 相关链接**
- 所有外部链接均在新标签页打开，并带 `rel="noopener noreferrer"`

### 技术亮点

- 所有卡片在构建时即静态渲染进 HTML，禁用 JavaScript 也能看到完整导航目录（不再由客户端 `fetch` 拉取 `links.json`）
- 数据与视图解耦：分类与链接集中在 `src/data/links.json`，并通过 `LinkItem` 类型约束
- 组件化：`<LinkCard>` 负责语义化 `<a class="link-card">`，`<TopNav>` 负责吸顶分类导航
- 锚点平滑滚动（`scroll-margin-top` 防遮挡）+ `IntersectionObserver` 滚动监听（ScrollSpy）+ `history.pushState` 同步地址栏；状态改由 Qwik signal 管理，恢复后依然正确
- 路由级 SEO：每个页面独立输出 `<title>`、描述、canonical 与 Open Graph 标签（`DocumentHead`）
- 只为真实存在的交互下发 JS，页头 / 页脚 / 卡片本身零客户端脚本
- 使用 CSS 自定义属性管理配色，保留四档响应式断点（1200px / 768px / 480px / 360px）
- 自绘 SVG 图标，不依赖任何位图资源

## 📂 项目结构

```
├── src/
│   ├── root.tsx                          # useQwikRouter()、全局样式、<head>
│   ├── entry.dev.tsx                     # 开发入口（客户端渲染）
│   ├── entry.ssr.tsx                     # SSR 入口（中间件与 SSG 共用）
│   ├── entry.preview.tsx                 # 预览服务器入口
│   ├── global.css                        # 共用样式表（:root 中集中配色）
│   ├── constants.ts                      # SITE_URL / SITE_NAME
│   ├── data/links.json                   # 集中式数据源（首页 6 分类 160 张 + 子页 30 张）
│   ├── components/
│   │   ├── link-card.tsx                 # <a class="link-card"> 卡片
│   │   ├── top-nav.tsx                   # 吸顶导航 + ScrollSpy（仅客户端行为）
│   │   └── router-head/router-head.tsx   # SEO / Open Graph / FontAwesome CDN 头部
│   └── routes/
│       ├── layout.tsx                    # <header> + <footer> 站点外壳
│       ├── index.tsx                     # 首页
│       └── domains/index.tsx             # 免费域名 / DNS 子页
├── .github/workflows/deploy.yml          # GitHub Pages CI（构建 + 部署）
├── adapters/static/vite.config.ts        # SSG 适配器（静态输出到 dist/）
├── public/favicon.svg                    # 站点图标
├── vite.config.ts                        # Vite 8 + Qwik Router + Qwik 编译器
├── tsconfig.json
├── package.json
└── bun.lock                              # Bun 锁文件
```

## 🚀 本地运行

本项目使用 **Bun** —— 不再有 npm 锁文件，也不使用 `npm run`。

```bash
bun install      # 安装依赖（生成 bun.lock）
bun run dev      # http://localhost:5173 —— 带 HMR 的开发服务器
bun run build    # 类型检查 + 客户端构建 + 静态站点生成到 dist/
bun run preview  # 本地预览构建产物
```

`bun run build` 会在 `dist/` 生成完整静态站点（`index.html`、`domains/index.html`、`dist/build/` 下的哈希化 JS、`sitemap.xml`）。CI 执行 `bun install --frozen-lockfile && bun run build`。

## 🗂 分类一览

| 分类 | ID | 卡片数 |
| --- | --- | --- |
| Ai搜索 | `ai-search` | 54 |
| 托管社交 | `social` | 22 |
| 实用工具 | `tools` | 60 |
| 科技资讯 | `tech-news` | 9 |
| 云存储 | `cloud-storage` | 7 |
| 电子邮箱 | `email` | 8 |

实用工具网格中有一张内部卡片（`"internal": true`）指向 `/domains/`。该子页的数据存储在 `src/data/links.json` 的 `domains` 数组中。

## 🚀 部署选项

`.github/workflows/deploy.yml` 会在每次推送到 `main` 时构建并发布到 GitHub Pages。首次使用请在 **Settings → Pages → Source** 中选择 **GitHub Actions**。

GitHub Pages 的*项目站点*地址形如 `https://<owner>.github.io/<repo>/`，因此构建需要两个环境变量：

- `PUBLIC_BASE_PATH=/<repo>/` —— 同时作用于 Vite `base` 与 Qwik City `basePathname`，改写资源、图标与站内链接的 URL
- `PUBLIC_SITE_ORIGIN=https://<owner>.github.io` —— SSG origin，用于 canonical、Open Graph 与 `sitemap.xml`

两者都由工作流从仓库信息推导，仓库改名无需改代码。base path 只改写 URL —— SSG 始终输出到 `dist/`，也就是工作流上传的目录。

### 其他静态托管

执行 `bun run build` 后发布 `dist/` 即可。Cloudflare Pages 请填构建命令 `bun run build`、输出目录 `dist`（安装命令 `bun install`）。

### 自定义域名设置

1. 将域名 DNS 指向托管平台，并在 Pages 中绑定该域名
2. 去掉 base path：在工作流中设置 `PUBLIC_BASE_PATH: /`（或删除该变量）后重新构建
3. 同步 origin 以保持 canonical / OG 链接正确：`PUBLIC_SITE_ORIGIN: https://your.domain`（本地兜底值在 `src/constants.ts`）

## 🛠 自定义设置

### 添加新链接

只需在 `src/data/links.json` 对应分类的 `links` 数组（或 `domains` 数组）中新增一项：

```json
{
  "title": "[标题]",
  "url": "[URL]",
  "icon": "[图标类名]"
}
```

如果是站内跳转链接（无需新标签页打开），可额外加上 `"internal": true`。该条目会在构建时渲染为语义化的 `<a class="link-card">` 元素。

### 添加新分类

在 `src/data/links.json` 的 `categories` 数组中新增一个分类对象：

```json
{
  "id": "[分类ID]",
  "title": "[分类名称]",
  "links": [
    {
      "title": "[标题]",
      "url": "[URL]",
      "icon": "[图标类名]"
    }
  ]
}
```

分类区块**与顶部导航项都由 JSON 自动生成**，无需再手动改 JSX；平滑滚动与 ScrollSpy 高亮会自动生效。

### 修改配色

所有颜色集中在 `src/global.css` 顶部的 `:root` 中：

```css
:root {
  --primary-color: #ff9000;
  --bg-color: #0d0d0d;
  --card-bg-color: #1a1a1a;
  --text-color: #fff;
}
```

## 📱 浏览器支持

- 支持具备 CSS Grid 与 `IntersectionObserver` 的现代浏览器
- 响应式适配至 360px 视口宽度
- 内容为服务端渲染：禁用 JavaScript 时全部卡片、分类与页面依旧正常显示，仅滚动高亮失效

## 🔒 安全性

所有外部链接都包含安全属性：

- `rel="noopener"`：防止 `window.opener` 漏洞利用
- `rel="noreferrer"`：防止泄露引用来源信息

## 📄 许可证

本项目采用 MIT 许可证开源。

---

Created with ❤️ by AI, enhanced by humans
由 AI 创建，人类优化
