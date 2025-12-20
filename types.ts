
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
  UTILITIES = '工具',
  PERSONAL = '个人作品'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
