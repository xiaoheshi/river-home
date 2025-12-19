
import React from 'react';
import { Tool, ToolCategory } from './types';

export const TOOLS: Tool[] = [
  // --- AI 象限 ---
  {
    id: 'deepseek-chat',
    name: 'DeepSeek',
    description: '国产大模型之光，具备极强的推理能力与代码理解力，极致性价比。',
    url: 'https://chat.deepseek.com',
    category: ToolCategory.AI,
    icon: '🐳',
    tags: ['AI', '推理', '开源']
  },
  {
    id: 'kimi-ai',
    name: 'Kimi',
    description: '月之暗面开发，擅长处理超长上下文，支持数十万字的长文档分析。',
    url: 'https://kimi.moonshot.cn',
    category: ToolCategory.AI,
    icon: '🌙',
    tags: ['长文本', '国产', '分析']
  },
  {
    id: 'perplexity-ai',
    name: 'Perplexity',
    description: 'AI 驱动的新一代搜索引擎，实时联网搜索并提供可信的来源引用。',
    url: 'https://www.perplexity.ai',
    category: ToolCategory.AI,
    icon: '🔍',
    tags: ['搜索', '实时', '学术']
  },
  {
    id: 'chatgpt-main',
    name: 'ChatGPT',
    description: 'OpenAI 旗舰产品，多模态交互的先行者，覆盖全场景的智能助手。',
    url: 'https://chatgpt.com',
    category: ToolCategory.AI,
    icon: '🤖',
    tags: ['GPT', 'OpenAI', '多模态']
  },
  {
    id: 'midjourney-web',
    name: 'Midjourney',
    description: '全球最顶尖的 AI 图像生成工具，创造极具艺术感的视觉作品。',
    url: 'https://www.midjourney.com',
    category: ToolCategory.AI,
    icon: '🎨',
    tags: ['绘图', '艺术', '设计']
  },
  {
    id: 'suno-music',
    name: 'Suno',
    description: 'AI 音乐创作平台，只需一段文字即可生成完整且高品质的乐曲。',
    url: 'https://suno.com',
    category: ToolCategory.AI,
    icon: '🎵',
    tags: ['音乐', '创作', '娱乐']
  },

  // --- 开发象限 ---
  {
    id: 'github-portal',
    name: 'GitHub',
    description: '全球最大的开源协作社区，管理代码版本与 CI/CD 流程。',
    url: 'https://github.com',
    category: ToolCategory.DEVELOPMENT,
    icon: '🐙',
    tags: ['Git', '开源', '协作']
  },
  {
    id: 'tailwind-docs',
    name: 'Tailwind CSS',
    description: '原子化 CSS 框架，极大提升前端 UI 开发速度与自由度。',
    url: 'https://tailwindcss.com',
    category: ToolCategory.DEVELOPMENT,
    icon: '🌊',
    tags: ['CSS', '框架', '高效']
  },
  {
    id: 'supabase-db',
    name: 'Supabase',
    description: 'Firebase 的开源替代品，提供即时可用的数据库、认证与存储服务。',
    url: 'https://supabase.com',
    category: ToolCategory.DEVELOPMENT,
    icon: '⚡',
    tags: ['后端', 'DB', 'BaaS']
  },
  {
    id: 'excalidraw-whiteboard',
    name: 'Excalidraw',
    description: '手绘风格的在线协作白板，适合快速构思架构图与流程。',
    url: 'https://excalidraw.com',
    category: ToolCategory.DEVELOPMENT,
    icon: '✏️',
    tags: ['绘图', '白板', '协作']
  },
  {
    id: 'vercel-ops',
    name: 'Vercel',
    description: '现代 Web 部署的最佳平台，极致的自动化流程，前端首选。',
    url: 'https://vercel.com',
    category: ToolCategory.DEVELOPMENT,
    icon: '▲',
    tags: ['部署', 'Next.js', '前端']
  },

  // --- 创意象限 ---
  {
    id: 'figma-design',
    name: 'Figma',
    description: '基于浏览器的协作式设计工具，UI/UX 行业的标准工作平台。',
    url: 'https://www.figma.com',
    category: ToolCategory.CREATIVE,
    icon: '💎',
    tags: ['UI', 'UX', '设计']
  },
  {
    id: 'dribbble-insp',
    name: 'Dribbble',
    description: '全球设计师的作品展示社区，获取最新视觉趋势的最佳地点。',
    url: 'https://dribbble.com',
    category: ToolCategory.CREATIVE,
    icon: '🏀',
    tags: ['灵感', '展示', 'UI']
  },
  {
    id: 'pinterest-visuals',
    name: 'Pinterest',
    description: '视觉发现引擎，寻找室内设计、时尚、摄影等各类创意灵感。',
    url: 'https://pinterest.com',
    category: ToolCategory.CREATIVE,
    icon: '📌',
    tags: ['发现', '美学', '摄影']
  },

  // --- 生产力象限 ---
  {
    id: 'notion-workspace',
    name: 'Notion',
    description: '全能的数字化笔记与团队协作平台，重塑个人知识管理体系。',
    url: 'https://www.notion.so',
    category: ToolCategory.PRODUCTIVITY,
    icon: '📓',
    tags: ['笔记', 'Wiki', '任务']
  },
  {
    id: 'linear-app',
    name: 'Linear',
    description: '专为高性能团队打造的任务管理工具，拥有极致的流畅交互。',
    url: 'https://linear.app',
    category: ToolCategory.PRODUCTIVITY,
    icon: '📈',
    tags: ['PM', '任务', '流程']
  },
  {
    id: 'obsidian-notes',
    name: 'Obsidian',
    description: '本地优先的第二大脑，基于 Markdown 构建强大的双链笔记网络。',
    url: 'https://obsidian.md',
    category: ToolCategory.PRODUCTIVITY,
    icon: '🔮',
    tags: ['双链', '知识库', '离线']
  },

  // --- 实用工具 ---
  {
    id: 'raycast-mac',
    name: 'Raycast',
    description: 'Mac 上极速、可扩展的启动器，彻底替代并超越 Spotlight。',
    url: 'https://www.raycast.com',
    category: ToolCategory.UTILITIES,
    icon: '⚡',
    tags: ['效率', 'Mac', '工具']
  },
  {
    id: 'tinywow-tools',
    name: 'TinyWow',
    description: '全功能的 PDF、图像、视频在线处理工具箱，完全免费。',
    url: 'https://tinywow.com',
    category: ToolCategory.UTILITIES,
    icon: '🛠️',
    tags: ['处理', 'PDF', '多功能']
  },
  {
    id: 'product-hunt',
    name: 'Product Hunt',
    description: '每日新产品发布平台，第一时间发现全球最有趣的软硬件项目。',
    url: 'https://www.producthunt.com',
    category: ToolCategory.UTILITIES,
    icon: '😺',
    tags: ['趋势', '产品', '社区']
  }
];

export const CATEGORIES = Object.values(ToolCategory);
