import { useState, useCallback } from 'react';
import { storageService } from '../services/storageService';

// 用于订阅 localStorage 变化的简单事件系统
const listeners = new Set<() => void>();
const emitChange = () => listeners.forEach(l => l());

// 监听 localStorage 变化的辅助函数
function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// 监听 storage 事件（来自其他标签页）
window.addEventListener('storage', (e) => {
  if (e.key === 'river-nexus-user-data') {
    emitChange();
  }
});

export function useUserData() {
  const [, forceUpdate] = useState({});

  // 强制更新函数
  const rerender = useCallback(() => {
    forceUpdate({});
  }, []);

  const userData = storageService.getUserData();

  const toggleFavorite = useCallback((toolId: string) => {
    const result = storageService.toggleFavorite(toolId);
    emitChange();
    rerender();
    return result;
  }, [rerender]);

  const recordUsage = useCallback((toolId: string) => {
    storageService.recordUsage(toolId);
    emitChange();
    rerender();
  }, [rerender]);

  const isFavorite = useCallback((toolId: string) => {
    return userData.favorites.includes(toolId);
  }, [userData.favorites]);

  return {
    favorites: userData.favorites,
    recentlyUsed: userData.recentlyUsed,
    toggleFavorite,
    recordUsage,
    isFavorite
  };
}