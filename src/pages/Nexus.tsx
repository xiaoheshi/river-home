import { useState, useEffect, useMemo } from "react";
import { BentoCard } from "../components/ui/BentoCard";
import { Badge } from "../components/ui/Badge";
import { TOOLS } from "../constants";
import { performSmartSearch } from "../services/geminiService";
import { Search, Sparkles, AlertCircle, Wrench } from "lucide-react";
import { Tool } from "../types";
import { cn } from "../utils/cn";

export default function Nexus() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<Tool[] | null>(null);
  const [error, setError] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        setError("");
        try {
          // AI Search
          const ids = await performSmartSearch(query);
          const matchingTools = TOOLS.filter(t => ids.includes(t.id));
          setAiResults(matchingTools);
        } catch (err) {
          console.error(err);
          setError("River Core connection failed. Falling back to local search.");
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

  // Local filter fallback
  const filteredTools = useMemo(() => {
    if (aiResults) return aiResults;
    if (!query) return TOOLS;
    return TOOLS.filter(t => 
      t.name.toLowerCase().includes(query.toLowerCase()) || 
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, aiResults]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-slate-900 flex items-center justify-center gap-2">
           <Sparkles className="h-6 w-6 text-purple-500" /> Nexus Toolset
        </h1>
        <p className="text-slate-500">
          AI-powered semantic search. Type "frontend tools" or "database" to explore.
        </p>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tools with AI..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white shadow-sm transition-all"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
        {error && (
            <div className="text-xs text-amber-600 flex items-center justify-center gap-1">
                <AlertCircle className="h-3 w-3" /> {error}
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <BentoCard
            key={tool.id}
            title={tool.name}
            description={tool.description}
            header={
               <div className="w-full h-24 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                 <Wrench className="h-8 w-8 text-slate-300" />
               </div>
            }
            icon={<Badge variant="secondary" className="text-[10px]">{tool.category}</Badge>}
            href={tool.url}
            className="md:col-span-1"
            cta="Visit"
          />
        ))}
      </div>
    </div>
  );
}
