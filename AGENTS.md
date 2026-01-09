# AGENTS.md

> Agentic coding guide for **River Hub** (Riverhub 的个人站点).
> A premium personal portfolio site built with React + TypeScript + Vite + react-router-dom.

---

## Build & Run Commands

```bash
# Install dependencies
npm install

# Development server (port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### No Lint/Test Commands

This project currently has **no linting or testing configured**.

- No ESLint, Prettier, or Biome
- No Jest, Vitest, or Playwright
- Rely on TypeScript compiler for type checking

### Type Checking

```bash
# Manual type check (uses tsconfig.json)
npx tsc --noEmit
```

---

## Environment Configuration

Set `GEMINI_API_KEY` in `.env.local` for smart search in Nexus page:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## Project Architecture

```
/
├── App.tsx                 # Router container with page transitions
├── index.tsx               # React entry point (with BrowserRouter)
├── index.html              # HTML template (includes Tailwind CDN & global styles)
├── types.ts                # TypeScript type definitions
├── constants.tsx           # Profile, projects, skills, and tool data
├── pages/                  # Page components
│   ├── Home.tsx            # Homepage (Hero + Projects + Skills + Tools + Contact)
│   ├── Works.tsx           # Works page (Project cards with filter)
│   ├── About.tsx           # About page (Skills progress + Contact)
│   └── Nexus.tsx           # Tool hub page (Tool navigation + Smart search)
├── components/             # Shared UI components
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Page footer
│   ├── Background.tsx      # Canvas particle animation
│   ├── ToolCard.tsx        # Tool card component
│   └── EmptyState.tsx      # No results state
├── components/home/        # Homepage-specific components
│   ├── HeroSection.tsx     # Large name + identity tags
│   ├── ProjectShowcase.tsx # 3D tilt project cards
│   ├── SkillGrid.tsx       # 2x2 skill grid
│   ├── ToolPreview.tsx     # Tool hub preview with floating icons
│   └── ContactSection.tsx  # Contact information
├── services/
│   └── geminiService.ts    # Gemini AI API integration
└── vite.config.ts          # Vite configuration
```

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero + Projects + Skills + Tool Preview + Contact |
| `/works` | Works | Project portfolio with filter (全部/已上线/开发中) |
| `/nexus` | Nexus | Tool navigation hub with smart search |
| `/about` | About | Skills with progress bars + Contact info |

### Path Aliases

```typescript
// Use @/* to reference project root
import { Tool } from '@/types';
import { TOOLS } from '@/constants.tsx';
```

---

## Code Style Guidelines

### Imports

Order imports in this sequence:

1. React and React hooks
2. Third-party libraries (framer-motion, etc.)
3. Local components (from `./components/`)
4. Local types, constants, services (from `./*.ts` or `./services/`)

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolCard } from './components/ToolCard';
import { Tool, ToolCategory } from './types';
import { performSmartSearch } from './services/geminiService';
```

### Component Patterns

**Functional components with React.FC**:

```typescript
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};
```

**Named exports only** - no default exports except `App.tsx`.

### TypeScript

- **Target**: ES2022
- **Module**: ESNext with bundler resolution
- **Strict mode**: Not enabled (implicit any allowed)
- **No emit**: Types only, Vite handles compilation

**Type patterns used**:

```typescript
// Enums for categories
export enum ToolCategory {
  DEVELOPMENT = '开发',
  CREATIVE = '创意',
}

// Interfaces for data structures
export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
}

// Union types for state
const [category, setCategory] = useState<ToolCategory | '全部'>('全部');
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ToolCard`, `HeroSection` |
| Files (components) | PascalCase.tsx | `ToolCard.tsx` |
| Files (services) | camelCase.ts | `geminiService.ts` |
| Functions | camelCase | `handleFilter`, `performSmartSearch` |
| Constants | UPPER_SNAKE_CASE | `TOOLS`, `CATEGORIES` |
| Interfaces | PascalCase | `Tool`, `ChatMessage` |
| Enums | PascalCase | `ToolCategory` |

### Styling

**Tailwind CSS via CDN** (loaded in `index.html`, not npm package).

- Use utility classes directly in JSX
- Custom styles defined in `<style>` block in `index.html`
- Custom CSS classes: `.glass`, `.hover-glow`, `.text-gradient`, `.aurora`

```tsx
<div className="glass p-8 rounded-[2.5rem] hover-glow">
  <h3 className="text-2xl font-bold tracking-tighter text-gradient">
```

### Animations

**Framer Motion** for all animations:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.8 }}
>
```

Custom CSS animations defined in `index.html`:

- `animate-float` - floating effect
- `animate-scan` - scanning line
- `animate-pulse-ring` - expanding rings
- `animate-shimmer` - shine sweep effect

### Error Handling

Use try-catch with user-friendly fallback messages:

```typescript
try {
  const response = await getAssistantResponse(messages, input);
  // handle success
} catch (err) {
  setMessages(prev => [...prev, {
    role: 'assistant',
    content: '流域连接中断，River Core 正在重连。',
    timestamp: Date.now()
  }]);
}
```

### Comments

- Comments in **Chinese** are acceptable and common in this codebase
- Use `//` for inline comments
- JSX comments: `{/* 注释内容 */}`

```tsx
{/* 内部加强光晕装饰 */}
<div className="absolute -right-8 -top-8 ..."></div>
```

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.3 | UI framework |
| react-dom | ^19.2.3 | React DOM renderer |
| framer-motion | ^11.11.11 | Animations |
| @google/genai | ^1.34.0 | Gemini AI SDK |
| vite | ^6.2.0 | Build tool |
| typescript | ~5.8.2 | Type checking |

---

## AI Integration Notes

The Gemini service (`services/geminiService.ts`) provides:

1. **Smart Search** (`performSmartSearch`): Semantic tool matching using Gemini
2. **Chat Assistant** (`getAssistantResponse`): River Core conversational AI

API key accessed via `process.env.API_KEY` (injected by Vite).

---

## Common Patterns

### State Management

Local React state with `useState` + `useCallback` + `useMemo`:

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [isSearching, setIsSearching] = useState(false);

const filteredTools = useMemo(() => {
  // compute derived state
}, [dependency]);
```

### Refs

Use `useRef` with proper TypeScript typing:

```typescript
const scrollRef = useRef<HTMLDivElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);
```

### Event Handlers

Prefix with `handle`:

```typescript
const handleFilter = useCallback(async () => { ... }, [deps]);
const handleSend = async (e?: React.FormEvent) => { ... };
const handleMouseMove = useCallback((e: React.MouseEvent) => { ... }, []);
```
