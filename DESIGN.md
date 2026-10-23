# JianHeShui GitHub 主页 · 视觉规范（DESIGN CONTRACT）

> 本文件是所有子任务（teammate）的共同契约。**动手写任何文件前先完整读一遍**。
> 设计目标：一个「液态玻璃（iOS 26 Liquid Glass）」风格、暗/亮双主题自适应、零外部依赖的 GitHub 主页。

---

## 0. 背景

- 主人：`JianHeShui`（GitHub ID `318305628`），成都工业学院（CDTU）学生 / 开发者。
- 主页形态：GitHub Profile README —— 仓库 `JianHeShui/JianHeShui`，根目录 `README.md` 渲染在 `github.com/JianHeShui` 顶部。
- 参考审美：工作区 `液态玻璃开源方案调研.md`、`现代风格UI设计方案（Tkinter）.md`。偏好：**磨砂玻璃 + 边缘高光 + 柔和彩色光晕 + 精致小字距**，不要花哨廉价感。
- 交付给人看的是「一眼觉得高级」，所以**留白、对齐、字重层级》特效堆砌**。

---

## 1. GitHub 平台硬约束（违反 = 效果全废，务必逐条遵守）

### 1.1 README 的 HTML 白名单（只能在 README.md 里用这些）
允许：`<p align>`、`<img>`、`<picture>`、`<source>`、`<a>`、`<br>`、`<div>`、`<details>`/`<summary>`、`<table>`、`<kbd>`、`<sub>`/`<sup>`、`<b>`/`<i>`、`<h1-h6>`、`<hr>`、`<picture>`。
**禁止**：`<style>`、`<script>`、`<iframe>`、`<form>`、`<input>`、`on*` 事件属性、外链 CSS、`<foreignObject>` 相关写法。

### 1.2 结论：所有视觉效果必须「烧进 SVG 图片里」
README 只能引用图片，因此每个视觉区块 = 一个自包含 SVG 文件，用 `<img src="assets/xxx.svg" width="100%">` 引用。

### 1.3 SVG 作为 `<img>` 被加载时的**支持边界**
| 能力 | 支持 | 说明 |
| --- | --- | --- |
| 内嵌 `<style>` + CSS 动画 | ✅ | 主流浏览器均渲染 img 内 SVG 的 CSS 动画 |
| SMIL `<animate>` / `<animateTransform>` | ✅ | 可用，关键处可作 CSS 动画的补充 |
| `@media (prefers-color-scheme: dark)` | ✅ | **本项目双主题的主方案**，见 §5 |
| `<linearGradient>` / `<radialGradient>` / `<filter>` | ✅ | 尽量用渐变代替 filter，性能更好 |
| 外部图片 `<image href="https://...">` | ❌ | 被禁止，图片不会加载 |
| 外部字体 `@font-face src:url()` | ❌ | 被禁止 |
| `<script>` / `on*` 属性 | ❌ | 被剥离 |
| `<foreignObject>` | ❌ | **禁止使用**，一律用 `<text>` 排版 |

### 1.4 字体：只能用系统字族栈
```
无衬线：-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", Roboto, Helvetica, Arial, sans-serif
等宽：  ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace
```
属性写法（注意转义）：`font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', Roboto, Helvetica, Arial, sans-serif"`（SVG 属性里用**单引号**包字体名）。

- **禁止使用 emoji 排文**（跨平台基线会错位、且彩色 emoji 破坏克制感）。需要图标就画几何图形（圆、折线、圆角矩形）或直接用 Unicode 几何符号 `●` `→` `·`。
- 中文必须真实可显示（用上面的字体栈，不要写 `SimHei` 之类）。

### 1.5 显示尺寸
GitHub 桌面端 README 内容区宽约 **880px**。画布按 1200 宽设计，显示时等比缩到 ~880（缩放 0.733）。
因此：**正文最小字号 16（缩放后 ≈11.7px，可读下限）**，注释性小字最小 13（≈9.5px，仅用于装饰性大写标签，不要承载关键信息）。

---

## 2. 文件清单与规格（每个人只写自己名下的文件）

| 文件 | 画布 (viewBox) | 负责人 | 内容 |
| --- | --- | --- | --- |
| `assets/hero.svg` | `0 0 1200 380` | teammate `hero-designer` | 封面主视觉：玻璃大卡片 + 头像单色徽标 + 名字 + tagline + 状态胶囊 |
| `assets/typing.svg` | `0 0 1200 110` | teammate `components-designer` | 打字机轮播条（等宽字体 + 闪烁光标） |
| `assets/tech-stack.svg` | `0 0 1200 300` | teammate `components-designer` | 技术栈分组玻璃条（3 组 × 若干 chip） |
| `assets/projects.svg` | `0 0 1200 470` | teammate `projects-designer` | 精选项目卡片墙 2×2（4 张玻璃卡片） |
| `assets/footer.svg` | `0 0 1200 96` | teammate `components-designer` | 页脚：社交链接胶囊 + 波浪/渐变收尾 |
| `docs/**` | — | teammate `pages-engineer` | GitHub Pages 站点（独立 HTML/CSS/JS，见 §8） |
| `README.md` / `preview/` / `DEPLOY.md` | — | Lead | 集成，勿动 |

**文件命名、viewBox 高度必须完全一致**，否则 Lead 集成时排版会错位。

---

## 3. 设计 Token（唯一真源，所有 SVG 用这一套）

### 3.1 颜色 —— 暗色（默认 `prefers-color-scheme: dark`）
| Token | 值 | 用途 |
| --- | --- | --- |
| `--bg-0` | `#05060A` | 画布底最深 |
| `--bg-1` | `#0B101C` | 画布底次深（渐变另一端） |
| `--glass-fill` | `rgba(255,255,255,0.055)` | 玻璃面填充 |
| `--glass-fill-2` | `rgba(255,255,255,0.085)` | 玻璃面填充（强调块/悬停层） |
| `--glass-stroke` | `rgba(255,255,255,0.16)` | 玻璃 1px 描边 |
| `--glass-hl` | `rgba(255,255,255,0.55)` | 顶部高光线 |
| `--ink-0` | `#F7F9FC` | 主文字 |
| `--ink-1` | `#A8B4C8` | 次文字 |
| `--ink-2` | `#6B7A91` | 弱文字 / 装饰标签 |
| `--accent-a` | `#7DD3FC` | 强调色 1（冰蓝） |
| `--accent-b` | `#A78BFA` | 强调色 2（薰衣草紫） |
| `--accent-c` | `#F0ABFC` | 强调色 3（浅粉） |

### 3.2 颜色 —— 亮色（`prefers-color-scheme: light`）
| Token | 值 |
| --- | --- |
| `--bg-0` | `#F2F5FA` |
| `--bg-1` | `#FFFFFF` |
| `--glass-fill` | `rgba(255,255,255,0.62)` |
| `--glass-fill-2` | `rgba(255,255,255,0.82)` |
| `--glass-stroke` | `rgba(15,23,42,0.10)` |
| `--glass-hl` | `rgba(255,255,255,0.95)` |
| `--ink-0` | `#0B1220` |
| `--ink-1` | `#46536B` |
| `--ink-2` | `#7A879C` |
| `--accent-a` | `#0EA5E9` |
| `--accent-b` | `#8B5CF6` |
| `--accent-c` | `#D946EF` |

### 3.3 字号 / 字重 / 字距（画布 1200 宽下）
| 角色 | size | weight | letter-spacing |
| --- | --- | --- | --- |
| 封面名字 | 72 | 800 | `-1.6` |
| 封面 tagline | 23 | 450 | `0.3` |
| 区块标题 | 30 | 700 | `-0.4` |
| 卡片标题 | 22 | 650 | `-0.2` |
| 正文 / 描述 | 16 | 400 | `0` |
| 小标签（全大写装饰） | 13 | 700 | `1.8` |
| 等宽正文（打字条） | 26 | 500 | `0.2` |

### 3.4 间距 / 圆角
- 画布外边距：左右 `40`，上下 `32`
- 卡片圆角 `26`；胶囊圆角 = 高度一半；小 chip 圆角 `12`
- 卡片内边距 `28`
- 区块标题与内容间距 `18`

---

## 4. 液态玻璃 SVG 实现配方（照抄即可，这是本项目视觉的命门）

一张玻璃卡片 = **6 层叠加**，顺序不能变：

```svg
<!-- ① 投影：让卡片"浮"起来 -->
<filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
  <feDropShadow dx="0" dy="18" stdDeviation="26" flood-color="#000" flood-opacity="0.35"/>
</filter>

<!-- ② 玻璃面：半透明填充 + 1px 描边 -->
<g filter="url(#shadow)">
  <!-- ⚠️ fill/stroke 必须由 class 注入，不能写 fill="var(--glass-fill)"（不生效，见要点 0） -->
  <rect x="40" y="40" width="1120" height="300" rx="26" class="glass"/>
</g>

<!-- ③ 顶部高光：一条线性渐变细线，只在上半边（用 clipPath 裁圆角） -->
<clipPath id="cardClip">
  <rect x="40" y="40" width="1120" height="300" rx="26"/>
</clipPath>
<g clip-path="url(#cardClip)">
  <rect x="40" y="40" width="1120" height="1.2"
        fill="url(#hlGrad)"/>   <!-- hlGrad: rgba(255,255,255,0.55) → transparent，横向 -->
  <!-- ④ 内部柔光：左上角一团低透明度径向白 -->
  <circle cx="240" cy="90" r="240" fill="url(#innerGlowDark)"/>  <!-- 白 0.07 → 0 -->
</g>

<!-- ⑤ 伪色散边缘（模拟折射）：偏移 0.7px 的两条细描边 -->
<path d="…圆角矩形上半弧…" class="disp-a"/>
<path d="…圆角矩形下半弧…" class="disp-c"/>

<!-- ⑥ 角落光斑：径向渐变彩团，半径 200~420，不透明度 0.10~0.22 -->
<circle cx="120" cy="60" r="380" fill="url(#glowBlue)"/>
```

要点与常见错误：
0. **【最高优先级】presentation attribute 里禁止写 `var()`** —— `<rect fill="var(--glass-fill)">` 或 `stroke="var(--accent-a)"` 在浏览器里**完全不生效**（presentation attribute 的值不参与 CSS 变量替换），玻璃会渲染成纯黑/无描边。变量只能写在 `<style>` 的规则里，元素上只挂 `class`。渐变 `stop-color` 同理，必须用字面色值。
1. **渐变 id 全文件唯一**，跨文件无所谓（每个文件独立）。建议统一前缀 `hero-` / `typing-` / `stack-` / `proj-` / `footer-`，避免同文件内冲突。
2. `feDropShadow` 一个文件最多 **1~2 个**，太多会掉帧。
3. 圆角矩形的高光/色散边，**用 clipPath 裁**，不要手写长 `path` 弧线（容易画歪）。
4. 玻璃面上的文字不加 `filter`，保持锐利。
5. 背景光斑用 `radialGradient`（stop 0.5→0）即可，**不要**再加 `feGaussianBlur`。
6. 大范围背景渐变用 `linearGradient` 从 `--bg-0` 到 `--bg-1`。

---

## 5. 双主题模板（每个 SVG 开头必须抄这段，然后只写规则不写硬编码颜色）

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="380" viewBox="0 0 1200 380">
  <style>
    :root {
      --bg-0:#05060A; --bg-1:#0B101C;
      --glass-fill:rgba(255,255,255,0.055); --glass-fill-2:rgba(255,255,255,0.085);
      --glass-stroke:rgba(255,255,255,0.16); --glass-hl:rgba(255,255,255,0.55);
      --ink-0:#F7F9FC; --ink-1:#A8B4C8; --ink-2:#6B7A91;
      --accent-a:#7DD3FC; --accent-b:#A78BFA; --accent-c:#F0ABFC;
      --glow-op:0.20;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg-0:#F2F5FA; --bg-1:#FFFFFF;
        --glass-fill:rgba(255,255,255,0.62); --glass-fill-2:rgba(255,255,255,0.82);
        --glass-stroke:rgba(15,23,42,0.10); --glass-hl:rgba(255,255,255,0.95);
        --ink-0:#0B1220; --ink-1:#46536B; --ink-2:#7A879C;
        --accent-a:#0EA5E9; --accent-b:#8B5CF6; --accent-c:#D946EF;
        --glow-op:0.13;
      }
    }
    .ink0 { fill: var(--ink-0); }
    .ink1 { fill: var(--ink-1); }
    .ink2 { fill: var(--ink-2); }
    .glass { fill: var(--glass-fill); stroke: var(--glass-stroke); stroke-width: 1; }
    .stroke-glass { stroke: var(--glass-stroke); fill: none; }
    .disp-a { fill: none; stroke: var(--accent-a); stroke-opacity: 0.28; stroke-width: 1; }
    .disp-c { fill: none; stroke: var(--accent-c); stroke-opacity: 0.22; stroke-width: 1; }
    .pill { fill: var(--glass-fill-2); stroke: var(--glass-stroke); stroke-width: 1; }
  </style>
  <!-- 内容 -->
</svg>
```

- **默认即暗色**（`@media (prefers-color-scheme: light)` 覆盖为亮色）。这样深色用户直接得到最终效果，浅色用户自动切换。
- 渐变 `stop-color` **不能用 CSS 变量**（浏览器对 `stop-color: var()` 支持不一致）。解决：渐变定义里用 `stop-color="#FFFFFF"` 这种字面色值，再通过 `stop-opacity` 控制强度；需要随主题变色的地方改用**纯色 + opacity 叠加**或用两块（暗/亮各一组渐变），用 CSS 控制 `display`：
  ```css
  .only-dark { display: inline; } .only-light { display: none; }
  @media (prefers-color-scheme: light) { .only-dark { display: none; } .only-light { display: inline; } }
  ```
  这是本项目处理"必须换色的渐变"的唯一允许做法。
- 文本颜色一律走 `class="ink0/ink1/ink2"`，**不要**在 `<text fill="...">` 里硬编码。

---

## 6. 动效规范

| 动效 | 实现 | 时长 | 说明 |
| --- | --- | --- | --- |
| 背景光斑漂移 | CSS `@keyframes drift`：`translate(0 0) → translate(14px, -10px)` | 22s | `ease-in-out infinite alternate` |
| 卡片入场 | `opacity 0→1` + `translateY(10px)→0` | 0.9s | `cubic-bezier(.22,1,.36,1)`，`animation-fill-mode: both` |
| 高光扫过（仅 hero） | 斜向白色渐变条 `translateX(-300px) → translateX(1500px)` | 7s，`delay 2s infinite` | opacity 峰值 0.14，克制 |
| 光标闪烁（仅 typing） | `opacity 1→0` step | 1s | `steps(1)` 模拟硬闪 |
| 打字轮播（仅 typing） | 多个 `<tspan>` 或整行 `<text>` 用 `clip-path` 宽度动画 | 每条 4s 循环 | 必须做到「看起来在打字」 |

**强制要求**：
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```
- 动画只用 CSS（`@keyframes`），除非 CSS 做不了才用 SMIL。
- 不要做无限高频闪烁（GitHub 审查也会烦）。

---

## 7. 验收标准（自检清单，提交前逐条过）

1. `http://` / `https://` 在文件里**只允许出现**在 `<svg xmlns>` 和注释里（`grep -c "https://"` 只应命中 xmlns 等）。
2. 不含 `<script>`、`onclick`、`<foreignObject>`、`<image href=`。
3. 所有颜色走 CSS 变量 / class，无散落的 `fill="#58a6ff"` 式硬编码（渐变 stop 除外）。
4. 用 Edge 无头模式渲染截图自查：`msedge --headless --screenshot=out.png --window-size=1200,380 file:///...`（Lead 会统一跑，自己也跑一遍看）。
5. 在亮色主题下文字对比度足够（不用真的测，确保 `--ink-0` vs `--bg-0` 语义正确即可）。
6. 排版对齐：所有元素左右边界与 40px/n 的网格对齐，不要出现"差 3px"的参差。
7. 单文件体积 < 70KB（除非有大量文字）。
8. **文案不得留空**：用下面给定的默认文案，需要用户改的地方在 README 的 TODO 表里统一说明。

---

## 8. GitHub Pages 站点（`docs/` 目录）额外规范

- 纯静态：`docs/index.html` + `docs/style.css` + `docs/main.js`，**零构建、零 npm 依赖、零外部请求**（不引 CDN 字体/图标）。
- 与 README 同一套视觉 token（§3），但可以更放肆：真正的 `backdrop-filter: blur()` 玻璃、滚动视差、鼠标跟随光斑、滚动进场。
- `backdrop-filter` 必须带 `-webkit-` 前缀 + `@supports` 降级（不支持时退回纯色半透明）。
- 必须在 `prefers-color-scheme` 下双主题；必须有 `prefers-reduced-motion` 降级。
- 移动端可用：`<meta name="viewport">`，在 ≤720px 断点重排为单列。
- 首屏不得白屏等待 JS：内容由 HTML 静态给出，JS 只做增强。
- 站点里要有一个「返回 GitHub 主页」的入口，和一个指向 README 的项目区锚点。

---

## 9. 内容文案（统一使用，勿自行发挥）

```
名字        JianHeShui
身份        成都工业学院 · 学生开发者 / Developer
tagline     把想法做成能用的东西 · Building things that actually work
状态        Available for collaboration
地点        Chengdu, China
正在做      Campus network tooling & developer tools

技术栈（3 组）
  Languages   TypeScript · Python · Java · C
  Frontend    React · Vite · Tailwind CSS
  Tools       Git · Docker · Linux · Neovim

精选项目（4 个，名称与一句话介绍固定→）
  campus-auth            校园网认证一键登录，桌面端零配置接入
  cdtu-campus-network    成都工业学院校园网协议逆向与自动化实现
  wechat-stats           微信公众号数据抓取的整理与可视化
  deepseek-harness       围绕 DeepSeek Harness 的本地增强与插件实验
```

> 这些是**基于工作区真实项目**提炼的默认文案。用户可改，Lead 会在 README 的 TODO 表统一列出。

---

## 10. 交付纪律

- 只写你名下的文件（§2 表格），**不要**改别人的文件、不要改 README.md / DESIGN.md。
- 写完立刻自己渲染一次截图自查，发现排版问题自己修，不要留给 Lead。
- 完成后在共享任务里 `complete`，并把「做了什么 + 截图路径 + 遗留问题」简要回报给 Lead。
