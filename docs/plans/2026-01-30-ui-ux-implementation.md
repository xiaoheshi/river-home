# UI/UX 全面重构实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 River Hub 从基础 Bento Grid 升级为流体渐变 + 3D 点缀的现代沉浸式体验

**Architecture:** 基于现有 React + TypeScript + Tailwind 技术栈，新增 GSAP + Lenis 实现滚动动画和平滑滚动。组件采用自底向上构建：先创建基础 UI 组件，再组合成 sections，最后重构各页面。

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion (已有), GSAP + ScrollTrigger (新增), Lenis (新增)

**Design Doc:** `docs/plans/2026-01-30-ui-ux-redesign-design.md`

---

## Phase 1: 基础设施搭建

### Task 1: 安装动画依赖

**Files:**
- Modify: `package.json`

**Step 1: 安装 GSAP 和 Lenis**

```bash
cd /Users/apple/Projects/shixiaohe/river-home/.worktrees/ui-redesign
npm install gsap @gsap/react lenis
```

**Step 2: 验证安装成功**

```bash
npm ls gsap lenis
```

Expected: 显示 gsap 和 lenis 版本号

**Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap and lenis for animations"
```

---

### Task 2: 配置平滑滚动 Provider

**Files:**
- Create: `src/components/providers/SmoothScrollProvider.tsx`
- Modify: `src/index.tsx`

**Step 1: 创建 SmoothScrollProvider**

```tsx
// src/components/providers/SmoothScrollProvider.tsx
import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // 连接 GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

**Step 2: 在 index.tsx 中使用 Provider**

修改 `src/index.tsx`，在 `BrowserRouter` 内添加 `SmoothScrollProvider`：

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SmoothScrollProvider } from './components/providers/SmoothScrollProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

**Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功无错误

**Step 4: 提交**

```bash
git add src/components/providers/SmoothScrollProvider.tsx src/index.tsx
git commit -m "feat: add smooth scroll provider with Lenis + GSAP"
```

---

### Task 3: 扩展 Tailwind 配色和动画

**Files:**
- Modify: `tailwind.config.js`
- Create: `src/styles/gradients.css`

**Step 1: 更新 tailwind.config.js**

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        // 主渐变色
        primary: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        // 背景色
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#F1F5F9',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
      },
    },
  },
  plugins: [],
}
```

**Step 2: 创建渐变 CSS 工具类**

```css
/* src/styles/gradients.css */
@layer utilities {
  .text-gradient-primary {
    @apply bg-gradient-primary bg-clip-text text-transparent;
  }

  .border-gradient-primary {
    border-image: linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4) 1;
  }

  .bg-glass {
    @apply bg-white/70 backdrop-blur-md border border-white/20;
  }

  .bg-glass-dark {
    @apply bg-slate-900/70 backdrop-blur-md border border-slate-700/50;
  }
}
```

**Step 3: 在 index.css 中导入**

在 `src/index.css` 顶部添加：

```css
@import './styles/gradients.css';
```

**Step 4: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 5: 提交**

```bash
git add tailwind.config.js src/styles/gradients.css src/index.css
git commit -m "feat: extend Tailwind with gradient colors and animations"
```

---

## Phase 2: 基础 UI 组件

### Task 4: 创建 GradientBlob 组件

**Files:**
- Create: `src/components/ui/GradientBlob.tsx`

**Step 1: 创建组件**

```tsx
// src/components/ui/GradientBlob.tsx
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface GradientBlobProps {
  className?: string;
  color?: "purple" | "blue" | "cyan" | "mixed";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: "sm" | "md" | "lg";
}

const colorMap = {
  purple: "bg-primary-purple",
  blue: "bg-primary-blue",
  cyan: "bg-primary-cyan",
  mixed: "bg-gradient-primary",
};

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[500px] h-[500px]",
};

const blurMap = {
  sm: "blur-2xl",
  md: "blur-3xl",
  lg: "blur-[100px]",
};

export function GradientBlob({
  className,
  color = "mixed",
  size = "lg",
  blur = "lg",
}: GradientBlobProps) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full opacity-30 pointer-events-none",
        colorMap[color],
        sizeMap[size],
        blurMap[blur],
        className
      )}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/ui/GradientBlob.tsx
git commit -m "feat: add GradientBlob component for fluid background effects"
```

---

### Task 5: 创建 GlassCard 组件

**Files:**
- Create: `src/components/ui/GlassCard.tsx`

**Step 1: 创建组件**

```tsx
// src/components/ui/GlassCard.tsx
import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "purple" | "blue" | "cyan" | "none";
}

const glowColorMap = {
  purple: "hover:shadow-primary-purple/20",
  blue: "hover:shadow-primary-blue/20",
  cyan: "hover:shadow-primary-cyan/20",
  none: "",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = true, glowColor = "purple", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl bg-white/80 backdrop-blur-sm",
          "border border-slate-200/50",
          "shadow-sm",
          hoverEffect && [
            "transition-all duration-300",
            "hover:shadow-xl hover:-translate-y-1",
            glowColorMap[glowColor],
          ],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/ui/GlassCard.tsx
git commit -m "feat: add GlassCard component with glass morphism effect"
```

---

### Task 6: 创建 TiltCard 组件

**Files:**
- Create: `src/hooks/useTiltEffect.ts`
- Create: `src/components/ui/TiltCard.tsx`

**Step 1: 创建 useTiltEffect hook**

```ts
// src/hooks/useTiltEffect.ts
import { useState, useCallback, MouseEvent } from "react";

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseTiltEffectOptions {
  max?: number;
  scale?: number;
  speed?: number;
}

export function useTiltEffect(options: UseTiltEffectOptions = {}) {
  const { max = 15, scale = 1.02, speed = 400 } = options;

  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      setTilt({ rotateX, rotateY, scale });
    },
    [max, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: `transform ${speed}ms ease-out`,
  };

  return {
    tilt,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
```

**Step 2: 创建 TiltCard 组件**

```tsx
// src/components/ui/TiltCard.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useTiltEffect } from "../../hooks/useTiltEffect";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltMax = 10,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const { style, handlers, tilt } = useTiltEffect({ max: tiltMax, scale });

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white border border-slate-200/50",
        "shadow-lg",
        className
      )}
      style={style}
      {...handlers}
    >
      {children}

      {/* Glare effect */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${50 + tilt.rotateY * 2}% ${50 - tilt.rotateX * 2}%,
              rgba(255,255,255,0.3) 0%,
              transparent 60%
            )`,
          }}
        />
      )}
    </motion.div>
  );
}
```

**Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 4: 提交**

```bash
git add src/hooks/useTiltEffect.ts src/components/ui/TiltCard.tsx
git commit -m "feat: add TiltCard component with 3D tilt effect"
```

---

### Task 7: 创建 AnimatedText 组件

**Files:**
- Create: `src/components/ui/AnimatedText.tsx`

**Step 1: 创建组件**

```tsx
// src/components/ui/AnimatedText.tsx
import { motion, Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  animation?: "fadeUp" | "fadeIn" | "typewriter";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  typewriter: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
  },
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerChildren = 0.03,
  animation = "fadeUp",
  as: Tag = "p",
}: AnimatedTextProps) {
  const letters = text.split("");

  return (
    <motion.div
      className={cn("inline-block", className)}
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants[animation]}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/ui/AnimatedText.tsx
git commit -m "feat: add AnimatedText component for text entrance animations"
```

---

### Task 8: 创建 ProgressBar 组件

**Files:**
- Create: `src/components/ui/ProgressBar.tsx`

**Step 1: 创建组件**

```tsx
// src/components/ui/ProgressBar.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../utils/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  color?: "purple" | "blue" | "cyan" | "gradient";
  className?: string;
}

const colorMap = {
  purple: "bg-primary-purple",
  blue: "bg-primary-blue",
  cyan: "bg-primary-cyan",
  gradient: "bg-gradient-primary",
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  color = "gradient",
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 1000;
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        setDisplayValue(Math.round(value * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showValue && <span className="text-slate-500">{displayValue}%</span>}
        </div>
      )}

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", colorMap[color])}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/ui/ProgressBar.tsx
git commit -m "feat: add ProgressBar component with scroll-triggered animation"
```

---

### Task 9: 创建 MagneticButton 组件

**Files:**
- Create: `src/components/ui/MagneticButton.tsx`

**Step 1: 创建组件**

```tsx
// src/components/ui/MagneticButton.tsx
import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

const variantStyles = {
  primary: "bg-gradient-primary text-white shadow-lg hover:shadow-xl",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

export function MagneticButton({
  children,
  className,
  strength = 30,
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = ((e.clientX - centerX) / rect.width) * strength;
    const y = ((e.clientY - centerY) / rect.height) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium",
        "transition-colors duration-200",
        variantStyles[variant],
        className
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/ui/MagneticButton.tsx
git commit -m "feat: add MagneticButton component with magnetic hover effect"
```

---

### Task 10: 创建 ScrollReveal 组件

**Files:**
- Create: `src/components/ui/ScrollReveal.tsx`

**Step 1: 创建组件**

```tsx
// src/components/ui/ScrollReveal.tsx
import { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "fade";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function ScrollReveal({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={animations[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/ui/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal component for scroll-triggered animations"
```

---

## Phase 3: 首页重构

### Task 11: 创建 Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Step 1: 创建组件**

```tsx
// src/components/sections/Hero.tsx
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { GradientBlob } from "../ui/GradientBlob";
import { MagneticButton } from "../ui/MagneticButton";
import { AnimatedText } from "../ui/AnimatedText";
import { Badge } from "../ui/Badge";
import { PROFILE } from "../../constants";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Blobs */}
      <GradientBlob
        color="purple"
        size="xl"
        className="top-0 -left-40"
      />
      <GradientBlob
        color="cyan"
        size="lg"
        className="bottom-20 -right-20"
      />
      <GradientBlob
        color="blue"
        size="md"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for hire
          </Badge>
        </motion.div>

        {/* Main Slogan */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
          <AnimatedText
            text="用技术实现设计，"
            delay={0.3}
            className="block"
          />
          <AnimatedText
            text="用 AI 放大创造力"
            delay={0.6}
            className="block text-gradient-primary"
          />
        </h1>

        {/* Sub tagline */}
        <motion.p
          className="text-lg sm:text-xl text-slate-500 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {PROFILE.tagline}
        </motion.p>

        {/* Identity Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          {PROFILE.identities.slice(0, 3).map((identity, index) => (
            <motion.div
              key={identity.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm bg-white/50 backdrop-blur-sm"
              >
                <span className="mr-2">{identity.icon}</span>
                {identity.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <MagneticButton variant="primary" href="/works">
            查看作品 <ArrowRight className="ml-2 h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="secondary" href={PROFILE.contact.github}>
            <Github className="mr-2 h-4 w-4" /> GitHub
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with animated slogan and gradient blobs"
```

---

### Task 12: 创建 FeaturedWorks Section

**Files:**
- Create: `src/components/sections/FeaturedWorks.tsx`

**Step 1: 创建组件**

```tsx
// src/components/sections/FeaturedWorks.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Layers } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";
import { PROJECTS } from "../../constants";
import { getProjectImage } from "../../utils/imageMap";

export function FeaturedWorks() {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <section className="py-20">
      <ScrollReveal>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span className="text-primary-purple">✦</span> Featured Works
            </h2>
            <p className="text-slate-500 mt-2">精选项目作品</p>
          </div>
          <Link
            to="/works"
            className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            查看全部
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            delay={index * 0.15}
            animation="fadeUp"
          >
            <TiltCard className="group h-full">
              {/* Project Image */}
              <div
                className="w-full h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${getProjectImage(project.id)})` }}
              />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-4 w-4 text-primary-blue" />
                  <Badge
                    variant={project.status === "live" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {project.status === "live" ? "已上线" : "开发中"}
                  </Badge>
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {project.name}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <Link
                  to="/works"
                  className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors"
                >
                  查看详情 →
                </Link>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/sections/FeaturedWorks.tsx
git commit -m "feat: add FeaturedWorks section with TiltCard effect"
```

---

### Task 13: 创建 SkillMatrix Section

**Files:**
- Create: `src/components/sections/SkillMatrix.tsx`

**Step 1: 创建组件**

```tsx
// src/components/sections/SkillMatrix.tsx
import { GlassCard } from "../ui/GlassCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SKILLS } from "../../constants";

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  "产品设计": { bg: "from-purple-500/10 to-purple-500/5", text: "text-primary-purple", glow: "purple" as const },
  "前端开发": { bg: "from-blue-500/10 to-blue-500/5", text: "text-primary-blue", glow: "blue" as const },
  "后端开发": { bg: "from-cyan-500/10 to-cyan-500/5", text: "text-primary-cyan", glow: "cyan" as const },
  "AI 应用": { bg: "from-emerald-500/10 to-emerald-500/5", text: "text-emerald-500", glow: "cyan" as const },
};

export function SkillMatrix() {
  return (
    <section className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-primary-blue">✦</span> What I Do
        </h2>
        <p className="text-slate-500 mb-10">技术栈与能力矩阵</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, index) => {
          const colors = colorMap[skill.name] || colorMap["产品设计"];

          return (
            <ScrollReveal
              key={skill.name}
              delay={index * 0.1}
              animation="fadeUp"
            >
              <GlassCard
                className="p-6 h-full"
                glowColor={colors.glow as "purple" | "blue" | "cyan"}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl mb-4`}>
                  {skill.icon}
                </div>

                {/* Title */}
                <h3 className={`text-lg font-display font-bold mb-2 ${colors.text}`}>
                  {skill.name}
                </h3>

                {/* Skills List */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                  {skill.items.length > 4 && (
                    <span className="text-xs px-2 py-1 text-slate-400">
                      +{skill.items.length - 4}
                    </span>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/sections/SkillMatrix.tsx
git commit -m "feat: add SkillMatrix section with glass cards"
```

---

### Task 14: 创建 ContactCTA Section

**Files:**
- Create: `src/components/sections/ContactCTA.tsx`

**Step 1: 创建组件**

```tsx
// src/components/sections/ContactCTA.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { GradientBlob } from "../ui/GradientBlob";
import { ScrollReveal } from "../ui/ScrollReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { TOOLS, PROFILE } from "../../constants";

export function ContactCTA() {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nexus Preview */}
        <ScrollReveal animation="fadeRight">
          <GlassCard className="relative p-8 h-full overflow-hidden" glowColor="purple">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-50">
              <GradientBlob color="purple" size="md" className="top-0 right-0" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary-purple" />
                <h3 className="text-xl font-display font-bold text-slate-900">
                  Nexus · 工具港
                </h3>
              </div>

              <p className="text-slate-500 mb-6">
                已收录 {TOOLS.length}+ 精选工具，涵盖 AI、开发、设计、效率等领域
              </p>

              {/* Tool icons preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {TOOLS.slice(0, 6).map((tool) => (
                  <motion.div
                    key={tool.id}
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {tool.icon}
                  </motion.div>
                ))}
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                  +{TOOLS.length - 6}
                </div>
              </div>

              <Link
                to="/nexus"
                className="inline-flex items-center gap-2 text-primary-purple font-medium hover:gap-3 transition-all"
              >
                探索工具 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal animation="fadeLeft">
          <GlassCard className="relative p-8 h-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800" glowColor="cyan">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
              <GradientBlob color="cyan" size="md" className="bottom-0 left-0" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-primary-cyan" />
                <h3 className="text-xl font-display font-bold text-white">
                  Let's Connect
                </h3>
              </div>

              <p className="text-slate-300 mb-6">
                开放远程合作机会，无论是项目合作还是技术交流，都欢迎联系
              </p>

              <div className="flex items-center gap-2 text-slate-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm">Currently available</span>
              </div>

              <MagneticButton
                variant="secondary"
                href={`mailto:${PROFILE.contact.email}`}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                联系我 <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/sections/ContactCTA.tsx
git commit -m "feat: add ContactCTA section with Nexus preview and contact card"
```

---

### Task 15: 重构首页 Home.tsx

**Files:**
- Modify: `src/pages/Home.tsx`

**Step 1: 重写 Home.tsx**

```tsx
// src/pages/Home.tsx
import { Hero } from "../components/sections/Hero";
import { FeaturedWorks } from "../components/sections/FeaturedWorks";
import { SkillMatrix } from "../components/sections/SkillMatrix";
import { ContactCTA } from "../components/sections/ContactCTA";

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <FeaturedWorks />
      <SkillMatrix />
      <ContactCTA />
    </div>
  );
}
```

**Step 2: 更新 RootLayout 移除首页的 padding-top**

修改 `src/layouts/RootLayout.tsx`：

```tsx
// src/layouts/RootLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-surface text-slate-900 font-sans selection:bg-primary-blue/20 flex flex-col">
      <Navbar />
      <main className={`flex-grow ${isHome ? 'pt-0' : 'pt-24'} pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

**Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 4: 提交**

```bash
git add src/pages/Home.tsx src/layouts/RootLayout.tsx
git commit -m "feat: rebuild Home page with new Hero and sections"
```

---

## Phase 4: 其他页面重构

### Task 16: 重构 Works 页面

**Files:**
- Modify: `src/pages/Works.tsx`

**Step 1: 重写 Works.tsx**

```tsx
// src/pages/Works.tsx
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Globe, Code, ArrowUpRight } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { Badge } from "../components/ui/Badge";
import { GradientBlob } from "../components/ui/GradientBlob";
import { PROJECTS } from "../constants";
import { getProjectImage } from "../utils/imageMap";

type FilterType = "全部" | "已上线" | "开发中";

const filters: FilterType[] = ["全部", "已上线", "开发中"];

export default function Works() {
  const [filter, setFilter] = useState<FilterType>("全部");

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === "全部") return true;
    if (filter === "已上线") return project.status === "live";
    if (filter === "开发中") return project.status === "development";
    return true;
  });

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob color="purple" size="xl" className="top-20 -left-40 opacity-20" />
        <GradientBlob color="cyan" size="lg" className="bottom-40 -right-20 opacity-20" />
      </div>

      <div className="space-y-10 animate-in fade-in duration-500">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Works
            </h1>
            <p className="text-lg text-slate-500">
              探索我的项目作品集，从产品设计到全栈开发
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2">
            {filters.map((item) => (
              <motion.button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === item
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TiltCard className="group h-full">
                    {/* Image */}
                    <div
                      className="w-full h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${getProjectImage(project.id)})` }}
                    >
                      {/* Status Badge */}
                      <div className="p-4">
                        <Badge
                          variant={project.status === "live" ? "default" : "secondary"}
                          className="backdrop-blur-sm"
                        >
                          {project.status === "live" ? (
                            <>
                              <Globe className="h-3 w-3 mr-1" /> 已上线
                            </>
                          ) : (
                            <>
                              <Code className="h-3 w-3 mr-1" /> 开发中
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <span>{project.icon}</span>
                        {project.name}
                      </h3>

                      <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Roles */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.roles.map((role) => (
                          <span
                            key={role}
                            className="text-xs px-2 py-1 bg-primary-purple/10 text-primary-purple rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Link */}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <ArrowUpRight className="h-5 w-5 text-slate-900" />
                      </a>
                    )}
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/pages/Works.tsx
git commit -m "feat: rebuild Works page with TiltCard and filter animations"
```

---

### Task 17: 重构 Nexus 页面

**Files:**
- Modify: `src/pages/Nexus.tsx`

**Step 1: 重写 Nexus.tsx**

```tsx
// src/pages/Nexus.tsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Sparkles, AlertCircle, ExternalLink } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { GradientBlob } from "../components/ui/GradientBlob";
import { Badge } from "../components/ui/Badge";
import { TOOLS, CATEGORIES } from "../constants";
import { performSmartSearch } from "../services/geminiService";
import { Tool, ToolCategory } from "../types";
import { cn } from "../utils/cn";

type FilterType = "全部" | ToolCategory;

export default function Nexus() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("全部");
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<Tool[] | null>(null);
  const [error, setError] = useState("");

  // Debounced AI search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        setError("");
        try {
          const ids = await performSmartSearch(query);
          const matchingTools = TOOLS.filter((t) => ids.includes(t.id));
          setAiResults(matchingTools);
        } catch (err) {
          console.error(err);
          setError("AI 搜索连接失败，已切换到本地搜索");
          setAiResults(null);
        } finally {
          setIsSearching(false);
        }
      } else {
        setAiResults(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter tools
  const filteredTools = useMemo(() => {
    let tools = aiResults || TOOLS;

    if (!aiResults && query) {
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter !== "全部") {
      tools = tools.filter((t) => t.category === filter);
    }

    return tools;
  }, [query, aiResults, filter]);

  const categoryLabels: Record<string, string> = {
    "全部": "全部",
    [ToolCategory.AI]: "AI",
    [ToolCategory.DEVELOPMENT]: "开发",
    [ToolCategory.CREATIVE]: "创意",
    [ToolCategory.PRODUCTIVITY]: "效率",
    [ToolCategory.UTILITIES]: "工具",
    [ToolCategory.PERSONAL]: "个人",
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob color="purple" size="xl" className="top-0 left-1/4 opacity-20" />
        <GradientBlob color="cyan" size="lg" className="bottom-20 right-1/4 opacity-20" />
      </div>

      <div className="space-y-10 animate-in fade-in duration-500">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-primary-purple" />
              Nexus · 工具港
            </h1>
            <p className="text-lg text-slate-500">
              AI 驱动的智能搜索，发现最适合你的工具
            </p>
          </div>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索工具，试试「前端开发」或「AI 绘图」..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 rounded-2xl",
                  "bg-white/80 backdrop-blur-sm",
                  "border-2 border-slate-200/50",
                  "focus:outline-none focus:border-primary-purple/50 focus:ring-4 focus:ring-primary-purple/10",
                  "shadow-lg shadow-slate-200/50",
                  "transition-all duration-300",
                  "text-slate-900 placeholder:text-slate-400"
                )}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-primary-purple border-t-transparent rounded-full" />
                </div>
              )}
            </div>
            {error && (
              <div className="mt-2 text-sm text-amber-600 flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.15}>
          <div className="flex justify-center gap-2 flex-wrap">
            {["全部", ...CATEGORIES].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category as FilterType)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filter === category
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white/80 text-slate-600 hover:bg-white border border-slate-200/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {categoryLabels[category] || category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tools Grid */}
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <a href={tool.url} target="_blank" rel="noreferrer">
                    <GlassCard
                      className="p-5 h-full group cursor-pointer"
                      glowColor="blue"
                    >
                      {/* Icon & Category */}
                      <div className="flex items-start justify-between mb-3">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {tool.icon}
                        </motion.div>
                        <Badge variant="secondary" className="text-xs">
                          {categoryLabels[tool.category] || tool.category}
                        </Badge>
                      </div>

                      {/* Name */}
                      <h3 className="font-display font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {tool.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                        {tool.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
              没有找到匹配的工具
            </h3>
            <p className="text-slate-500">试试其他关键词或筛选条件</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/pages/Nexus.tsx
git commit -m "feat: rebuild Nexus page with glass cards and enhanced search UX"
```

---

### Task 18: 重构 About 页面

**Files:**
- Modify: `src/pages/About.tsx`

**Step 1: 重写 About.tsx**

```tsx
// src/pages/About.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, MapPin, MessageCircle, X } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientBlob } from "../components/ui/GradientBlob";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { ProgressBar } from "../components/ui/ProgressBar";
import { MagneticButton } from "../components/ui/MagneticButton";
import { AnimatedText } from "../components/ui/AnimatedText";
import { PROFILE, SKILLS } from "../constants";

export default function About() {
  const [showWechat, setShowWechat] = useState(false);

  const skillColors: Record<string, "purple" | "blue" | "cyan" | "gradient"> = {
    "产品设计": "purple",
    "前端开发": "blue",
    "后端开发": "cyan",
    "AI 应用": "gradient",
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob color="purple" size="xl" className="top-20 -right-40 opacity-20" />
        <GradientBlob color="blue" size="lg" className="bottom-40 -left-20 opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-6">
            {/* Avatar */}
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-primary p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-gradient-primary">
                    {PROFILE.englishName.charAt(0)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-2">
                {PROFILE.name}
              </h1>
              <p className="text-lg text-slate-500 flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                {PROFILE.location}
              </p>
            </div>

            {/* Slogan */}
            <div className="text-2xl md:text-3xl font-display font-bold">
              <AnimatedText
                text="用技术实现设计，用 AI 放大创造力"
                className="text-gradient-primary"
                delay={0.3}
              />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <MagneticButton
                variant="secondary"
                href={PROFILE.contact.github}
                className="px-4 py-2"
              >
                <Github className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href={`mailto:${PROFILE.contact.email}`}
                className="px-4 py-2"
              >
                <Mail className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => setShowWechat(true)}
                className="px-4 py-2"
              >
                <MessageCircle className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-primary-purple">✦</span> About Me
            </h2>
            <div className="space-y-4">
              {PROFILE.bio.map((paragraph, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal>
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span className="text-primary-blue">✦</span> Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 0.1}>
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-display font-bold text-slate-900">
                        {skill.name}
                      </h3>
                    </div>

                    <ProgressBar
                      value={skill.level}
                      color={skillColors[skill.name] || "gradient"}
                      className="mb-4"
                    />

                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal>
          <GlassCard className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              无论是项目合作、技术交流还是简单的问候，都欢迎随时联系我
            </p>
            <MagneticButton
              variant="secondary"
              href={`mailto:${PROFILE.contact.email}`}
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              Say Hello <Mail className="ml-2 h-4 w-4" />
            </MagneticButton>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* WeChat Modal */}
      <AnimatePresence>
        {showWechat && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWechat(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowWechat(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
              <MessageCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                微信联系
              </h3>
              <p className="text-slate-500 mb-4">扫描二维码添加微信</p>
              <div className="w-48 h-48 mx-auto bg-slate-100 rounded-lg flex items-center justify-center">
                <img
                  src="/wechat-qr.jpg"
                  alt="WeChat QR Code"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-slate-400 text-sm">QR Code</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                微信号: {PROFILE.contact.wechat}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/pages/About.tsx
git commit -m "feat: rebuild About page with progress bars and contact modal"
```

---

## Phase 5: 导航和布局优化

### Task 19: 更新 Navbar 组件

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: 重写 Navbar.tsx**

```tsx
// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Works", path: "/works" },
  { name: "Nexus", path: "/nexus" },
  { name: "About", path: "/about" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg shadow-slate-200/50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-slate-900 rounded-full"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
```

**Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 3: 提交**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: update Navbar with animated indicator"
```

---

### Task 20: 更新 Footer 组件

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: 读取现有 Footer**

先检查现有 Footer 内容。

**Step 2: 重写 Footer.tsx**

```tsx
// src/components/Footer.tsx
import { Github, Mail, Heart } from "lucide-react";
import { PROFILE } from "../constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>© {currentYear} {PROFILE.name}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in {PROFILE.location}
            </span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

**Step 4: 提交**

```bash
git add src/components/Footer.tsx
git commit -m "feat: update Footer with minimal design"
```

---

## Phase 6: 最终验证与合并

### Task 21: 完整构建验证

**Step 1: 运行完整构建**

```bash
cd /Users/apple/Projects/shixiaohe/river-home/.worktrees/ui-redesign
npm run build
```

Expected: 构建成功，无错误

**Step 2: 启动预览服务器**

```bash
npm run preview
```

Expected: 服务器启动成功

**Step 3: 手动测试所有页面**

- [ ] 首页 Hero 动画正常
- [ ] 首页滚动动画正常
- [ ] Works 页面筛选正常
- [ ] Nexus 页面搜索正常
- [ ] About 页面进度条动画正常
- [ ] 导航栏指示器动画正常
- [ ] 平滑滚动正常

**Step 4: 合并到 main 分支**

```bash
# 确保所有更改已提交
git status

# 切换到主仓库
cd /Users/apple/Projects/shixiaohe/river-home

# 合并 feature 分支
git merge feature/ui-redesign

# 删除 worktree
git worktree remove .worktrees/ui-redesign

# 推送到远程（如需要）
git push origin main
```

---

## 文件清单

### 新增文件
- `src/components/providers/SmoothScrollProvider.tsx`
- `src/components/ui/GradientBlob.tsx`
- `src/components/ui/GlassCard.tsx`
- `src/components/ui/TiltCard.tsx`
- `src/components/ui/AnimatedText.tsx`
- `src/components/ui/ProgressBar.tsx`
- `src/components/ui/MagneticButton.tsx`
- `src/components/ui/ScrollReveal.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/FeaturedWorks.tsx`
- `src/components/sections/SkillMatrix.tsx`
- `src/components/sections/ContactCTA.tsx`
- `src/hooks/useTiltEffect.ts`
- `src/styles/gradients.css`

### 修改文件
- `package.json`
- `tailwind.config.js`
- `src/index.css`
- `src/index.tsx`
- `src/layouts/RootLayout.tsx`
- `src/pages/Home.tsx`
- `src/pages/Works.tsx`
- `src/pages/Nexus.tsx`
- `src/pages/About.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

---

*计划完成，共 21 个任务，分 6 个阶段执行。*
