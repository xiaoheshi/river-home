# UI/UX Refactor: Bento Grid & Light Mode

## TL;DR

> **Quick Summary**: Complete visual and technical overhaul of "River Home" personal site. Migrating from "Cyberpunk/Dark" to "Apple/Bento/Light" style. Replacing Tailwind CDN with local build.
> 
> **Deliverables**:
> - **Tech**: Tailwind CLI, PostCSS, Framer Motion, ESLint/Prettier.
> - **UI**: New "Light Mode" Bento Grid Home, dedicated Works/About/Nexus pages.
> - **Assets**: Unsplash image mapping for projects.
> 
> **Estimated Effort**: Large (Rewrite)
> **Parallel Execution**: YES - 3 Waves
> **Critical Path**: Base Infra → Layout/Components → Pages → Integration

---

## Context

### Original Request
"Code all restored. Refactor UI/UX for personal site." -> Confirmed "All-in Rewrite", "Apple/Bento Style", "Light Mode Only".

### Interview Summary
**Key Decisions**:
- **Style**: Bento Grid (Apple-like), Clean, Light Mode.
- **Architecture**: Hybrid (Home = Dashboard, Others = Detail Pages).
- **Tech**: Migrate Tailwind CDN to Local CLI.
- **Verification**: Manual + Agent Playwright Visual Check (No repo test files).
- **Assets**: Use Unsplash placeholders for missing project images.

### Metis Review
**Identified Gaps (addressed in plan)**:
- **Legacy CSS**: Explicitly remove `index.html` custom styles (500+ lines).
- **Missing Images**: Added `utils/imageMap.ts` task to handle missing assets in `constants.tsx`.
- **Env Vars**: Explicit instruction to preserve `vite.config.ts` define block.
- **Gemini Service**: Guardrails added to protect `geminiService.ts` during data migration.

---

## Work Objectives

### Core Objective
Transform the personal site into a professional, high-performance "Bento Grid" portfolio with a clean light-mode aesthetic.

### Concrete Deliverables
- [ ] Clean `index.html` (no inline styles/CDN)
- [ ] configured `tailwind.config.js` & `postcss.config.js`
- [ ] `src/layouts/RootLayout.tsx` (Light theme structure)
- [ ] `src/components/ui/BentoGrid.tsx` & `BentoCard.tsx`
- [ ] `src/pages/Home.tsx` (New Bento dashboard)
- [ ] `src/pages/Works.tsx`, `Nexus.tsx`, `About.tsx` (Refactored)

### Must Have
- **Light Mode Only**: White/Gray/Blur aesthetic.
- **Responsive**: Bento grid must stack on mobile.
- **Performance**: Zero render-blocking CSS (removed CDN).

### Must NOT Have (Guardrails)
- **Dark Mode**: Explicitly excluded for this version.
- **Legacy Effects**: No "aurora", "neon", or "holographic" effects.
- **Broken Search**: Gemini integration must remain functional.

---

## Verification Strategy

> **Agent-Driven Visual Verification**
> Since there are no repo-level tests, the agent will use the `playwright` skill to visually verify changes.

### Automated Verification Procedures

**1. Visual / Layout Check (Playwright)**
```typescript
// Agent executes via playwright skill:
// 1. Open http://localhost:5173
// 2. Screenshot full page to .sisyphus/evidence/home-bento.png
// 3. Verify specific elements exist (e.g., "text=Projects")
```

**2. CSS Integration Check (Bash)**
```bash
# Verify Tailwind classes are generating CSS
grep "bg-gray-50" dist/assets/*.css
# Verify no CDN links in index.html
! grep "cdn.tailwindcss.com" index.html
```

**3. Gemini Feature Check (Bash/Node)**
```bash
# Verify service is still callable
bun -e "import { performSmartSearch } from './src/services/geminiService'; console.log(typeof performSmartSearch)"
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Infrastructure & Cleanup):
├── Task 1: Clean Slate & Tooling (Tailwind CLI, ESLint)
└── Task 2: Asset Preparation (Image Mapping Utility)

Wave 2 (Components & Layout):
├── Task 3: Root Layout & Global Styles (Typography, Light Theme)
├── Task 4: Bento UI Kit (Grid, Card, Badge, Button)
└── Task 5: Navigation & Footer Components

Wave 3 (Pages & Integration):
├── Task 6: Home Page (Bento Dashboard)
├── Task 7: Works Page (Refactor)
├── Task 8: Nexus Page (Refactor + Search Verify)
└── Task 9: About Page (Refactor)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3, 4, 5 | 2 |
| 2 | None | 6, 7 | 1 |
| 3 | 1 | 6, 7, 8, 9 | 4, 5 |
| 4 | 1 | 6, 7, 8, 9 | 3, 5 |
| 5 | 1 | 3 | 3, 4 |
| 6 | 2, 3, 4, 5 | None | 7, 8, 9 |
| 7 | 2, 3, 4, 5 | None | 6, 8, 9 |
| 8 | 3, 4, 5 | None | 6, 7, 9 |
| 9 | 3, 4, 5 | None | 6, 7, 8 |

---

## TODOs

- [x] 1. Infrastructure: Clean Slate & Tailwind CLI
  **What to do**:
  - Remove `<style>` block and Tailwind CDN from `index.html`.
  - Install `tailwindcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`.
  - Init Tailwind config (`npx tailwindcss init -p`).
  - Configure `tailwind.config.js` (content paths, light mode colors, fonts).
  - Create `src/index.css` with `@tailwind` directives.
  - Setup ESLint + Prettier (basic config).
  - Update `vite.config.ts` (ensure `define` block is safe).
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`frontend-ui-ux`, `git-master`] (for clean setup)

  **Verification**:
  - `npm run dev` starts without errors.
  - Browser shows unstyled (clean) page initially.
  - `curl localhost:5173` does not show CDN links.

- [x] 2. Assets: Image Mapping Utility
  **What to do**:
  - Create `src/utils/imageMap.ts`.
  - Implement function `getProjectImage(id: string): string`.
  - Return deterministic Unsplash URLs (e.g., `source.unsplash.com/random?tech` or specific IDs) based on project ID.
  - Add specific map for known projects in `constants.tsx` to ensure visual relevance.

  **Recommended Agent Profile**:
  - **Category**: `quick`

  **Verification**:
  - `bun -e "import { getProjectImage } from './src/utils/imageMap'; console.log(getProjectImage('river-home'))"` returns valid URL.

- [x] 3. UI: Root Layout & Global Styles
  **What to do**:
  - Create `src/layouts/RootLayout.tsx`.
  - Apply global light background (`bg-gray-50` / `bg-white`).
  - Configure font families (Inter / Plus Jakarta) in `index.css`.
  - Set up `Outlet` structure for routing.
  - **Guardrail**: Ensure `App.tsx` uses this layout.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`, `playwright`]

  **Verification**:
  - Playwright screenshot: Page has white/gray background, not black.
  - Text is dark gray (`text-slate-900`), not white.

- [x] 4. UI: Bento Component Kit
  **What to do**:
  - Create `src/components/ui/BentoGrid.tsx` (CSS Grid wrapper).
  - Create `src/components/ui/BentoCard.tsx` (Framer Motion enabled).
  - Props: `title`, `icon`, `description`, `className`, `header` (for image/visual), `href`.
  - Create `Button.tsx` (Ghost/Solid variants, light mode optimized).
  - Create `Badge.tsx` (Pill shape, subtle borders).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Verification**:
  - Create temporary test page to render components.
  - Playwright screenshot: Verify rounded corners, shadows, and grid gaps.

- [x] 5. UI: Navigation & Footer
  **What to do**:
  - Create `src/components/Navbar.tsx`: Minimal, sticky/floating, glassmorphism (light).
  - Links: Home, Works, Nexus, About.
  - Create `src/components/Footer.tsx`: Simple copyright + social links.
  - Update `App.tsx` to include these in Layout.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **Verification**:
  - Playwright interact: Click nav links, verify URL changes.
  - Check sticky behavior on scroll.

- [x] 6. Page: Home (Bento Dashboard)
  **What to do**:
  - Reimplement `src/pages/Home.tsx`.
  - Use `BentoGrid` layout.
  - **Cells**:
    - [2x2] Hero (Intro + Photo).
    - [2x1] Featured Work (Dynamic from `constants`).
    - [1x1] Skills (Icons).
    - [1x1] Nexus Link (Tool count).
    - [1x1] Map/Location.
    - [1x1] Contact/Socials.
  - Use `getProjectImage` for visuals.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`, `playwright`]

  **Verification**:
  - Playwright screenshot: Full dashboard visible.
  - Responsive check: Mobile view stacks vertically.

- [x] 7. Page: Works (Portfolio)
  **What to do**:
  - Reimplement `src/pages/Works.tsx`.
  - Layout: Simple Masonry or Grid of `BentoCard`s.
  - Filter: Filter by category (Web / App / AI).
  - Use `getProjectImage` for thumbnails.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **Verification**:
  - Playwright interact: Click "App" filter -> only App projects show.

- [x] 8. Page: Nexus (Tools + Search)
  **What to do**:
  - Reimplement `src/pages/Nexus.tsx`.
  - **CRITICAL**: Preserve `performSmartSearch` integration.
  - UI: Search bar (prominent) + Categories (Chips) + Grid of Tools.
  - Visuals: Clean list or small cards.

  **Recommended Agent Profile**:
  - **Category**: `ultrabrain` (Logic preservation)
  - **Skills**: [`frontend-ui-ux`, `playwright`]

  **Verification**:
  - Playwright interact: Type "help" in search -> Wait for results -> Verify results appear.
  - Verify error state if API fails.

- [x] 9. Page: About
  **What to do**:
  - Reimplement `src/pages/About.tsx`.
  - Layout: Clean typography (Article style).
  - Sections: Bio, Experience, Tech Stack (Progress bars or Pills), Contact.

  **Recommended Agent Profile**:
  - **Category**: `writing` (Content focus) or `visual-engineering`

  **Verification**:
  - Playwright screenshot: Check typography hierarchy.

---

## Success Criteria

### Final Verification Checklist
- [ ] Site runs locally (`npm run dev`) with no errors.
- [ ] No 404s on navigation.
- [ ] Light mode is consistent (no dark backgrounds remaining).
- [ ] Gemini Search works in Nexus page.
- [ ] Mobile view is usable (no horizontal scroll).
- [ ] All "Aurora/Neon" effects are gone.
