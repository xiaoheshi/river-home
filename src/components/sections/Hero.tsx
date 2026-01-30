import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { GradientBlob } from "../ui/GradientBlob";
import { MagneticButton } from "../ui/MagneticButton";
import { AnimatedText } from "../ui/AnimatedText";
import { Badge } from "../ui/Badge";
import { PROFILE } from "../../constants";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Blobs */}
      <GradientBlob
        color="purple"
        size="xl"
        className="top-0 -left-40"
      />
      <GradientBlob
        color="cyan"
        size="lg"
        className="bottom-20 -right-20"
      />
      <GradientBlob
        color="blue"
        size="md"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for hire
          </Badge>
        </motion.div>

        {/* Main Slogan */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
          <AnimatedText
            text="用技术实现设计，"
            delay={0.3}
            className="block"
          />
          <AnimatedText
            text="用 AI 放大创造力"
            delay={0.6}
            className="block text-gradient-primary"
          />
        </h1>

        {/* Sub tagline */}
        <motion.p
          className="text-lg sm:text-xl text-slate-500 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {PROFILE.tagline}
        </motion.p>

        {/* Identity Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          {PROFILE.identities.slice(0, 3).map((identity, index) => (
            <motion.div
              key={identity.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm bg-white/50 backdrop-blur-sm"
              >
                <span className="mr-2">{identity.icon}</span>
                {identity.label}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <MagneticButton variant="primary" href="/works">
            查看作品 <ArrowRight className="ml-2 h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="secondary" href={PROFILE.contact.github}>
            <Github className="mr-2 h-4 w-4" /> GitHub
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
