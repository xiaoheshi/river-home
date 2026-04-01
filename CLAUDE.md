# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — TypeScript check (`tsc -b`) + Vite production build → `dist/`
- `npm run preview` — Preview production build locally
- `npx tsc --noEmit` — Type-check only (no build output)

No test framework is configured. No linter is configured.

## Architecture

Single-page portfolio site: React 18 + TypeScript + Tailwind CSS v4 + Framer Motion. No router — anchor-based navigation with smooth scroll.

**Section flow:** `App.tsx` renders `Navbar → Hero → About → Experience → Projects → Contact → Footer` sequentially inside `<main>`.

### Key patterns

- **All content lives in `src/data/resume.ts`** — profile info, competencies, tech stack, experiences, projects, nav links. Components import from here; no hardcoded content in JSX.
- **Path alias:** `@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
- **Dark mode:** Class-based (`.dark` on `<html>`), managed by `src/hooks/useTheme.ts` with localStorage persistence + OS preference fallback. Tailwind custom variant: `@custom-variant dark` in `index.css`.
- **Design tokens** are CSS custom properties in `src/index.css`: `--font-display` (Sora), `--font-body` (PingFang SC), `--font-mono` (JetBrains Mono), `--accent` (blue-500), `--surface`/`--surface-dark`.
- **Custom CSS classes** in `index.css`: `.section-num`, `.rule`, `.glass-card`, `.accent-border-l`, `.grain`, `.link-underline`. Know these exist before adding new utility classes.
- **Animations:** Framer Motion `useInView` with `once: true` for scroll-triggered reveals. Common pattern: `slideIn(delay)` / `scaleIn(delay)` variant factories defined locally in each section component.
- **`cn()` utility** (`src/utils/cn.ts`): Lightweight class joiner (filters falsy values). No clsx/classnames dependency.
- **No images:** All backgrounds are CSS gradients/SVG patterns. Icons from `lucide-react`.
- **Tailwind CSS v4:** Uses `@import "tailwindcss"` and `@tailwindcss/vite` plugin — no `tailwind.config.js`. Configuration is in CSS via `@custom-variant`.

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`): push to `main` triggers build → rsync `dist/` to remote server via SSH.
