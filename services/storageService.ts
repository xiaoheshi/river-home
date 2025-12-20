import { UserData, RecentUsage } from '../types';

const STORAGE_KEY = 'river-nexus-user-data';
const CLICK_STATS_KEY = 'river-nexus-click-stats';
const MAX_RECENT_ITEMS = 10;

const getDefaultData = (): UserData => ({
  favorites: [],
  recentlyUsed: [],
  lastUpdated: Date.now()
});

interface ClickStats {
  [toolId: string]: number;
}

// 用户数据存储服务
export const storageService = {
  // 获取用户数据
  getUserData(): UserData {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : getDefaultData();
    } catch {
      return getDefaultData();
    }
  },

  // 保存用户数据
  saveUserData(data: UserData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...data,
        lastUpdated: Date.now()
      }));
    } catch (e) {
      console.warn('Failed to save user data:', e);
    }
  },

  // 切换收藏状态
  toggleFavorite(toolId: string): boolean {
    const data = this.getUserData();
    const index = data.favorites.indexOf(toolId);
    const isNowFavorite = index === -1;

    if (isNowFavorite) {
      data.favorites.push(toolId);
    } else {
      data.favorites.splice(index, 1);
    }

    this.saveUserData(data);
    return isNowFavorite;
  },

  // 记录工具使用
  recordUsage(toolId: string): void {
    const data = this.getUserData();
    const existingIndex = data.recentlyUsed.findIndex(r => r.toolId === toolId);

    if (existingIndex > -1) {
      const existing = data.recentlyUsed[existingIndex];
      existing.timestamp = Date.now();
      existing.count += 1;
      // 移到数组开头
      data.recentlyUsed.splice(existingIndex, 1);
      data.recentlyUsed.unshift(existing);
    } else {
      data.recentlyUsed.unshift({
        toolId,
        timestamp: Date.now(),
        count: 1
      });
    }

    // 限制数量
    data.recentlyUsed = data.recentlyUsed.slice(0, MAX_RECENT_ITEMS);
    this.saveUserData(data);
  },

  // 检查是否已收藏
  isFavorite(toolId: string): boolean {
    return this.getUserData().favorites.includes(toolId);
  }
};

// 点击统计服务
export const statsService = {
  recordClick(toolId: string): void {
    try {
      const stats = this.getStats();
      stats[toolId] = (stats[toolId] || 0) + 1;
      localStorage.setItem(CLICK_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('Failed to record click stats:', e);
    }
  },

  getStats(): ClickStats {
    try {
      const data = localStorage.getItem(CLICK_STATS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getHotTools(limit: number = 5): string[] {
    const stats = this.getStats();
    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([id]) => id);
  },

  getClickCount(toolId: string): number {
    return this.getStats()[toolId] || 0;
  }
};