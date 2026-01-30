import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { GradientBlob } from "../ui/GradientBlob";
import { ScrollReveal } from "../ui/ScrollReveal";
import { MagneticButton } from "../ui/MagneticButton";
import { TOOLS, PROFILE } from "../../constants";

export function ContactCTA() {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nexus Preview */}
        <ScrollReveal animation="fadeRight">
          <GlassCard className="relative p-8 h-full overflow-hidden" glowColor="purple">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-50">
              <GradientBlob color="purple" size="md" className="top-0 right-0" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary-purple" />
                <h3 className="text-xl font-display font-bold text-slate-900">
                  Nexus · 工具港
                </h3>
              </div>

              <p className="text-slate-500 mb-6">
                已收录 {TOOLS.length}+ 精选工具，涵盖 AI、开发、设计、效率等领域
              </p>

              {/* Tool icons preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {TOOLS.slice(0, 6).map((tool) => (
                  <motion.div
                    key={tool.id}
                    className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {tool.icon}
                  </motion.div>
                ))}
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                  +{TOOLS.length - 6}
                </div>
              </div>

              <Link
                to="/nexus"
                className="inline-flex items-center gap-2 text-primary-purple font-medium hover:gap-3 transition-all"
              >
                探索工具 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal animation="fadeLeft">
          <GlassCard className="relative p-8 h-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800" glowColor="cyan">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
              <GradientBlob color="cyan" size="md" className="bottom-0 left-0" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-primary-cyan" />
                <h3 className="text-xl font-display font-bold text-white">
                  Let's Connect
                </h3>
              </div>

              <p className="text-slate-300 mb-6">
                开放远程合作机会，无论是项目合作还是技术交流，都欢迎联系
              </p>

              <div className="flex items-center gap-2 text-slate-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm">Currently available</span>
              </div>

              <MagneticButton
                variant="secondary"
                href={`mailto:${PROFILE.contact.email}`}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                联系我 <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
