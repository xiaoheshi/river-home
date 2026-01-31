# River Hub 3D 沉浸式重构设计方案

**日期**：2026-01-31
**状态**：已通过评审

---

## 一、项目概述

将 River Hub 个人作品集网站全面重构为 3D 沉浸式体验，采用几何抽象风格，支持桌面端和移动端。

### 设计目标
- 炫酷科技感的视觉体验
- 全页面 3D 场景，内容嵌入其中
- 连续 3D 世界，页面切换为镜头飞行
- 鼠标/触摸驱动的交互
- 完整的移动端支持

---

## 二、技术栈

| 类别 | 技术选型 |
|------|----------|
| 框架 | React + TypeScript + Vite |
| 3D 渲染 | React Three Fiber + Drei |
| 2D 动画 | Framer Motion |
| 样式 | Tailwind CSS |
| 路由 | react-router-dom |

---

## 三、3D 世界架构

### 空间布局
整个站点是一个 Three.js Canvas，占满视口。4 个区域分布在 3D 空间的不同坐标：

| 区域 | 坐标 (x, y, z) | 说明 |
|------|---------------|------|
| Home | (0, 0, 0) | 中心原点 |
| Works | (50, 0, -20) | 右侧区域 |
| Nexus | (-50, 10, -30) | 左侧区域 |
| About | (0, 40, -40) | 上方区域 |

### 页面切换机制
- 页面切换 = 镜头（Camera）平滑飞行到目标坐标
- 2D 内容通过 Drei 的 `Html` 组件嵌入 3D 空间
- URL 与镜头位置同步

---

## 四、视觉设计

### 风格定位
**几何抽象** — 浮动多边形、线框结构、数据可视化风格

### 几何元素
- **主体结构**：低多边形（Icosahedron、Octahedron、Dodecahedron）漂浮在空间中
- **连接网络**：几何体之间有动态细线连接，形成"神经网络"视觉
- **粒子点缀**：微小光点在空间中缓慢漂浮，增加深度感

### 材质与光效
- 几何体：半透明玻璃材质 + 边缘辉光（MeshPhysicalMaterial + Bloom 后处理）
- 线条：渐变色发光线（青蓝 → 紫色）
- 整体场景：轻微雾效（Fog）增加空间层次

### 配色方案

```css
/* 背景 */
--bg-primary: #050816;
--bg-secondary: #0a0e27;

/* 主色 */
--color-cyan: #00f5ff;
--color-blue: #3b82f6;

/* 强调色 */
--color-purple: #a855f7;
--color-pink: #ec4899;

/* 文字 */
--text-primary: #ffffff;
--text-secondary: #94a3b8;
```

### 动态效果
- 几何体：缓慢自转 + 轻微上下浮动
- 鼠标移动：几何体微微偏向鼠标方向（视差效果）
- 鼠标悬停几何体：放大 + 辉光增强

---

## 五、各区域设计

### Home（中心原点）
- 中心一个大型旋转 Icosahedron 作为主视觉
- 标题"用技术实现设计，用 AI 放大创造力"浮于几何体前方
- 身份标签（全栈开发者、产品设计者、AI探索者）环绕几何体分布
- 周围散布小型几何体，鼠标靠近会被"吸引"

### Works（右侧区域）
- 项目卡片以 3D 平面形式悬浮在空间中，呈弧形排列
- 每张卡片有玻璃材质，悬停时翻转显示详情
- 卡片之间有光线连接，暗示项目关联
- 筛选功能通过浮动标签实现

### Nexus（左侧区域）
- 工具以节点形式分布，形成"星座图"
- 不同分类用不同颜色区分
- 点击节点展开工具详情面板
- 搜索框浮于场景上方

### About（上方区域）
- 技能数据以 3D 柱状图/雷达图形式可视化
- 个人信息卡片悬浮在中央
- 联系方式以发光图标环绕
- 点击联系方式触发对应操作

---

## 六、导航系统

### 顶部导航栏
- 固定在视口顶部，`z-index` 高于 Canvas
- 半透明深色玻璃效果（`backdrop-blur` + 半透明背景）
- 导航项：Home / Works / Nexus / About
- 当前页面指示器：底部发光线条
- Logo 在左侧，简洁文字"River Hub"

### 场景内导航入口
- 每个区域边缘有 2-3 个发光门户（Torus 几何体 + 旋转动画）
- 门户上方浮动文字提示目标区域
- 鼠标悬停门户：脉冲放大 + 颜色变亮
- 点击触发镜头飞行

### 镜头飞行过渡
- 使用 Drei 的 `CameraControls` 实现平滑镜头移动
- 飞行时长约 1.5-2 秒，使用 ease-in-out 缓动
- 飞行过程中经过的几何体会被"推开"产生涟漪效果
- URL 与镜头位置同步（`/` → Home，`/works` → Works 区域）

### 移动端触摸适配
- 触摸拖动 = 鼠标移动（视角微调）
- 底部固定导航栏替代顶部导航（拇指可达区域）
- 场景内门户增大触摸热区

---

## 七、性能优化

### 渲染优化
- 几何体使用 `InstancedMesh` 批量渲染，减少 draw calls
- 粒子系统使用 `Points` 而非独立 Mesh
- 离屏几何体自动隐藏（Frustum Culling）
- 纹理使用压缩格式（Basis/KTX2）
- 后处理效果（Bloom）分辨率减半

### 移动端优化
- 几何体数量减少 50%
- 禁用部分后处理效果（如 Bloom 降级为简单辉光）
- 粒子数量减半
- 触摸事件节流处理

### 加载体验
- 首次加载显示极简 Loading 动画（旋转几何线框）
- 3D 资源异步加载，核心内容优先渲染
- 使用 `Suspense` 包裹 3D 场景

### 降级兜底
- 检测 WebGL 支持，不支持时显示静态页面 + 提示
- 检测设备性能（通过 `navigator.hardwareConcurrency` 和 GPU 信息）
- 低端设备自动切换"轻量模式"（2D 背景 + CSS 动画）

---

## 八、文件结构规划

```
src/
├── components/
│   ├── canvas/           # 3D 场景组件
│   │   ├── Scene.tsx     # 主场景容器
│   │   ├── Camera.tsx    # 镜头控制
│   │   ├── Lights.tsx    # 灯光系统
│   │   ├── Environment.tsx # 环境（雾、背景）
│   │   ├── Geometries.tsx  # 几何体管理
│   │   ├── Particles.tsx   # 粒子系统
│   │   ├── Connections.tsx # 连接线
│   │   └── Portals.tsx     # 导航门户
│   ├── regions/          # 各区域 3D 内容
│   │   ├── HomeRegion.tsx
│   │   ├── WorksRegion.tsx
│   │   ├── NexusRegion.tsx
│   │   └── AboutRegion.tsx
│   ├── ui/               # 2D UI 组件
│   │   ├── Navbar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Loader.tsx
│   │   └── Cursor.tsx
│   └── html/             # 嵌入 3D 的 HTML 内容
│       ├── HeroContent.tsx
│       ├── ProjectCard.tsx
│       ├── ToolNode.tsx
│       └── AboutCard.tsx
├── hooks/
│   ├── useDevicePerformance.ts
│   ├── useCameraFlight.ts
│   └── useMouseParallax.ts
├── stores/
│   └── navigationStore.ts  # 导航状态管理
├── App.tsx
└── main.tsx
```

---

## 九、实施优先级

1. **Phase 1 - 基础框架**
   - 搭建 R3F Canvas
   - 实现基础几何场景
   - 镜头飞行系统

2. **Phase 2 - Home 区域**
   - 主视觉几何体
   - 内容嵌入
   - 鼠标交互

3. **Phase 3 - 其他区域**
   - Works 区域
   - Nexus 区域
   - About 区域

4. **Phase 4 - 导航与过渡**
   - 导航栏
   - 场景内门户
   - 过渡动画

5. **Phase 5 - 优化与适配**
   - 性能优化
   - 移动端适配
   - 降级策略
