import { useState } from "react";
import { BentoCard } from "../components/ui/BentoCard";
import { Button } from "../components/ui/Button";
import { PROJECTS } from "../constants";
import { getProjectImage } from "../utils/imageMap";
import { Layers, Globe, Code } from "lucide-react";

type FilterType = "全部" | "已上线" | "开发中";

export default function Works() {
  const [filter, setFilter] = useState<FilterType>("全部");

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === "全部") return true;
    if (filter === "已上线") return project.status === "live";
    if (filter === "开发中") return project.status === "development";
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-display font-bold text-slate-900">Works</h1>
           <p className="text-slate-500">Selected projects and experiments.</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {(["全部", "已上线", "开发中"] as FilterType[]).map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "ghost"}
              onClick={() => setFilter(item)}
              size="sm"
              className="rounded-full"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <BentoCard
            key={project.id}
            title={project.name}
            description={project.description}
            header={
              <div 
                className="w-full h-48 bg-cover bg-center rounded-lg mb-2 border border-slate-100"
                style={{ backgroundImage: `url(${getProjectImage(project.id)})` }}
              />
            }
            icon={project.status === 'live' ? <Globe className="h-4 w-4 text-emerald-500" /> : <Code className="h-4 w-4 text-amber-500" />}
            href={project.url}
            cta="View Project"
            className="col-span-1"
          />
        ))}
      </div>
    </div>
  );
}
