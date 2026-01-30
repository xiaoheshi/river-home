import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Globe, Code, ArrowUpRight } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { Badge } from "../components/ui/Badge";
import { GradientBlob } from "../components/ui/GradientBlob";
import { PROJECTS } from "../constants";
import { getProjectImage } from "../utils/imageMap";

type FilterType = "全部" | "已上线" | "开发中";

const filters: FilterType[] = ["全部", "已上线", "开发中"];

export default function Works() {
  const [filter, setFilter] = useState<FilterType>("全部");

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === "全部") return true;
    if (filter === "已上线") return project.status === "live";
    if (filter === "开发中") return project.status === "development";
    return true;
  });

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob color="purple" size="xl" className="top-20 -left-40 opacity-20" />
        <GradientBlob color="cyan" size="lg" className="bottom-40 -right-20 opacity-20" />
      </div>

      <div className="space-y-10 animate-in fade-in duration-500">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Works
            </h1>
            <p className="text-lg text-slate-500">
              探索我的项目作品集，从产品设计到全栈开发
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2">
            {filters.map((item) => (
              <motion.button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === item
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TiltCard className="group h-full">
                    {/* Image */}
                    <div
                      className="w-full h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${getProjectImage(project.id)})` }}
                    >
                      {/* Status Badge */}
                      <div className="p-4">
                        <Badge
                          variant={project.status === "live" ? "default" : "secondary"}
                          className="backdrop-blur-sm"
                        >
                          {project.status === "live" ? (
                            <>
                              <Globe className="h-3 w-3 mr-1" /> 已上线
                            </>
                          ) : (
                            <>
                              <Code className="h-3 w-3 mr-1" /> 开发中
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <span>{project.icon}</span>
                        {project.name}
                      </h3>

                      <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Roles */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.roles.map((role) => (
                          <span
                            key={role}
                            className="text-xs px-2 py-1 bg-primary-purple/10 text-primary-purple rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Link */}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <ArrowUpRight className="h-5 w-5 text-slate-900" />
                      </a>
                    )}
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
