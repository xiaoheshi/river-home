import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, MapPin, MessageCircle, X } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientBlob } from "../components/ui/GradientBlob";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { ProgressBar } from "../components/ui/ProgressBar";
import { MagneticButton } from "../components/ui/MagneticButton";
import { AnimatedText } from "../components/ui/AnimatedText";
import { PROFILE, SKILLS } from "../constants";

export default function About() {
  const [showWechat, setShowWechat] = useState(false);

  const skillColors: Record<string, "purple" | "blue" | "cyan" | "gradient"> = {
    "产品设计": "purple",
    "前端开发": "blue",
    "后端开发": "cyan",
    "AI 应用": "gradient",
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GradientBlob color="purple" size="xl" className="top-20 -right-40 opacity-20" />
        <GradientBlob color="blue" size="lg" className="bottom-40 -left-20 opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center space-y-6">
            {/* Avatar */}
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-primary p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-gradient-primary">
                    {PROFILE.englishName.charAt(0)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-2">
                {PROFILE.name}
              </h1>
              <p className="text-lg text-slate-500 flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                {PROFILE.location}
              </p>
            </div>

            {/* Slogan */}
            <div className="text-2xl md:text-3xl font-display font-bold">
              <AnimatedText
                text="用技术实现设计，用 AI 放大创造力"
                className="text-gradient-primary"
                delay={0.3}
              />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <MagneticButton
                variant="secondary"
                href={PROFILE.contact.github}
                className="px-4 py-2"
              >
                <Github className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href={`mailto:${PROFILE.contact.email}`}
                className="px-4 py-2"
              >
                <Mail className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => setShowWechat(true)}
                className="px-4 py-2"
              >
                <MessageCircle className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal>
          <GlassCard className="p-8">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-primary-purple">✦</span> About Me
            </h2>
            <div className="space-y-4">
              {PROFILE.bio.map((paragraph, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal>
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span className="text-primary-blue">✦</span> Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 0.1}>
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-display font-bold text-slate-900">
                        {skill.name}
                      </h3>
                    </div>

                    <ProgressBar
                      value={skill.level}
                      color={skillColors[skill.name] || "gradient"}
                      className="mb-4"
                    />

                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal>
          <GlassCard className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              无论是项目合作、技术交流还是简单的问候，都欢迎随时联系我
            </p>
            <MagneticButton
              variant="secondary"
              href={`mailto:${PROFILE.contact.email}`}
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              Say Hello <Mail className="ml-2 h-4 w-4" />
            </MagneticButton>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* WeChat Modal */}
      <AnimatePresence>
        {showWechat && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWechat(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowWechat(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
              <MessageCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                微信联系
              </h3>
              <p className="text-slate-500 mb-4">扫描二维码添加微信</p>
              <div className="w-48 h-48 mx-auto bg-slate-100 rounded-lg flex items-center justify-center">
                <img
                  src="/wechat-qr.jpg"
                  alt="WeChat QR Code"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-slate-400 text-sm">QR Code</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                微信号: {PROFILE.contact.wechat}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
