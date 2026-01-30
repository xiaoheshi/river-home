import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Sparkles, AlertCircle, ExternalLink } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { GradientBlob } from "../components/ui/GradientBlob";
import { Badge } from "../components/ui/Badge";
import { TOOLS, CATEGORIES } from "../constants";
import { performSmartSearch } from "../services/geminiService";
import { Tool, ToolCategory } from "../types";
import { cn } from "../utils/cn";

type FilterType = "全部" | ToolCategory;

export default function Nexus() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("全部");
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<Tool[] | null>(null);
  const [error, setError] = useState("");

  // Debounced AI search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        setError("");
        try {
          const ids = await performSmartSearch(query);
          const matchingTools = TOOLS.filter((t) => ids.includes(t.id));
          setAiResults(matchingTools);
        } catch (err) {
          console.error(err);
          setError("AI 搜索连接失败，已切换到本地搜索");
          setAiResults(null);
        } finally {
          setIsSearching(false);
        }
      } else {
        setAiResults(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter tools
  const filteredTools = useMemo(() => {
    let tools = aiResults || TOOLS;

    if (!aiResults && query) {
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter !== "全部") {
      tools = tools.filter((t) => t.category === filter);
    }

    return tools;
  }, [query, aiResults, filter]);

  const categoryLabels: Record<string, string> = {
    "全部": "全部",
    [ToolCategory.AI]: "AI",
    [ToolCategory.DEVELOPMENT]: "开发",
    [ToolCategory.CREATIVE]: "创意",
    [ToolCategory.PRODUCTIVITY]: "效率",
    [ToolCategory.UTILITIES]: "工具",
    [ToolCategory.PERSONAL]: "个人",
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob color="purple" size="xl" className="top-0 left-1/4 opacity-20" />
        <GradientBlob color="cyan" size="lg" className="bottom-20 right-1/4 opacity-20" />
      </div>

      <div className="space-y-10 animate-in fade-in duration-500">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-primary-purple" />
              Nexus · 工具港
            </h1>
            <p className="text-lg text-slate-500">
              AI 驱动的智能搜索，发现最适合你的工具
            </p>
          </div>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索工具，试试「前端开发」或「AI 绘图」..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 rounded-2xl",
                  "bg-white/80 backdrop-blur-sm",
                  "border-2 border-slate-200/50",
                  "focus:outline-none focus:border-primary-purple/50 focus:ring-4 focus:ring-primary-purple/10",
                  "shadow-lg shadow-slate-200/50",
                  "transition-all duration-300",
                  "text-slate-900 placeholder:text-slate-400"
                )}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-5 w-5 border-2 border-primary-purple border-t-transparent rounded-full" />
                </div>
              )}
            </div>
            {error && (
              <div className="mt-2 text-sm text-amber-600 flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.15}>
          <div className="flex justify-center gap-2 flex-wrap">
            {["全部", ...CATEGORIES].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category as FilterType)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filter === category
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white/80 text-slate-600 hover:bg-white border border-slate-200/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {categoryLabels[category] || category}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tools Grid */}
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <a href={tool.url} target="_blank" rel="noreferrer">
                    <GlassCard
                      className="p-5 h-full group cursor-pointer"
                      glowColor="blue"
                    >
                      {/* Icon & Category */}
                      <div className="flex items-start justify-between mb-3">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {tool.icon}
                        </motion.div>
                        <Badge variant="secondary" className="text-xs">
                          {categoryLabels[tool.category] || tool.category}
                        </Badge>
                      </div>

                      {/* Name */}
                      <h3 className="font-display font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {tool.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                        {tool.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
              没有找到匹配的工具
            </h3>
            <p className="text-slate-500">试试其他关键词或筛选条件</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
