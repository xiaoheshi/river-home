import {
  Code2,
  Brain,
  Building2,
  Users,
  type LucideIcon,
} from 'lucide-react'

// ─── 个人信息 ───
export const profile = {
  name: '史晓河',
  nameEn: 'Shi Xiaohe',
  title: '高级 Java 架构师 / 技术负责人',
  tagline: '13 年全栈经验，用 AI 重新定义研发效率',
  bio: '深耕金融支付与智慧城市双领域，精通 Java 后端与 Vue3 前端全栈开发。率先将 AI 编程引入工程实践，具备从技术选型到系统交付的完整闭环能力，兼具售前标书撰写与团队管理经验。',
  github: 'https://github.com/xiaoheshi',
  phone: '18618387956',
  location: '西安',
  experience: '13 年',
}

// ─── 核心能力 ───
export interface Competency {
  icon: LucideIcon
  title: string
  description: string
}

export const competencies: Competency[] = [
  {
    icon: Code2,
    title: '全栈架构',
    description:
      '精通 Java 后端（Spring Boot / Cloud），熟练 Vue3 前端与 uni-app 移动端，能独立主导完整交付链路',
  },
  {
    icon: Brain,
    title: 'AI 编程先行者',
    description:
      '率先将 Vibe Coding 引入实践，熟练使用 Claude Code、Codex 等工具，掌握 SDD/TDD 范式',
  },
  {
    icon: Building2,
    title: '双领域深耕',
    description:
      '兼具金融支付（银联收单、分润结算）与智慧城市（智慧社区、智慧教育、智慧食安）深度经验',
  },
  {
    icon: Users,
    title: '业务到技术闭环',
    description:
      '售前技术支持与标书撰写，5-6 人团队全周期管理，连接商业需求与技术实现',
  },
]

// ─── 技术栈 ───
export interface TechCategory {
  label: string
  items: string[]
}

export const techStack: TechCategory[] = [
  {
    label: '后端',
    items: ['Java', 'Spring Boot', 'Spring Cloud', 'MyBatis-Plus', 'MySQL', 'Redis', 'RabbitMQ', 'XXL-Job', 'Nginx'],
  },
  {
    label: '前端',
    items: ['Vue3', 'React', 'Element Plus', 'ECharts', 'Tailwind CSS', 'TypeScript'],
  },
  {
    label: '移动端',
    items: ['uni-app', 'React Native', 'Android', 'iOS', '小程序'],
  },
  {
    label: 'AI 工具',
    items: ['Claude Code', 'GitHub Copilot', 'Codex', 'Vibe Coding'],
  },
  {
    label: 'DevOps',
    items: ['Git', 'Maven', 'Linux', 'Docker', 'Nginx'],
  },
]

// ─── 工作经历 ───
export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export const experiences: Experience[] = [
  {
    company: '河南润臻科技有限公司',
    role: '技术架构师（技术负责人）',
    period: '2022.02 — 至今',
    highlights: [
      '从零主导「润臻智慧大脑」平台，覆盖智慧社区与智慧教育两大业务域',
      '主导智慧食安智能验收秤 APP，完成硬件协议解析与全程数字化管理',
      '独立撰写政府及企业项目投标技术标书，显著提升中标竞争力',
    ],
  },
  {
    company: '上海遒翔信息科技有限公司',
    role: '高级 Java 开发工程师 / 项目副组长',
    period: '2018.05 — 2020.10',
    highlights: [
      '率先落地 React Native，独立完成「闪 POS」代理 APP 及后端服务',
      '主导「新银惠通」核心模块：交易对账引擎与分润计算体系',
      '管理 4-5 人团队，保障日均百万级交易系统稳定运行',
    ],
  },
  {
    company: '上海胜炫电子科技有限公司',
    role: 'Java 开发工程师',
    period: '2017.04 — 2018.04',
    highlights: [
      '主导「考拉畅付」聚合支付核心业务重构，设计交易通道统一对接层',
      '重写分润计算引擎，迁移定时任务至 XXL-Job 统一调度',
    ],
  },
  {
    company: '乐蛙科技（上海）有限公司',
    role: 'Java 开发工程师',
    period: '2016.07 — 2017.04',
    highlights: [
      '参与广告投放平台研发，负责离线广告、实时竞价广告投放逻辑与性能优化',
      '独立对接多家广告网络，完成 offer 定时拉取与数据回传可配置化改造',
    ],
  },
  {
    company: '北京市久玖数据服务有限公司',
    role: 'Java 开发工程师',
    period: '2015.04 — 2016.06',
    highlights: [
      '负责 POS 收单业务平台迭代开发，完成支付通道对账与 T+1 出款校验优化',
    ],
  },
  {
    company: '北京点讯通达信息技术有限公司',
    role: 'Java 开发工程师',
    period: '2013.11 — 2015.04',
    highlights: [
      '负责短信/彩信平台通道扩展，完成多运营商通道全链路联调测试',
    ],
  },
]

// ─── 项目展示 ───
export interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
  linkLabel?: string
  github?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'River Bid Writer',
    description:
      '基于 Claude Code 的标书技术方案生成系统，自动分析招标文件评分点、规划方案结构、撰写技术方案并整合为完整标书，将标书写作效率提升数倍。',
    tags: ['Python', 'Claude Code', 'AI', 'NLP'],
    github: 'https://github.com/xiaoheshi/river-bid-writer',
    featured: true,
  },
  {
    title: 'Ecommica Deals',
    description:
      '在线广告与促销聚合平台，为商家提供广告投放、优惠券分发与营销数据分析服务，助力电商业务增长。',
    tags: ['Vue', 'TypeScript', 'Node.js', '广告平台'],
    link: 'https://deals.ecommica.com',
    linkLabel: '访问平台',
    featured: true,
  },
  {
    title: '润臻智慧大脑',
    description:
      '面向政府及企事业单位的一体化智慧管理平台，覆盖智慧社区（门禁、监控、大屏）与智慧教育（电子班牌、收费管理）。',
    tags: ['Java', 'Spring Boot', 'Vue3', 'uni-app', 'MySQL'],
    featured: false,
  },
  {
    title: '收单业务平台',
    description:
      '服务于收单机构的多品牌定制化系统矩阵（闪POS/新银惠通/融POS），支持银联刷卡、扫码支付，日均百万级交易。',
    tags: ['Java', 'Spring Boot', 'RabbitMQ', 'React Native'],
    featured: false,
  },
  {
    title: '智慧食安 APP',
    description:
      '智能验收秤 APP，实现硬件秤数据毫秒级采集、异常预警、台账归档及监管数据上报，将验收环节全面数字化。',
    tags: ['uni-app', 'Java', 'IoT', '蓝牙协议'],
    featured: false,
  },
]

// ─── 导航 ───
export const navLinks = [
  { label: '关于', href: '#about' },
  { label: '经历', href: '#experience' },
  { label: '项目', href: '#projects' },
  { label: '联系', href: '#contact' },
]
