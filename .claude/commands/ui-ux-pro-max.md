---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 67 styles, 161 palettes, 57 font pairings, 25 charts, 16 stacks (React, Next.js, Vue, Svelte, Astro, SwiftUI, React Native, Flutter, Nuxt, Nuxt UI, Tailwind, shadcn/ui, Jetpack Compose, Three.js, Angular, Laravel). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient."
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 16 technology stacks. Searchable database with priority-based recommendations.

## When to Apply

当任务涉及 **UI 结构、视觉设计决策、交互模式或用户体验质量控制** 时，应使用此 Skill。

### Must Use

在以下情况必须调用此 Skill：

- 设计新的页面（Landing Page、Dashboard、Admin、SaaS、Mobile App）
- 创建或重构 UI 组件（按钮、弹窗、表单、表格、图表等）
- 选择配色方案、字体系统、间距规范或布局体系
- 审查 UI 代码的用户体验、可访问性或视觉一致性
- 实现导航结构、动效或响应式行为
- 做产品层级的设计决策（风格、信息层级、品牌表达）
- 提升界面的感知质量、清晰度或可用性

### Recommended

在以下情况建议使用此 Skill：

- UI 看起来"不够专业"，但原因不明确
- 收到可用性或体验方面的反馈
- 准备上线前的 UI 质量优化
- 需要对齐跨平台设计（Web / iOS / Android）
- 构建设计系统或可复用组件库

### Skip

在以下情况无需使用此 Skill：

- 纯后端逻辑开发
- 仅涉及 API 或数据库设计
- 与界面无关的性能优化
- 基础设施或 DevOps 工作
- 非视觉类脚本或自动化任务

**判断准则**：如果任务会改变某个功能 **看起来如何、使用起来如何、如何运动或如何被交互**，就应该使用此 Skill。

## Rule Categories by Priority

| Priority | Category | Impact | Domain | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|----------|----------|--------|--------|------------------------|------------------------|
| 1 | Accessibility | CRITICAL | `ux` | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | `ux` | Min size 44×44px, 8px+ spacing, Loading feedback | Reliance on hover only, Instant state changes (0ms) |
| 3 | Performance | HIGH | `ux` | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Cumulative Layout Shift |
| 4 | Style Selection | HIGH | `style`, `product` | Match product type, Consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly, Emoji as icons |
| 5 | Layout & Responsive | HIGH | `ux` | Mobile-first breakpoints, Viewport meta, No horizontal scroll | Horizontal scroll, Fixed px container widths, Disable zoom |
| 6 | Typography & Color | MEDIUM | `typography`, `color` | Base 16px, Line-height 1.5, Semantic color tokens | Text < 12px body, Gray-on-gray, Raw hex in components |
| 7 | Animation | MEDIUM | `ux` | Duration 150–300ms, Motion conveys meaning, Spatial continuity | Decorative-only animation, Animating width/height, No reduced-motion |
| 8 | Forms & Feedback | MEDIUM | `ux` | Visible labels, Error near field, Helper text, Progressive disclosure | Placeholder-only label, Errors only at top, Overwhelm upfront |
| 9 | Navigation Patterns | HIGH | `ux` | Predictable back, Bottom nav ≤5, Deep linking | Overloaded nav, Broken back behavior, No deep links |
| 10 | Charts & Data | LOW | `chart` | Legends, Tooltips, Accessible colors | Relying on color alone to convey meaning |

## Quick Reference

### 1. Accessibility (CRITICAL)

- `color-contrast` - Minimum 4.5:1 ratio for normal text (large text 3:1)
- `focus-states` - Visible focus rings on interactive elements (2–4px)
- `alt-text` - Descriptive alt text for meaningful images
- `aria-labels` - aria-label for icon-only buttons; accessibilityLabel in native
- `keyboard-nav` - Tab order matches visual order; full keyboard support
- `form-labels` - Use label with for attribute
- `skip-links` - Skip to main content for keyboard users
- `heading-hierarchy` - Sequential h1→h6, no level skip
- `color-not-only` - Don't convey info by color alone (add icon/text)
- `dynamic-type` - Support system text scaling; avoid truncation as text grows
- `reduced-motion` - Respect prefers-reduced-motion; reduce/disable animations when requested
- `voiceover-sr` - Meaningful accessibilityLabel/accessibilityHint; logical reading order
- `escape-routes` - Provide cancel/back in modals and multi-step flows
- `keyboard-shortcuts` - Preserve system and a11y shortcuts

### 2. Touch & Interaction (CRITICAL)

- `touch-target-size` - Min 44×44pt (Apple) / 48×48dp (Material); extend hit area beyond visual bounds if needed
- `touch-spacing` - Minimum 8px/8dp gap between touch targets
- `hover-vs-tap` - Use click/tap for primary interactions; don't rely on hover alone
- `loading-buttons` - Disable button during async operations; show spinner or progress
- `error-feedback` - Clear error messages near problem
- `cursor-pointer` - Add cursor-pointer to clickable elements (Web)
- `gesture-conflicts` - Avoid horizontal swipe on main content; prefer vertical scroll
- `tap-delay` - Use touch-action: manipulation to reduce 300ms delay (Web)
- `press-feedback` - Visual feedback on press (ripple/highlight)
- `safe-area-awareness` - Keep primary touch targets away from notch, Dynamic Island, gesture bar

### 3. Performance (HIGH)

- `image-optimization` - Use WebP/AVIF, responsive images (srcset/sizes), lazy load non-critical assets
- `image-dimension` - Declare width/height or use aspect-ratio to prevent layout shift (CLS)
- `font-loading` - Use font-display: swap/optional to avoid invisible text (FOIT)
- `critical-css` - Prioritize above-the-fold CSS
- `lazy-loading` - Lazy load non-hero components via dynamic import / route-level splitting
- `bundle-splitting` - Split code by route/feature to reduce initial load and TTI
- `virtualize-lists` - Virtualize lists with 50+ items
- `main-thread-budget` - Keep per-frame work under ~16ms for 60fps
- `debounce-throttle` - Use debounce/throttle for high-frequency events (scroll, resize, input)

### 4. Style Selection (HIGH)

- `style-match` - Match style to product type (use `--design-system` for recommendations)
- `consistency` - Use same style across all pages
- `no-emoji-icons` - Use SVG icons (Heroicons, Lucide), not emojis
- `color-palette-from-product` - Choose palette from product/industry (search `--domain color`)
- `effects-match-style` - Shadows, blur, radius aligned with chosen style
- `platform-adaptive` - Respect platform idioms (iOS HIG vs Material)
- `dark-mode-pairing` - Design light/dark variants together
- `icon-style-consistent` - Use one icon set/visual language across the product
- `primary-action` - Each screen should have only one primary CTA

### 5. Layout & Responsive (HIGH)

- `viewport-meta` - width=device-width initial-scale=1 (never disable zoom)
- `mobile-first` - Design mobile-first, then scale up to tablet and desktop
- `breakpoint-consistency` - Use systematic breakpoints (e.g. 375 / 768 / 1024 / 1440)
- `readable-font-size` - Minimum 16px body text on mobile
- `horizontal-scroll` - No horizontal scroll on mobile
- `spacing-scale` - Use 4pt/8dp incremental spacing system
- `container-width` - Consistent max-width on desktop (max-w-6xl / 7xl)
- `z-index-management` - Define layered z-index scale
- `fixed-element-offset` - Fixed navbar/bottom bar must reserve safe padding
- `viewport-units` - Prefer min-h-dvh over 100vh on mobile

### 6. Typography & Color (MEDIUM)

- `line-height` - Use 1.5-1.75 for body text
- `line-length` - Limit to 65-75 characters per line
- `font-pairing` - Match heading/body font personalities
- `font-scale` - Consistent type scale (e.g. 12 14 16 18 24 32)
- `contrast-readability` - Darker text on light backgrounds
- `weight-hierarchy` - Bold headings (600–700), Regular body (400), Medium labels (500)
- `color-semantic` - Define semantic color tokens (primary, secondary, error, surface, on-surface)
- `color-dark-mode` - Dark mode uses desaturated / lighter tonal variants, not inverted colors
- `color-accessible-pairs` - Foreground/background pairs must meet 4.5:1 (AA) or 7:1 (AAA)

### 7. Animation (MEDIUM)

- `duration-timing` - Use 150–300ms for micro-interactions; complex transitions ≤400ms
- `transform-performance` - Use transform/opacity only; avoid animating width/height/top/left
- `loading-states` - Show skeleton or progress indicator when loading exceeds 300ms
- `easing` - Use ease-out for entering, ease-in for exiting
- `motion-meaning` - Every animation must express a cause-effect relationship
- `spring-physics` - Prefer spring/physics-based curves for natural feel
- `exit-faster-than-enter` - Exit animations shorter than enter (~60–70% of enter duration)
- `interruptible` - Animations must be interruptible by user tap/gesture

### 8. Forms & Feedback (MEDIUM)

- `input-labels` - Visible label per input (not placeholder-only)
- `error-placement` - Show error below the related field
- `submit-feedback` - Loading then success/error state on submit
- `required-indicators` - Mark required fields
- `empty-states` - Helpful message and action when no content
- `toast-dismiss` - Auto-dismiss toasts in 3-5s
- `confirmation-dialogs` - Confirm before destructive actions
- `inline-validation` - Validate on blur (not keystroke)
- `progressive-disclosure` - Reveal complex options progressively

### 9. Navigation Patterns (HIGH)

- `bottom-nav-limit` - Bottom navigation max 5 items; use labels with icons
- `drawer-usage` - Use drawer/sidebar for secondary navigation, not primary actions
- `back-behavior` - Back navigation must be predictable and consistent
- `deep-linking` - All key screens must be reachable via deep link / URL
- `nav-state-active` - Current location must be visually highlighted
- `modal-escape` - Modals and sheets must offer a clear close/dismiss affordance
- `state-preservation` - Navigating back must restore previous scroll position and filter state

### 10. Charts & Data (LOW)

- `chart-type` - Match chart type to data type (trend → line, comparison → bar, proportion → pie/donut)
- `color-guidance` - Use accessible color palettes; avoid red/green only pairs
- `legend-visible` - Always show legend; position near the chart
- `tooltip-on-interact` - Provide tooltips/data labels on hover (Web) or tap (mobile)
- `axis-labels` - Label axes with units and readable scale
- `responsive-chart` - Charts must reflow or simplify on small screens
- `empty-data-state` - Show meaningful empty state when no data exists

---

# Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## How to Use This Skill

Use this skill when the user requests any of the following:

| Scenario | Trigger Examples | Start From |
|----------|-----------------|------------|
| **New project / page** | "Build a landing page", "Build a dashboard" | Step 1 → Step 2 (design system) |
| **New component** | "Create a pricing card", "Add a modal" | Step 3 (domain search: style, ux) |
| **Choose style / color / font** | "What style fits a fintech app?", "Recommend color palette" | Step 2 (design system) |
| **Review existing UI** | "Review this page for UX issues", "Check accessibility" | Quick Reference checklist above |
| **Fix a UI bug** | "Button hover is broken", "Layout shifts on load" | Quick Reference → relevant section |
| **Improve / optimize** | "Make this faster", "Improve mobile experience" | Step 3 (domain search: ux) |
| **Implement dark mode** | "Add dark mode support" | Step 3 (domain: style "dark mode") |
| **Add charts / data viz** | "Add an analytics dashboard chart" | Step 3 (domain: chart) |
| **Stack best practices** | "React performance tips", "SwiftUI navigation" | Step 4 (stack search) |

Follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: SaaS, e-commerce, portfolio, dashboard, landing page, etc.
- **Target audience**: consumer, enterprise, developer, etc.
- **Style keywords**: minimal, dark, vibrant, corporate, playful, etc.
- **Stack**: HTML/Tailwind, React, Next.js, Vue, etc.

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations with reasoning:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

This command:
1. Searches domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules from `ui-reasoning.csv` to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

**Example:**
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "supply chain logistics B2B" --design-system -p "SCC West"
```

### Step 2b: Persist Design System (Master + Overrides Pattern)

To save the design system for **hierarchical retrieval across sessions**, add `--persist`:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

This creates:
- `design-system/MASTER.md` — Global Source of Truth with all design rules
- `design-system/pages/` — Folder for page-specific overrides

**With page-specific override:**
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

### Step 3: Supplement with Detailed Searches (as needed)

After getting the design system, use domain searches to get additional details:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**When to use detailed searches:**

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `--domain product "B2B supply chain"` |
| More style options | `style` | `--domain style "minimalism corporate"` |
| Color palettes | `color` | `--domain color "logistics professional"` |
| Font pairings | `typography` | `--domain typography "professional modern"` |
| Chart recommendations | `chart` | `--domain chart "real-time dashboard"` |
| UX best practices | `ux` | `--domain ux "animation accessibility"` |
| Landing structure | `landing` | `--domain landing "hero social-proof"` |
| Google Fonts | `google-fonts` | `--domain google-fonts "sans-serif professional"` |
| Stack guidelines | `react` | `--domain react "performance hooks"` |

### Step 4: Stack Guidelines

Get stack-specific best practices:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

Available stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `astro`, `swiftui`, `react-native`, `flutter`, `nuxtjs`, `nuxt-ui`, `shadcn`, `jetpack-compose`, `threejs`, `angular`, `laravel`

---

## Search Reference

### Available Domains

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `product` | Product type recommendations | SaaS, e-commerce, portfolio, healthcare, logistics, B2B |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional, modern |
| `color` | Color palettes by product type | saas, ecommerce, healthcare, beauty, fintech, logistics |
| `landing` | Page structure, CTA strategies | hero, testimonial, pricing, social-proof |
| `chart` | Chart types, library recommendations | trend, comparison, timeline, funnel, pie |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index, loading |
| `react` | React/Next.js performance | waterfall, bundle, suspense, memo, rerender |
| `google-fonts` | Google Fonts lookup | sans-serif, serif, display, monospace |
| `icons` | Icon recommendations | navigation, settings, action, status |

---

## Pre-Delivery Checklist

Before delivering UI code, verify these items:

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons come from a consistent icon family and style
- [ ] Official brand assets are used with correct proportions and clear space
- [ ] Semantic theme tokens are used consistently (no ad-hoc hardcoded colors)

### Interaction
- [ ] All tappable elements provide clear pressed feedback
- [ ] Touch targets meet minimum size (≥44×44pt)
- [ ] Micro-interaction timing stays in the 150-300ms range
- [ ] Disabled states are visually clear and non-interactive
- [ ] Screen reader labels are descriptive

### Layout
- [ ] Safe areas are respected for headers, tab bars, and bottom CTA bars
- [ ] Scroll content is not hidden behind fixed/sticky bars
- [ ] Verified on small phone, large phone, and tablet
- [ ] Horizontal insets/gutters adapt correctly by device size
- [ ] 4/8dp spacing rhythm is maintained

### Accessibility
- [ ] All meaningful images/icons have accessibility labels
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator
- [ ] Reduced motion and dynamic text size are supported
