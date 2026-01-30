import { GlassCard } from "../ui/GlassCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SKILLS } from "../../constants";

const colorMap: Record<string, { bg: string; text: string; glow: "purple" | "blue" | "cyan" }> = {
  "产品设计": { bg: "from-purple-500/10 to-purple-500/5", text: "text-primary-purple", glow: "purple" },
  "前端开发": { bg: "from-blue-500/10 to-blue-500/5", text: "text-primary-blue", glow: "blue" },
  "后端开发": { bg: "from-cyan-500/10 to-cyan-500/5", text: "text-primary-cyan", glow: "cyan" },
  "AI 应用": { bg: "from-emerald-500/10 to-emerald-500/5", text: "text-emerald-500", glow: "cyan" },
};

export function SkillMatrix() {
  return (
    <section className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-primary-blue">✦</span> What I Do
        </h2>
        <p className="text-slate-500 mb-10">技术栈与能力矩阵</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, index) => {
          const colors = colorMap[skill.name] || colorMap["产品设计"];

          return (
            <ScrollReveal
              key={skill.name}
              delay={index * 0.1}
              animation="fadeUp"
            >
              <GlassCard
                className="p-6 h-full"
                glowColor={colors.glow}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl mb-4`}>
                  {skill.icon}
                </div>

                {/* Title */}
                <h3 className={`text-lg font-display font-bold mb-2 ${colors.text}`}>
                  {skill.name}
                </h3>

                {/* Skills List */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                  {skill.items.length > 4 && (
                    <span className="text-xs px-2 py-1 text-slate-400">
                      +{skill.items.length - 4}
                    </span>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
