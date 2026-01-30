// ============ Tool Types ============
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

// ============ Profile Types ============
export interface Identity {
  label: string;
  icon: string;
  color: 'teal' | 'cyan' | 'sky' | 'amber' | 'rose' | 'emerald';
}

export interface Contact {
  email: string;
  github: string;
  wechat: string;
  wechatQR?: string;  // 二维码图片路径
  socialMedia?: SocialMedia[];
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  englishName: string;
  tagline: string;
  location: string;
  bio: string[];
  identities: Identity[];
  contact: Contact;
}

// ============ Project Types ============
export type ProjectStatus = 'live' | 'development' | 'archived';

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: ProjectStatus;
  roles: string[];
  techStack: string[];
  url?: string;
  highlights?: string[];
}

// ============ Skill Types ============
export interface Skill {
  name: string;
  level: number;  // 0-100
  items: string[];
  icon: string;
}
