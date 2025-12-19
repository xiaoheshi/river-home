# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

River Nexus（晓河的数字流域）是一个个人工具导航门户，使用 React + TypeScript + Vite 构建。项目集成了 Gemini AI 实现智能搜索和聊天助手功能。

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

在 `.env.local` 文件中设置 `GEMINI_API_KEY` 环境变量以启用 AI 功能。

## 代码架构

### 目录结构
- `App.tsx` - 主应用组件，包含搜索、分类筛选和工具展示逻辑
- `index.tsx` - React 应用入口
- `types.ts` - TypeScript 类型定义（Tool、ToolCategory、ChatMessage）
- `constants.tsx` - 工具数据和分类常量
- `components/` - UI 组件
- `services/geminiService.ts` - Gemini AI 服务封装

### 核心数据流
1. `TOOLS` 常量（constants.tsx）定义所有工具卡片数据
2. `App.tsx` 管理搜索状态和分类筛选
3. 智能搜索通过 `performSmartSearch` 调用 Gemini API 进行语义匹配
4. `FloatingChat` 组件提供 AI 助手对话功能（River Core）

### 工具分类枚举（ToolCategory）
- 开发、创意、生产力、人工智能、工具

### 路径别名
`@/*` 映射到项目根目录（通过 tsconfig.json 和 vite.config.ts 配置）
