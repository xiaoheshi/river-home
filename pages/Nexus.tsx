import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolCard } from '../components/ToolCard';
import { EmptyState } from '../components/EmptyState';
import { TOOLS, CATEGORIES } from '../constants';
import { Tool, ToolCategory } from '../types';
import { performSmartSearch } from '../services/geminiService';

export const Nexus: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | '全部'>('全部');
  const [filteredTools, setFilteredTools] = useState<Tool[]>(TOOLS);
  const [isSearching, setIsSearching] = useState(false);

  const handleFilter = useCallback(async () => {
    setIsSearching(true);
    let results = TOOLS;

    if (selectedCategory !== '全部') {
      results = results.filter(t => t.category === selectedCategory);
    }

    if (searchQuery.trim().length > 0) {
      if (searchQuery.trim().length > 2) {
        try {
          const smartMatches = await performSmartSearch(searchQuery);
          if (smartMatches.length > 0) {
            results = results.filter(t => smartMatches.includes(t.id));
          } else {
            results = results.filter(t => 
              t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
              t.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
        } catch (error) {
          console.error("Smart search failed, falling back to local:", error);
           results = results.filter(t => 
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      } else {
        results = results.filter(t => 
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
    }

    setFilteredTools(results);
    setIsSearching(false);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilter();
    }, 400);
    return () => clearTimeout(timer);
  }, [handleFilter]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('全部');
  };

  const groupedTools = useMemo(() => {
    const groups: Record<string, Tool[]> = {};
    filteredTools.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, [filteredTools]);

  const displayCategories = useMemo(() => {
    if (selectedCategory !== '全部') return [selectedCategory];
    return CATEGORIES.filter(cat => groupedTools[cat] && groupedTools[cat].length > 0);
  }, [selectedCategory, groupedTools]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16 relative scan-line"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 backdrop-blur-md text-teal-400 font-mono text-[10px] font-medium tracking-[0.25em] uppercase mb-6 shadow-[0_0_10px_rgba(45,212,191,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
          Nexus Tool Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 animate-gradient">
            工具港
          </span>
        </h1>
        <p className="text-gray-400/80 max-w-xl mx-auto text-lg font-light leading-relaxed tracking-wide">
          我的数字效率工具集 · 汇聚灵感与生产力
        </p>
      </motion.header>

      <section className="sticky top-24 z-40 mb-16 flex flex-col items-center gap-6">
        <motion.div 
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass w-full max-w-2xl p-1.5 rounded-full shadow-2xl border border-white/10 transition-all duration-300 focus-within:border-teal-500/40 focus-within:shadow-[0_0_30px_-5px_rgba(45,212,191,0.3)] focus-within:ring-2 focus-within:ring-teal-500/20 relative overflow-hidden"
        >
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-teal-500/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="搜索工具、标签或描述..."
              className="w-full bg-transparent border-none rounded-full py-4 pl-14 pr-6 focus:outline-none text-base text-white placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        <motion.div 
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 p-1.5 glass rounded-full overflow-hidden max-w-full md:max-w-max"
        >
           <div className="flex gap-1 overflow-x-auto scrollbar-hide px-2 py-1">
            {['全部', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all whitespace-nowrap relative ${
                  selectedCategory === cat 
                  ? 'text-white' 
                  : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="activeCategoryNexus"
                    className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 rounded-full -z-10 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <main className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-6"
            >
              <div className="w-12 h-12 border-2 border-teal-500/20 border-t-teal-400 rounded-full animate-spin shadow-[0_0_20px_rgba(45,212,191,0.3)]" />
              <span className="font-mono text-teal-500/70 text-xs tracking-[0.2em] font-light uppercase animate-pulse-soft">
                Searching Nexus...
              </span>
            </motion.div>
          ) : filteredTools.length > 0 ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {displayCategories.map((category, catIndex) => (
                <section key={category} className="space-y-8">
                  <div className="flex items-end gap-6 mb-8 group">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-teal-500/60 tracking-[0.4em] uppercase mb-2 group-hover:text-teal-400 transition-colors">
                        0{catIndex + 1} // Zone
                      </span>
                      <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tighter text-white/90 uppercase group-hover:text-white transition-colors">
                        {category}
                      </h2>
                    </div>
                    <div className="flex-grow h-[1px] bg-gradient-to-r from-teal-500/30 via-white/10 to-transparent mb-2 shadow-[0_1px_0_rgba(45,212,191,0.1)]"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {groupedTools[category]?.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <ToolCard tool={tool} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-center py-12"
            >
              <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 text-center max-w-lg w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <EmptyState onReset={handleReset} query={searchQuery} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
