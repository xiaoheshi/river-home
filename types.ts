
export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
}

export enum ToolCategory {
  DEVELOPMENT = '开发',
  CREATIVE = '创意',
  PRODUCTIVITY = '生产力',
  AI = '人工智能',
  UTILITIES = '工具'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface UserData {
  favorites: string[];           // 收藏的工具 ID 列表
  recentlyUsed: RecentUsage[];   // 最近使用记录
  lastUpdated: number;           // 最后更新时间戳
}

export interface RecentUsage {
  toolId: string;
  timestamp: number;
  count: number;                 // 点击次数
}
