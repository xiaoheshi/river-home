# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

River Hub（Riverhub 的个人站点）是一个高端个人作品集网站，展示 Riverhub 的多重身份：全栈开发者、产品设计者、AI探索者。使用 React + TypeScript + Vite + react-router-dom 构建。

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 3000）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 环境配置

在 `.env.local` 文件中设置 `GEMINI_API_KEY` 环境变量以启用工具港的智能搜索功能。

## 代码架构

### 目录结构
- `App.tsx` - 路由容器，包含页面过渡动画
- `index.tsx` - React 应用入口（包含 BrowserRouter）
- `types.ts` - TypeScript 类型定义（Tool、ToolCategory、Profile、Project、Skill 等）
- `constants.tsx` - 个人资料、项目、技能、工具数据
- `pages/` - 页面组件（Home、Works、About、Nexus）
- `components/` - UI 组件
- `components/home/` - 首页专用组件
- `services/geminiService.ts` - Gemini AI 服务封装

### 页面路由
- `/` - 首页（Hero + 项目展示 + 技能网格 + 工具港预览 + 联系方式）
- `/works` - 作品页（项目卡片 + 筛选）
- `/nexus` - 工具港（工具导航 + 智能搜索）
- `/about` - 关于页（技能进度条 + 联系信息）

### 核心数据
- `PROFILE` - 个人资料（姓名、tagline、身份标签、联系方式）
- `SKILLS` - 技能列表（产品设计、前端开发、后端开发、AI应用）
- `PROJECTS` - 项目列表（Ecommica Deals、标书智能助手、小说创作助手）
- `TOOLS` - 工具列表（用于工具港页面）

### 路径别名
`@/*` 映射到项目根目录（通过 tsconfig.json 和 vite.config.ts 配置）
