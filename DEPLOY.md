# 上线指南 · 把这份界面挂到 github.com/JianHeShui

> 目标：`https://github.com/JianHeShui` 顶部直接显示这套液态玻璃界面。
> 全程约 10 分钟，最后一步才需要改动文案。

---

## 0. 目录说明

```
github-profile/
├── README.md            ← 主页本身（GitHub 渲染的就是它）
├── assets/              ← 全部视觉资产（自绘 SVG，无外部依赖）
│   ├── hero-minimal.svg   ① 极简封面：只有大字标题（README 当前启用）
│   ├── hero.svg           完整封面：chips / tagline / 徽标圆（备用）
│   ├── projects.svg       精选项目 2×2 卡片墙（备用）
│   ├── typing.svg         打字机状态条（备用）
│   ├── tech-stack.svg     技术栈（备用）
│   └── footer.svg         页脚收尾（备用）
├── docs/                ← GitHub Pages 站点（可选，开了才有 jianheshui.github.io）
├── preview/index.html   ← 本地预览，双击即可看效果（不发布）
├── screenshots/         ← 各组件渲染截图，供参考
├── DESIGN.md            ← 设计规范（改视觉前先读）
└── DEPLOY.md            ← 本文件
```

> **当前主页只有一屏**：`hero-minimal.svg` —— 深色/浅色渐变底 + 一团彩光晕 + 居中的
> `JianHeShui` 大字（96px/800）。
> 其余 5 个 SVG 都在 `assets/` 里备用，想挂回去只需在 `README.md` 里加一行
> `<img src="assets/xxx.svg" width="100%" />`。其中 `hero.svg` 是信息完整的封面版
> （状态 chips、中英 tagline、项目行、J 徽标圆），`projects.svg` 是 2×2 项目卡片墙。

**先看效果再上线**：双击 `preview/index.html`。想对比暗/亮两种主题，切换 Windows 的
「设置 → 个性化 → 颜色 → 选择模式」，预览页会跟着变（这是 SVG 内部
`prefers-color-scheme` 在起作用，也正是 GitHub 上会生效的机制）。

---

## 1. 建同名仓库（只需一次）

GitHub 的「个人主页 README」机制：**仓库名与用户名完全一致**，它的 README 就会显示在你的主页顶部。

1. 打开 <https://github.com/new>
2. Repository name 填 **`JianHeShui`**（大小写必须完全一致）
3. 勾选 **Public**
4. **勾选** "Add a README file"（这样初始化更顺，后面直接覆盖）
5. Create repository

> 如果你之前建过 `JianHeShui` 仓库，跳过这步直接看第 2 节。

---

## 2. 推上去

### 方式 A：命令行（推荐，后续改动方便）

在本文件所在目录 `github-profile/` 下执行：

```powershell
git init
git branch -M main
git add README.md assets docs preview screenshots DESIGN.md DEPLOY.md
git commit -m "feat: liquid-glass profile"
git remote add origin https://github.com/JianHeShui/JianHeShui.git
git push -u origin main
```

如果远程已有内容（你之前建过），先拉再推：

```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**认证问题**：GitHub 从 2021 年起不再接受账号密码。首次 `push` 会弹窗让你登录，
走浏览器授权即可；若走 HTTPS 手动输入，密码要填 **Personal Access Token**
（<https://github.com/settings/tokens> → Generate new token → 勾 `repo`），不是登录密码。

本地没有 `git` 或不想用命令行的，用 **方式 B**。

### 方式 B：网页上传（最省事）

1. 打开你的仓库页面 → **Add file → Upload files**
2. 把 `assets` 文件夹、根目录的 `README.md`、`DESIGN.md` 拖进去
3. Commit changes

> `docs/`（GitHub Pages 站点）也可以一并拖进去；不想开 Pages 就跳过，不影响主页效果。

---

## 3. 验证

打开 <https://github.com/JianHeShui> —— 顶部应该就是玻璃封面。
如果显示的是仓库列表而不是封面，说明**仓库名和你用户名不一致**，这是唯一原因。

> 首次加载图片会经 GitHub 的 camo 代理，可能慢 1~2 秒；之后有缓存。

---

## 4. （可选）开启 GitHub Pages 站点

`docs/` 里是一个独立的完整站点，比 README 有更强的动效（滚动进场、鼠标跟随光斑、手动主题切换）。

1. 进入仓库 **Settings → Pages**
2. Source 选 **Deploy from a branch**
3. Branch 选 **`main`**，目录选 **`/docs`**，Save
4. 等 1~2 分钟，访问 <https://jianheshui.github.io>

开了之后，`https://jianheshui.github.io` 就能访问。当前 README 是纯图流、没有挂任何链接，
想给人站点入口就在 README 末尾补一行超链接（见 §5.1）。

---

## 5. ⚠️ 必须改的 TODO 清单

界面已经能跑，但下面这些是**基于你工作区项目推断的默认值**，请按真实情况替换。
改动点集中，全部替换约 10 分钟。

### 5.1 README.md

按你的要求，README 现在是**纯图片流**：5 张 SVG 直接串起来，没有任何 Markdown 文字段落。
所以这一节没什么要改的，只剩一个需要你知情的问题 ↓

> ⚠️ **现在页面上没有一个可点击的链接。**
> `footer.svg` 里那三个 GitHub / Email / Blog 胶囊是**装饰图形**——SVG 作为图片被引用时，
> 里面的元素无法承载超链接，点了不会跳转。
> 想要可点入口，在 `README.md` 末尾加回一行就行：
> ```html
> <p align="center">
>   <a href="https://github.com/JianHeShui"><b>GitHub</b></a> ·
>   <a href="mailto:你的邮箱@example.com"><b>Email</b></a>
> </p>
> ```
> 加不加都不影响视觉，只是少了跳转。

`alt` 文本我保留了完整信息（图片加载失败和读屏软件会用到），一般不用动。

### 5.2 assets/hero.svg

| 位置 | 现在 | 要改 |
| --- | --- | --- |
| 头像位 | 渐变字母 **J**（SVG 无法加载外链图片，所以没用真实头像） | 想换成真人头像：把头像转成 base64 内嵌。文件里有 `<!-- TODO(avatar) -->` 注释，指明替换位置 |
| 第二个 chip | `CDTU · STUDENT` | 最初的 `CDTU · CIS` 是我推断的专业缩写，已换成安全的 `STUDENT`；请按你的真实专业/学院替换 |
| 第三个 chip | `CHENGDU, CN` | 按需改城市 |
| 第一行 chip 小绿点 | `AVAILABLE FOR COLLABORATION` | 不想挂了就删掉这个 chip |

### 5.3 assets/typing.svg

| 位置 | 现在 | 要改 |
| --- | --- | --- |
| 三行滚动文案 | `building campus network tooling` 等 | 改成你当下真实在做的事，每行尽量 ≤ 38 个字符（等宽字体，超了会被裁） |

### 5.4 assets/tech-stack.svg

| 位置 | 现在 | 要改 |
| --- | --- | --- |
| 三组 chip | TypeScript / Python / Java / C · React / Vite / Tailwind CSS · Git / Docker / Linux / Neovim | **这是我按你工作区项目推断的**，删掉不会的、加上真会的。增删 chip 后注意保持每行不超出右边界（x=1160） |

### 5.5 assets/projects.svg

| 位置 | 现在 | 要改 |
| --- | --- | --- |
| 4 张卡片的名称/描述 | campus-auth、cdtu-campus-network、wechat-stats、deepseek-harness | 换成你想展示的项目。改描述时注意：**16px 下中文超过约 26 个字就会压到卡片右边框**，宁可写短 |
| 4 张卡片的语言标识 | TypeScript / Python … | 按真实语言改 |
| 卡片本身不可点击 | 图片内无法嵌超链接 | 想在主页上点进项目，需在 `README.md` 的正文里补一行 Markdown 链接列表（推荐，比图片可访问性更好） |

### 5.6 全局

- 想改主色：`DESIGN.md` §3 是唯一真源，改完在 5 个 SVG 里同步改 `:root` 变量。
- 想改名字/身份：`assets/hero.svg` 里的 `<text>` 元素。

### 5.7 docs/ 站点（只有你开了 Pages 才需要管）

| 位置 | 现在 | 要做什么 |
| --- | --- | --- |
| 项目卡「查看仓库」链接 | `github.com/JianHeShui/campus-auth` 等 4 个 | **这 4 个仓库名是我按你工作区项目推断的，GitHub 上不一定存在**，不存在就是死链。改成真实仓库地址，或统一改成 `https://github.com/JianHeShui?tab=repositories` |
| `mailto:` 链接（2 处：导航 "Get in touch"、关于区） | noreply 地址 | 换成真实邮箱 |
| 页脚「返回 GitHub 主页」 | 已指向 `https://github.com/JianHeShui` | 不用改 |

> ⚠️ 站点**没有截图**：本机沙箱禁止命名管道，Edge 与 Playwright 的 Chromium 都无法启动
> （`mojo platform_channel: 拒绝访问` / `spawn EPERM`，`--no-sandbox`、`--single-process` 均无效）。
> 所以站点的视觉验收只能在你自己的浏览器里做：双击 `docs/index.html`，切系统深浅色各看一遍。
> README 里那 5 张 SVG 的截图是有的（`screenshots/`），因为 SVG 可以走进程内光栅化。

---

## 6. 常见问题

**Q：图片不显示 / 显示破图**
A：检查 `assets/` 有没有真的推上去；README 里的路径是**相对仓库根目录**的（`assets/hero.svg`），
不是 `./assets/..` 也不是绝对路径。

**Q：动画不动**
A：GitHub 的 camo 代理会缓存图片，但 SVG 内部的 CSS 动画是浏览器执行的，正常能跑。
若完全静止：确认系统开了「减少动态效果」（Windows：设置 → 辅助功能 → 视觉效果 → 动画效果），
此时页面会尊重该偏好而禁用动画 —— 这是**特意做**的无障碍降级，不是 bug。

**Q：亮色主题下看不清**
A：SVG 内是双主题的，GitHub 上会自动跟随访问者的系统主题。若你在暗色系统下看到的是暗色版，
想验证亮色版：临时把系统切到浅色，或浏览器 DevTools → Rendering → Emulate CSS media
feature → `prefers-color-scheme: light`。

**Q：改了 SVG 后整张图不显示 / 报 `Comment must not contain '--'`**
A：XML 注释里**不能出现连续两个减号 `--`**。用 `-----` 画分隔线、或在注释里写 `--glass-fill`
这种变量名，都会让严格 XML 解析器拒绝解析整个文件 —— 而浏览器加载 SVG 也是严格 XML 模式，
结果就是图片整个不显示（不是样式错，是根本不渲染）。画分隔线用 `====` 或 `###` 代替。
当前 5 个 SVG 已全部核对为 0 处，改的时候注意别引入。

**Q：改了 SVG 但主页没变**
A：camo 有缓存。等几分钟，或改一下文件名（如 `hero-v2.svg`）并同步改 README 路径。

**Q：首屏太大 / 太矮**
A：想压缩高度，改 `README.md` 里某张图的 `width` 属性（如 `width="88%"` 居中），
或在 `assets/*.svg` 顶部加 `<!-- height 由 viewBox 决定 -->` 后重调 viewBox 高度并重排内部元素。

---

## 7. 进阶（以后想做再做）

- **自绘 GitHub 统计卡片**：用 GitHub Actions 每天抓 API，把数字注入一张与整套风格一致的
  `assets/stats.svg`。比引第三方 `github-readme-stats` 卡片好看得多（后者风格无法统一）。
- **自定义域名**：Pages → Custom domain，填自己的域名，比 `*.github.io` 更专业。
- **中英双语版**：复制一份 `README.en.md`，在 README 顶部加 `[English](README.en.md) | 中文` 切换。
