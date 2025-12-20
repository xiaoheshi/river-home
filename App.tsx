
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Background } from './components/Background';
import { ToolCard } from './components/ToolCard';
import { FloatingChat } from './components/FloatingChat';
import { EmptyState } from './components/EmptyState';
import { AboutSection } from './components/AboutSection';
import { TOOLS, CATEGORIES } from './constants.tsx';
import { Tool, ToolCategory } from './types';
import { performSmartSearch } from './services/geminiService';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | '全部'>('全部');
  const [filteredTools, setFilteredTools] = useState<Tool[]>(TOOLS);
  const [isSearching, setIsSearching] = useState(false);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500], [0, 120]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const auroraY = useTransform(scrollY, [0, 1000], [0, -100]);

  const handleFilter = useCallback(async () => {
    setIsSearching(true);
    let results = TOOLS;

    if (selectedCategory !== '全部') {
      results = results.filter(t => t.category === selectedCategory);
    }

    if (searchQuery.trim().length > 2) {
      const smartMatches = await performSmartSearch(searchQuery);
      if (smartMatches.length > 0) {
        results = results.filter(t => smartMatches.includes(t.id));
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

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about-river-nexus');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="min-h-screen relative pb-24 pt-12 px-6 md:px-12 max-w-[1400px] mx-auto">
      <motion.div 
        style={{ y: auroraY }}
        className="aurora"
      />
      
      <Background />

      <nav className="fixed top-8 left-0 w-full z-50 px-6 md:px-12 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex justify-end">
          <motion.a 
            href="#about-river-nexus"
            onClick={scrollToAbout}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto px-6 py-2 rounded-full glass border border-white/5 font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 hover:text-teal-400 hover:border-teal-500/30 transition-all duration-300"
          >
            About River Nexus
          </motion.a>
        </div>
      </nav>
      
      <motion.header 
        style={{ y: headerY, opacity: headerOpacity }}
        className="py-20 md:py-28 flex flex-col items-center text-center will-change-transform"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-gray-400 font-mono text-[10px] font-medium tracking-[0.25em] uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
          River's Digital Watershed
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gradient mb-8 leading-[1.1]"
        >
          晓河的工具港
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400/70 max-w-xl mx-auto text-lg font-light leading-relaxed tracking-wide"
        >
          汇聚灵感与效率，让创意在数字流域中自由流淌
        </motion.p>
      </motion.header>

      <section className="sticky top-8 z-40 mb-20 flex flex-col items-center gap-6">
        <motion.div 
          layout
          className="glass w-full max-w-2xl p-1.5 rounded-full shadow-2xl border border-white/10 transition-all focus-within:ring-4 focus-within:ring-teal-500/10 focus-within:border-teal-500/30"
        >
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-teal-500/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="在流域中搜索..."
              className="w-full bg-transparent border-none rounded-full py-4 pl-14 pr-6 focus:outline-none text-base text-white placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div 
          layout
          className="flex items-center gap-2 p-1.5 glass rounded-full overflow-hidden max-w-full md:max-w-max"
        >
           <div className="flex gap-1 overflow-x-auto scrollbar-hide px-2">
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
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-teal-600 rounded-full -z-10 shadow-lg"
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
              <div className="w-10 h-10 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
              <span className="font-mono text-gray-500 text-xs tracking-extra font-light uppercase">Syncing Data...</span>
            </motion.div>
          ) : filteredTools.length > 0 ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {displayCategories.map((category, catIndex) => (
                <section key={category} className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-teal-500/60 tracking-[0.4em] uppercase mb-1">
                        0{catIndex + 1} // Segment
                      </span>
                      <h2 className="text-3xl font-bold tracking-tighter text-white/90 uppercase">
                        {category}
                      </h2>
                    </div>
                    <div className="flex-grow h-[1px] bg-gradient-to-r from-teal-500/20 via-white/5 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groupedTools[category]?.map(tool => (
                      <motion.div
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
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
            >
              <EmptyState onReset={handleReset} query={searchQuery} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AboutSection />

      <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-600 font-mono text-[10px] tracking-extra uppercase">
        <div className="flex gap-12">
          <a href="#about-river-nexus" onClick={scrollToAbout} className="hover:text-teal-400 transition-colors">Philosophy</a>
          <a href="#" className="hover:text-teal-400 transition-colors">River Systems</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Creative Hub</a>
        </div>
        <div className="font-semibold text-gray-700">
          POWERED BY RIVER // NEXUS v4.2
        </div>
      </footer>

      <FloatingChat />
    </div>
  );
};

export default App;
