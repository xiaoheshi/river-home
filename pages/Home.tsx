import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectShowcase } from '../components/home/ProjectShowcase';
import { SkillGrid } from '../components/home/SkillGrid';
import { ToolPreview } from '../components/home/ToolPreview';
import { ContactSection } from '../components/home/ContactSection';

export const Home: React.FC = () => {
  return (
    <main className="relative">
      <HeroSection />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <ProjectShowcase />
        <SkillGrid />
        <ToolPreview />
        <ContactSection />
      </motion.div>
    </main>
  );
};
