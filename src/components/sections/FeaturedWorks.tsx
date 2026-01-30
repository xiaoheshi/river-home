import { Link } from "react-router-dom";
import { ArrowRight, Layers } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";
import { PROJECTS } from "../../constants";
import { getProjectImage } from "../../utils/imageMap";

export function FeaturedWorks() {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <section className="py-20">
      <ScrollReveal>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span className="text-primary-purple">✦</span> Featured Works
            </h2>
            <p className="text-slate-500 mt-2">精选项目作品</p>
          </div>
          <Link
            to="/works"
            className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            查看全部
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            delay={index * 0.15}
            animation="fadeUp"
          >
            <TiltCard className="group h-full">
              {/* Project Image */}
              <div
                className="w-full h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${getProjectImage(project.id)})` }}
              />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-4 w-4 text-primary-blue" />
                  <Badge
                    variant={project.status === "live" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {project.status === "live" ? "已上线" : "开发中"}
                  </Badge>
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                  {project.name}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
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

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <Link
                  to="/works"
                  className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors"
                >
                  查看详情 →
                </Link>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
