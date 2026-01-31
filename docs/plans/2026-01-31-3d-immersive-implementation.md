# 3D 沉浸式重构实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 River Hub 网站重构为全页面 3D 沉浸式体验，采用几何抽象风格

**Architecture:** 整个站点是一个 Three.js Canvas，4 个区域分布在 3D 空间中，页面切换通过镜头飞行实现。2D 内容通过 Drei Html 组件嵌入 3D 空间。

**Tech Stack:** React + TypeScript + Vite + React Three Fiber + Drei + Framer Motion + Tailwind CSS

---

## Phase 1: 基础框架

### Task 1.1: 安装 React Three Fiber 依赖

**Files:**
- Modify: `package.json`

**Step 1: 安装 R3F 核心依赖**

Run:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
```

**Step 2: 安装 TypeScript 类型**

Run:
```bash
npm install -D @types/three
```

**Step 3: 验证安装**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add React Three Fiber dependencies"
```

---

### Task 1.2: 创建导航状态管理

**Files:**
- Create: `src/stores/navigationStore.ts`

**Step 1: 创建 Zustand store**

先安装 Zustand:
```bash
npm install zustand
```

**Step 2: 创建导航状态文件**

```typescript
// src/stores/navigationStore.ts
import { create } from 'zustand';

export type Region = 'home' | 'works' | 'nexus' | 'about';

interface RegionCoords {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export const REGION_COORDS: Record<Region, RegionCoords> = {
  home: { position: [0, 0, 20], lookAt: [0, 0, 0] },
  works: { position: [50, 0, 0], lookAt: [50, 0, -20] },
  nexus: { position: [-50, 10, -10], lookAt: [-50, 10, -30] },
  about: { position: [0, 40, -20], lookAt: [0, 40, -40] },
};

interface NavigationState {
  currentRegion: Region;
  isTransitioning: boolean;
  setRegion: (region: Region) => void;
  setTransitioning: (value: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentRegion: 'home',
  isTransitioning: false,
  setRegion: (region) => set({ currentRegion: region }),
  setTransitioning: (value) => set({ isTransitioning: value }),
}));
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/stores/navigationStore.ts package.json package-lock.json
git commit -m "feat: add navigation state store with region coordinates"
```

---

### Task 1.3: 创建主 3D 场景容器

**Files:**
- Create: `src/components/canvas/Scene.tsx`
- Create: `src/components/canvas/index.ts`

**Step 1: 创建 Scene 组件**

```typescript
// src/components/canvas/Scene.tsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload } from '@react-three/drei';

interface SceneProps {
  children: React.ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050816']} />
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Step 2: 创建 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add main 3D Scene container component"
```

---

### Task 1.4: 创建环境组件（灯光、雾效）

**Files:**
- Create: `src/components/canvas/Environment.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 Environment 组件**

```typescript
// src/components/canvas/Environment.tsx
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Environment() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#050816', 0.008);
  }, [scene]);

  return (
    <>
      {/* 环境光 - 基础照明 */}
      <ambientLight intensity={0.2} />

      {/* 主方向光 - 从右上方照射 */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.5}
        color="#ffffff"
      />

      {/* 点光源 - 青色强调 */}
      <pointLight
        position={[-20, 10, 10]}
        intensity={1}
        color="#00f5ff"
        distance={100}
      />

      {/* 点光源 - 紫色强调 */}
      <pointLight
        position={[20, -10, -20]}
        intensity={0.8}
        color="#a855f7"
        distance={100}
      />
    </>
  );
}
```

**Step 2: 更新 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
export { Environment } from './Environment';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add Environment component with lights and fog"
```

---

### Task 1.5: 创建镜头控制组件

**Files:**
- Create: `src/components/canvas/CameraController.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 CameraController 组件**

```typescript
// src/components/canvas/CameraController.tsx
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useNavigationStore, REGION_COORDS } from '../../stores/navigationStore';
import * as THREE from 'three';

export function CameraController() {
  const { camera } = useThree();
  const currentRegion = useNavigationStore((s) => s.currentRegion);
  const setTransitioning = useNavigationStore((s) => s.setTransitioning);

  const targetPosition = useRef(new THREE.Vector3(0, 0, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const coords = REGION_COORDS[currentRegion];
    targetPosition.current.set(...coords.position);
    targetLookAt.current.set(...coords.lookAt);
    setTransitioning(true);
  }, [currentRegion, setTransitioning]);

  useFrame((_, delta) => {
    // 平滑移动相机位置
    camera.position.lerp(targetPosition.current, delta * 2);

    // 平滑移动视点
    currentLookAt.current.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt.current);

    // 检查是否到达目标
    const positionReached = camera.position.distanceTo(targetPosition.current) < 0.1;
    const lookAtReached = currentLookAt.current.distanceTo(targetLookAt.current) < 0.1;

    if (positionReached && lookAtReached) {
      setTransitioning(false);
    }
  });

  return null;
}
```

**Step 2: 更新 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
export { Environment } from './Environment';
export { CameraController } from './CameraController';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add CameraController for smooth region transitions"
```

---

### Task 1.6: 创建基础几何体组件

**Files:**
- Create: `src/components/canvas/Geometries.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 Geometries 组件**

```typescript
// src/components/canvas/Geometries.tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: 'icosahedron' | 'octahedron' | 'dodecahedron';
  size?: number;
  color?: string;
  speed?: number;
}

export function FloatingGeometry({
  position,
  geometry,
  size = 1,
  color = '#00f5ff',
  speed = 1,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;

    // 缓慢自转
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.005 * speed;

    // 上下浮动
    meshRef.current.position.y =
      initialY + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.5;
  });

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[size, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[size, 0]} />;
    }
  }, [geometry, size]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometryComponent}
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.8}
        transmission={0.5}
        thickness={0.5}
      />
    </mesh>
  );
}

export function Geometries() {
  const geometries: FloatingGeometryProps[] = [
    // Home 区域
    { position: [0, 0, 0], geometry: 'icosahedron', size: 3, color: '#00f5ff' },
    { position: [-8, 3, -5], geometry: 'octahedron', size: 1.5, color: '#a855f7' },
    { position: [7, -2, -8], geometry: 'dodecahedron', size: 1.2, color: '#3b82f6' },
    { position: [-5, -4, -3], geometry: 'icosahedron', size: 0.8, color: '#ec4899' },
    { position: [10, 5, -10], geometry: 'octahedron', size: 1, color: '#00f5ff' },

    // Works 区域
    { position: [50, 2, -20], geometry: 'icosahedron', size: 2, color: '#3b82f6' },
    { position: [45, -3, -25], geometry: 'dodecahedron', size: 1.5, color: '#a855f7' },
    { position: [55, 4, -15], geometry: 'octahedron', size: 1, color: '#00f5ff' },

    // Nexus 区域
    { position: [-50, 10, -30], geometry: 'dodecahedron', size: 2.5, color: '#a855f7' },
    { position: [-55, 8, -35], geometry: 'icosahedron', size: 1.2, color: '#ec4899' },
    { position: [-45, 12, -25], geometry: 'octahedron', size: 1.5, color: '#3b82f6' },

    // About 区域
    { position: [0, 40, -40], geometry: 'octahedron', size: 2, color: '#ec4899' },
    { position: [-6, 38, -45], geometry: 'icosahedron', size: 1.3, color: '#00f5ff' },
    { position: [5, 42, -35], geometry: 'dodecahedron', size: 1, color: '#a855f7' },
  ];

  return (
    <group>
      {geometries.map((props, index) => (
        <FloatingGeometry key={index} {...props} speed={0.5 + Math.random() * 0.5} />
      ))}
    </group>
  );
}
```

**Step 2: 更新 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
export { Environment } from './Environment';
export { CameraController } from './CameraController';
export { Geometries, FloatingGeometry } from './Geometries';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add floating geometry components with glass material"
```

---

### Task 1.7: 创建粒子系统

**Files:**
- Create: `src/components/canvas/Particles.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 Particles 组件**

```typescript
// src/components/canvas/Particles.tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  spread?: number;
}

export function Particles({ count = 500, spread = 100 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorOptions = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ec4899'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 在空间中随机分布
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread - 20;

      // 随机选择颜色
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // 缓慢旋转整个粒子系统
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
```

**Step 2: 更新 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
export { Environment } from './Environment';
export { CameraController } from './CameraController';
export { Geometries, FloatingGeometry } from './Geometries';
export { Particles } from './Particles';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add Particles system with colored points"
```

---

### Task 1.8: 创建连接线组件

**Files:**
- Create: `src/components/canvas/Connections.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 Connections 组件**

```typescript
// src/components/canvas/Connections.tsx
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

function Connection({ start, end, color = '#00f5ff' }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 2,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(20);
  }, [start, end]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.5} />
    </line>
  );
}

export function Connections() {
  const connections: ConnectionProps[] = [
    // Home 区域内连接
    { start: [0, 0, 0], end: [-8, 3, -5], color: '#00f5ff' },
    { start: [0, 0, 0], end: [7, -2, -8], color: '#a855f7' },
    { start: [-8, 3, -5], end: [10, 5, -10], color: '#3b82f6' },

    // 区域间连接（示意）
    { start: [10, 5, -10], end: [45, -3, -25], color: '#3b82f6' },
    { start: [-8, 3, -5], end: [-45, 12, -25], color: '#a855f7' },
    { start: [0, 0, 0], end: [0, 40, -40], color: '#ec4899' },
  ];

  return (
    <group>
      {connections.map((props, index) => (
        <Connection key={index} {...props} />
      ))}
    </group>
  );
}
```

**Step 2: 更新 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
export { Environment } from './Environment';
export { CameraController } from './CameraController';
export { Geometries, FloatingGeometry } from './Geometries';
export { Particles } from './Particles';
export { Connections } from './Connections';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add Connections component with bezier curves"
```

---

### Task 1.9: 添加后处理效果（Bloom）

**Files:**
- Create: `src/components/canvas/Effects.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 Effects 组件**

```typescript
// src/components/canvas/Effects.tsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
}
```

**Step 2: 更新 index 导出**

```typescript
// src/components/canvas/index.ts
export { Scene } from './Scene';
export { Environment } from './Environment';
export { CameraController } from './CameraController';
export { Geometries, FloatingGeometry } from './Geometries';
export { Particles } from './Particles';
export { Connections } from './Connections';
export { Effects } from './Effects';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add post-processing effects (Bloom, Vignette)"
```

---

### Task 1.10: 集成 3D 场景到 App

**Files:**
- Modify: `src/App.tsx`

**Step 1: 读取当前 App.tsx**

先读取当前文件结构

**Step 2: 重写 App.tsx**

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Scene,
  Environment,
  CameraController,
  Geometries,
  Particles,
  Connections,
  Effects,
} from './components/canvas';
import { useNavigationStore, Region } from './stores/navigationStore';

function NavigationSync() {
  const location = useLocation();
  const setRegion = useNavigationStore((s) => s.setRegion);

  useEffect(() => {
    const pathToRegion: Record<string, Region> = {
      '/': 'home',
      '/works': 'works',
      '/nexus': 'nexus',
      '/about': 'about',
    };
    const region = pathToRegion[location.pathname] || 'home';
    setRegion(region);
  }, [location.pathname, setRegion]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <NavigationSync />

      {/* 3D 场景 */}
      <Scene>
        <Environment />
        <CameraController />
        <Geometries />
        <Particles />
        <Connections />
        <Effects />
      </Scene>

      {/* 2D 路由内容（后续添加） */}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/works" element={null} />
        <Route path="/nexus" element={null} />
        <Route path="/about" element={null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**Step 3: 验证开发服务器**

Run:
```bash
npm run dev
```
Expected: 能在浏览器中看到 3D 场景

**Step 4: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate 3D scene into App with navigation sync"
```

---

## Phase 2: Home 区域

### Task 2.1: 创建 Home 区域 HTML 内容

**Files:**
- Create: `src/components/html/HeroContent.tsx`
- Create: `src/components/html/index.ts`

**Step 1: 创建 HeroContent 组件**

```typescript
// src/components/html/HeroContent.tsx
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { PROFILE } from '../../constants';

export function HeroContent() {
  return (
    <Html
      center
      position={[0, 0, 5]}
      style={{
        width: '100vw',
        pointerEvents: 'none',
      }}
    >
      <div className="text-center px-4">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/80">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for hire
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="block">用技术实现设计，</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            用 AI 放大创造力
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {PROFILE.tagline}
        </motion.p>

        {/* Identity Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {PROFILE.identities.slice(0, 3).map((identity, index) => (
            <span
              key={identity.label}
              className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/70"
            >
              <span className="mr-2">{identity.icon}</span>
              {identity.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="/works"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            查看作品 →
          </a>
          <a
            href={PROFILE.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </Html>
  );
}
```

**Step 2: 创建 index 导出**

```typescript
// src/components/html/index.ts
export { HeroContent } from './HeroContent';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/html/
git commit -m "feat: add HeroContent component for Home region"
```

---

### Task 2.2: 创建 Home 区域组件

**Files:**
- Create: `src/components/regions/HomeRegion.tsx`
- Create: `src/components/regions/index.ts`

**Step 1: 创建 HomeRegion 组件**

```typescript
// src/components/regions/HomeRegion.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HeroContent } from '../html/HeroContent';

export function HomeRegion() {
  const groupRef = useRef<THREE.Group>(null);
  const mainGeoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mainGeoRef.current) {
      mainGeoRef.current.rotation.x += 0.002;
      mainGeoRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 主视觉几何体 */}
      <mesh ref={mainGeoRef}>
        <icosahedronGeometry args={[4, 1]} />
        <meshPhysicalMaterial
          color="#00f5ff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          thickness={1}
          wireframe
        />
      </mesh>

      {/* 内层实心几何体 */}
      <mesh>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.8}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* HTML 内容 */}
      <HeroContent />
    </group>
  );
}
```

**Step 2: 创建 index 导出**

```typescript
// src/components/regions/index.ts
export { HomeRegion } from './HomeRegion';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/regions/
git commit -m "feat: add HomeRegion component with main icosahedron"
```

---

### Task 2.3: 创建鼠标视差 Hook

**Files:**
- Create: `src/hooks/useMouseParallax.ts`
- Create: `src/hooks/index.ts`

**Step 1: 创建 useMouseParallax Hook**

```typescript
// src/hooks/useMouseParallax.ts
import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMouseParallax() {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      setMouse({
        x: event.clientX,
        y: event.clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}
```

**Step 2: 创建 index 导出**

```typescript
// src/hooks/index.ts
export { useMouseParallax } from './useMouseParallax';
```

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useMouseParallax hook for mouse tracking"
```

---

### Task 2.4: 更新 Geometries 添加鼠标交互

**Files:**
- Modify: `src/components/canvas/Geometries.tsx`

**Step 1: 更新 FloatingGeometry 组件添加鼠标跟随**

在 FloatingGeometry 组件中添加鼠标视差效果：

```typescript
// 在 FloatingGeometry 组件中添加
import { useMouseParallax } from '../../hooks';

// 在 useFrame 中添加鼠标跟随逻辑
useFrame((state) => {
  if (!meshRef.current) return;

  // 获取鼠标位置（需要从外部传入或使用全局状态）
  const mouseX = (state.mouse.x * 0.5);
  const mouseY = (state.mouse.y * 0.5);

  // 缓慢自转
  meshRef.current.rotation.x += 0.003 * speed;
  meshRef.current.rotation.y += 0.005 * speed;

  // 上下浮动
  meshRef.current.position.y =
    initialY + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.5;

  // 鼠标视差（微微偏向鼠标）
  meshRef.current.position.x = position[0] + mouseX * 0.5;
  meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.5 + mouseY * 0.3;
});
```

**Step 2: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/components/canvas/Geometries.tsx
git commit -m "feat: add mouse parallax effect to floating geometries"
```

---

### Task 2.5: 更新 App.tsx 集成 HomeRegion

**Files:**
- Modify: `src/App.tsx`

**Step 1: 在 Scene 中添加 HomeRegion**

```typescript
import { HomeRegion } from './components/regions';

// 在 Scene 内添加
<HomeRegion />
```

**Step 2: 验证开发服务器**

Run:
```bash
npm run dev
```
Expected: 首页显示带有内容的 3D 场景

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate HomeRegion into App"
```

---

## Phase 3: 其他区域

### Task 3.1: 创建 Works 区域

**Files:**
- Create: `src/components/regions/WorksRegion.tsx`
- Create: `src/components/html/ProjectCard.tsx`
- Modify: `src/components/regions/index.ts`

**Step 1: 创建 ProjectCard 组件**

```typescript
// src/components/html/ProjectCard.tsx
import { Html } from '@react-three/drei';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function ProjectCard({ project, position, rotation = [0, 0, 0] }: ProjectCardProps) {
  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      occlude
      style={{ pointerEvents: 'auto' }}
    >
      <div className="w-72 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
        <div className="w-full h-40 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4 flex items-center justify-center">
          <span className="text-4xl">{project.icon || '🚀'}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Html>
  );
}
```

**Step 2: 创建 WorksRegion 组件**

```typescript
// src/components/regions/WorksRegion.tsx
import { PROJECTS } from '../../constants';
import { ProjectCard } from '../html/ProjectCard';

export function WorksRegion() {
  // 弧形排列项目卡片
  const radius = 15;
  const angleStep = Math.PI / 6; // 30度间隔

  return (
    <group position={[50, 0, -20]}>
      {/* 区域标题 */}
      <mesh position={[0, 8, 0]}>
        <textGeometry args={['WORKS', { size: 2, height: 0.2 }]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 项目卡片 */}
      {PROJECTS.map((project, index) => {
        const angle = (index - (PROJECTS.length - 1) / 2) * angleStep;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + radius;
        const rotationY = -angle;

        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
          />
        );
      })}

      {/* 装饰几何体 */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[12, 0.1, 8, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
```

**Step 3: 更新 index 导出**

```typescript
// src/components/regions/index.ts
export { HomeRegion } from './HomeRegion';
export { WorksRegion } from './WorksRegion';
```

**Step 4: 更新 html/index.ts**

```typescript
// src/components/html/index.ts
export { HeroContent } from './HeroContent';
export { ProjectCard } from './ProjectCard';
```

**Step 5: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 6: Commit**

```bash
git add src/components/regions/ src/components/html/
git commit -m "feat: add WorksRegion with arc-arranged project cards"
```

---

### Task 3.2: 创建 Nexus 区域

**Files:**
- Create: `src/components/regions/NexusRegion.tsx`
- Create: `src/components/html/ToolNode.tsx`
- Modify: `src/components/regions/index.ts`
- Modify: `src/components/html/index.ts`

**Step 1: 创建 ToolNode 组件**

```typescript
// src/components/html/ToolNode.tsx
import { Html } from '@react-three/drei';
import { useState } from 'react';
import { Tool } from '../../types';

interface ToolNodeProps {
  tool: Tool;
  position: [number, number, number];
}

export function ToolNode({ tool, position }: ToolNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position}>
      {/* 发光球体 */}
      <mesh
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhysicalMaterial
          color={tool.color || '#00f5ff'}
          emissive={tool.color || '#00f5ff'}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 工具信息 */}
      <Html
        position={[0, 1.2, 0]}
        center
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <div
          className={`transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="px-4 py-3 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-center min-w-[150px]">
            <div className="text-2xl mb-1">{tool.icon}</div>
            <div className="text-white font-medium">{tool.name}</div>
            <div className="text-xs text-slate-400 mt-1">{tool.category}</div>
          </div>
        </div>
      </Html>
    </group>
  );
}
```

**Step 2: 创建 NexusRegion 组件**

```typescript
// src/components/regions/NexusRegion.tsx
import { useMemo } from 'react';
import { TOOLS } from '../../constants';
import { ToolNode } from '../html/ToolNode';
import { Html } from '@react-three/drei';

export function NexusRegion() {
  // 星座图布局
  const toolPositions = useMemo(() => {
    return TOOLS.map((tool, index) => {
      const angle = (index / TOOLS.length) * Math.PI * 2;
      const radius = 8 + (index % 3) * 3;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 6;
      const z = Math.sin(angle) * radius;
      return { tool, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  return (
    <group position={[-50, 10, -30]}>
      {/* 区域标题 */}
      <Html position={[0, 12, 0]} center>
        <h2 className="text-3xl font-bold text-white">工具港</h2>
      </Html>

      {/* 搜索框 */}
      <Html position={[0, 9, 0]} center style={{ pointerEvents: 'auto' }}>
        <input
          type="text"
          placeholder="搜索工具..."
          className="w-64 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
        />
      </Html>

      {/* 工具节点 */}
      {toolPositions.map(({ tool, position }) => (
        <ToolNode key={tool.id} tool={tool} position={position} />
      ))}

      {/* 连接线（星座效果） */}
      {toolPositions.slice(0, -1).map(({ position }, index) => {
        const nextPosition = toolPositions[(index + 1) % toolPositions.length].position;
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...position, ...nextPosition])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#a855f7" transparent opacity={0.2} />
          </line>
        );
      })}
    </group>
  );
}
```

**Step 3: 更新导出文件**

**Step 4: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 5: Commit**

```bash
git add src/components/regions/ src/components/html/
git commit -m "feat: add NexusRegion with constellation-style tool nodes"
```

---

### Task 3.3: 创建 About 区域

**Files:**
- Create: `src/components/regions/AboutRegion.tsx`
- Create: `src/components/html/AboutCard.tsx`
- Modify: `src/components/regions/index.ts`
- Modify: `src/components/html/index.ts`

**Step 1: 创建 AboutCard 组件**

```typescript
// src/components/html/AboutCard.tsx
import { Html } from '@react-three/drei';
import { PROFILE, SKILLS } from '../../constants';

export function AboutCard() {
  return (
    <Html position={[0, 0, 5]} center style={{ pointerEvents: 'auto' }}>
      <div className="w-[500px] p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        {/* 头部信息 */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <span className="text-4xl">👨‍💻</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{PROFILE.name}</h2>
          <p className="text-slate-400 mt-2">{PROFILE.tagline}</p>
        </div>

        {/* 技能条 */}
        <div className="space-y-4 mb-8">
          {SKILLS.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{skill.name}</span>
                <span className="text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 联系方式 */}
        <div className="flex justify-center gap-4">
          <a
            href={PROFILE.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="text-xl">🐙</span>
          </a>
          <a
            href={`mailto:${PROFILE.contact.email}`}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="text-xl">📧</span>
          </a>
        </div>
      </div>
    </Html>
  );
}
```

**Step 2: 创建 AboutRegion 组件**

```typescript
// src/components/regions/AboutRegion.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AboutCard } from '../html/AboutCard';

export function AboutRegion() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 40, -40]}>
      {/* 装饰环 */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[15, 0.2, 8, 64]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
      </mesh>

      {/* 第二层环 */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[12, 0.15, 8, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>

      {/* 核心几何体 */}
      <mesh>
        <octahedronGeometry args={[3, 0]} />
        <meshPhysicalMaterial
          color="#ec4899"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 信息卡片 */}
      <AboutCard />
    </group>
  );
}
```

**Step 3: 更新导出文件**

```typescript
// src/components/regions/index.ts
export { HomeRegion } from './HomeRegion';
export { WorksRegion } from './WorksRegion';
export { NexusRegion } from './NexusRegion';
export { AboutRegion } from './AboutRegion';
```

```typescript
// src/components/html/index.ts
export { HeroContent } from './HeroContent';
export { ProjectCard } from './ProjectCard';
export { ToolNode } from './ToolNode';
export { AboutCard } from './AboutCard';
```

**Step 4: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 5: Commit**

```bash
git add src/components/regions/ src/components/html/
git commit -m "feat: add AboutRegion with skill bars and contact info"
```

---

### Task 3.4: 集成所有区域到 App

**Files:**
- Modify: `src/App.tsx`

**Step 1: 导入并添加所有区域组件**

```typescript
import { HomeRegion, WorksRegion, NexusRegion, AboutRegion } from './components/regions';

// 在 Scene 内添加
<HomeRegion />
<WorksRegion />
<NexusRegion />
<AboutRegion />
```

**Step 2: 验证开发服务器**

Run:
```bash
npm run dev
```
Expected: 可以通过 URL 切换看到不同区域

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate all regions into App"
```

---

## Phase 4: 导航与过渡

### Task 4.1: 创建顶部导航栏

**Files:**
- Modify: `src/components/ui/Navbar.tsx`

**Step 1: 重写 Navbar 组件**

```typescript
// src/components/ui/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/works', label: 'Works' },
  { path: '/nexus', label: 'Nexus' },
  { path: '/about', label: 'About' },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
        >
          River Hub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-white/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/components/ui/Navbar.tsx
git commit -m "feat: redesign Navbar with glass morphism and animated indicator"
```

---

### Task 4.2: 创建移动端导航栏

**Files:**
- Create: `src/components/ui/MobileNav.tsx`

**Step 1: 创建 MobileNav 组件**

```typescript
// src/components/ui/MobileNav.tsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Compass, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/works', label: 'Works', icon: Briefcase },
  { path: '/nexus', label: 'Nexus', icon: Compass },
  { path: '/about', label: 'About', icon: User },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
      <div className="flex items-center justify-around p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-1 px-4 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 rounded-xl bg-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                className={`relative z-10 w-5 h-5 ${
                  isActive ? 'text-cyan-400' : 'text-white/60'
                }`}
              />
              <span
                className={`relative z-10 text-xs ${
                  isActive ? 'text-cyan-400' : 'text-white/60'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

**Step 2: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/components/ui/MobileNav.tsx
git commit -m "feat: add MobileNav component for touch devices"
```

---

### Task 4.3: 创建场景内导航门户

**Files:**
- Create: `src/components/canvas/Portals.tsx`
- Modify: `src/components/canvas/index.ts`

**Step 1: 创建 Portals 组件**

```typescript
// src/components/canvas/Portals.tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Region, REGION_COORDS } from '../../stores/navigationStore';

interface PortalProps {
  targetRegion: Region;
  position: [number, number, number];
  label: string;
}

function Portal({ targetRegion, position, label }: PortalProps) {
  const navigate = useNavigate();
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

    // 悬停时放大
    const scale = isHovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  const handleClick = () => {
    const paths: Record<Region, string> = {
      home: '/',
      works: '/works',
      nexus: '/nexus',
      about: '/about',
    };
    navigate(paths[targetRegion]);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <torusGeometry args={[1, 0.3, 8, 32]} />
        <meshPhysicalMaterial
          color={isHovered ? '#00f5ff' : '#a855f7'}
          emissive={isHovered ? '#00f5ff' : '#a855f7'}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <Html position={[0, 2, 0]} center>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            isHovered
              ? 'bg-cyan-500/80 text-white'
              : 'bg-white/10 text-white/60'
          }`}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

export function Portals() {
  return (
    <group>
      {/* Home 区域的门户 */}
      <Portal targetRegion="works" position={[15, 0, -5]} label="Works →" />
      <Portal targetRegion="nexus" position={[-15, 5, -5]} label="← Nexus" />
      <Portal targetRegion="about" position={[0, 15, -10]} label="↑ About" />

      {/* Works 区域的门户 */}
      <Portal targetRegion="home" position={[35, 0, -15]} label="← Home" />

      {/* Nexus 区域的门户 */}
      <Portal targetRegion="home" position={[-35, 10, -25]} label="Home →" />

      {/* About 区域的门户 */}
      <Portal targetRegion="home" position={[0, 25, -35]} label="↓ Home" />
    </group>
  );
}
```

**Step 2: 更新 index 导出**

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add in-scene navigation portals"
```

---

### Task 4.4: 创建加载动画

**Files:**
- Create: `src/components/ui/Loader.tsx`

**Step 1: 创建 Loader 组件**

```typescript
// src/components/ui/Loader.tsx
import { motion } from 'framer-motion';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050816]">
      <div className="relative">
        {/* 旋转几何线框 */}
        <motion.div
          className="w-24 h-24 border-2 border-cyan-500/50"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* 内层 */}
        <motion.div
          className="absolute inset-4 border-2 border-purple-500/50"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* 加载文字 */}
        <motion.p
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-white/60"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
```

**Step 2: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/components/ui/Loader.tsx
git commit -m "feat: add geometric Loader component"
```

---

### Task 4.5: 集成导航组件到 App

**Files:**
- Modify: `src/App.tsx`

**Step 1: 导入并添加导航组件**

添加 Navbar、MobileNav、Portals 到 App，并用 Suspense 包裹 3D 场景显示 Loader。

**Step 2: 验证开发服务器**

Run:
```bash
npm run dev
```
Expected: 导航完全可用

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate navigation components into App"
```

---

## Phase 5: 优化与适配

### Task 5.1: 创建设备性能检测 Hook

**Files:**
- Create: `src/hooks/useDevicePerformance.ts`
- Modify: `src/hooks/index.ts`

**Step 1: 创建性能检测 Hook**

```typescript
// src/hooks/useDevicePerformance.ts
import { useState, useEffect } from 'react';

type PerformanceTier = 'high' | 'medium' | 'low';

interface DevicePerformance {
  tier: PerformanceTier;
  isMobile: boolean;
  supportsWebGL: boolean;
  hardwareConcurrency: number;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 'high',
    isMobile: false,
    supportsWebGL: true,
    hardwareConcurrency: 4,
  });

  useEffect(() => {
    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // 检测 WebGL 支持
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const supportsWebGL = !!gl;

    // 获取 CPU 核心数
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // 确定性能等级
    let tier: PerformanceTier = 'high';
    if (!supportsWebGL) {
      tier = 'low';
    } else if (isMobile || hardwareConcurrency <= 2) {
      tier = 'medium';
    } else if (hardwareConcurrency <= 4) {
      tier = 'medium';
    }

    setPerformance({
      tier,
      isMobile,
      supportsWebGL,
      hardwareConcurrency,
    });
  }, []);

  return performance;
}
```

**Step 2: 更新 hooks/index.ts**

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useDevicePerformance hook for performance detection"
```

---

### Task 5.2: 实现性能自适应

**Files:**
- Modify: `src/components/canvas/Particles.tsx`
- Modify: `src/components/canvas/Effects.tsx`

**Step 1: 在 Particles 中添加性能适配**

根据设备性能调整粒子数量。

**Step 2: 在 Effects 中添加性能适配**

低端设备禁用 Bloom 效果。

**Step 3: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 4: Commit**

```bash
git add src/components/canvas/
git commit -m "feat: add performance-based adaptations"
```

---

### Task 5.3: 创建 WebGL 降级页面

**Files:**
- Create: `src/components/ui/FallbackPage.tsx`

**Step 1: 创建 FallbackPage 组件**

```typescript
// src/components/ui/FallbackPage.tsx
export function FallbackPage() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🚀</div>
        <h1 className="text-2xl font-bold text-white mb-4">
          River Hub
        </h1>
        <p className="text-slate-400 mb-8">
          您的浏览器不支持 WebGL，无法显示 3D 内容。请使用现代浏览器（Chrome、Firefox、Safari）访问以获得最佳体验。
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="https://github.com/riverhub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            访问 GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/components/ui/FallbackPage.tsx
git commit -m "feat: add WebGL fallback page"
```

---

### Task 5.4: 更新全局样式

**Files:**
- Modify: `src/index.css`

**Step 1: 更新全局样式**

添加深色主题变量和全局样式。

**Step 2: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: update global styles for dark theme"
```

---

### Task 5.5: 最终集成与测试

**Files:**
- Modify: `src/App.tsx`

**Step 1: 添加 WebGL 检测和降级逻辑**

**Step 2: 验证所有功能**

Run:
```bash
npm run dev
```

检查清单：
- [ ] 首页 3D 场景正常显示
- [ ] 镜头飞行过渡平滑
- [ ] 导航栏点击工作
- [ ] 移动端导航栏显示
- [ ] 场景内门户可点击
- [ ] 鼠标视差效果工作
- [ ] 粒子系统正常

**Step 3: 生产构建**

Run:
```bash
npm run build
```
Expected: 构建成功，无错误

**Step 4: 最终 Commit**

```bash
git add .
git commit -m "feat: complete 3D immersive redesign integration"
```

---

## 完成后

完成所有任务后，使用 `superpowers:finishing-a-development-branch` 技能来：
1. 合并到主分支
2. 创建 Pull Request
3. 清理 worktree
