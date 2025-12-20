// 声明全局 umami 对象
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

export const analyticsService = {
  // 追踪工具点击
  trackToolClick(toolId: string, toolName: string, category: string): void {
    // 优先使用 Umami（如果存在）
    if (window.umami) {
      window.umami.track('tool_click', {
        tool_id: toolId,
        tool_name: toolName,
        category: category
      });
    }

    // 本地记录（用于显示热门工具）
    import('./storageService').then(({ statsService }) => {
      statsService.recordClick(toolId);
    });
  },

  // 追踪搜索
  trackSearch(query: string, resultsCount: number): void {
    if (query.length >= 2) {
      window.umami?.track('search', {
        query: query.substring(0, 50), // 限制长度
        results_count: resultsCount
      });
    }
  },

  // 追踪分类切换
  trackCategorySwitch(category: string): void {
    window.umami?.track('category_switch', { category });
  },

  // 追踪 AI 聊天使用
  trackChatInteraction(type: 'send' | 'receive'): void {
    window.umami?.track('chat_interaction', { type });
  },

  // 追踪收藏操作
  trackFavoriteAction(toolId: string, action: 'add' | 'remove'): void {
    window.umami?.track('favorite_action', {
      tool_id: toolId,
      action: action
    });
  },

  // 追踪页面访问
  trackPageView(path: string): void {
    window.umami?.track('page_view', { path });
  }
};