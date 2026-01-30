import { BentoGrid } from "../components/ui/BentoGrid";
import { BentoCard } from "../components/ui/BentoCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { PROFILE, PROJECTS, SKILLS, TOOLS } from "../constants";
import { getProjectImage } from "../utils/imageMap";
import { MapPin, ArrowRight, Github, Mail, Layers, Wrench, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredProject = PROJECTS[0]; // Ecommica Deals
  const secondaryProject = PROJECTS[1]; // Bid Assistant
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
           <Badge variant="secondary" className="w-fit mb-2">
            Available for hire
          </Badge>
          <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="text-xl text-slate-500 max-w-lg font-sans">
            {PROFILE.tagline}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/works">View Works <ArrowRight className="ml-2 h-4 w-4"/></Link>
          </Button>
          <Button variant="outline" asChild>
             <a href={PROFILE.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          </Button>
        </div>
      </div>

      <BentoGrid className="md:auto-rows-[20rem]">
        {/* Hero / Bio */}
        <BentoCard
          title="About Me"
          description={PROFILE.bio[0] + " " + PROFILE.bio[1]}
          header={<div className="h-full w-full bg-slate-100 rounded-lg flex items-center justify-center text-4xl">👋</div>}
          className="md:col-span-2 md:row-span-1"
          href="/about"
          cta="Read full bio"
          icon={<Sparkles className="h-4 w-4 text-amber-500" />}
        />

        {/* Featured Project 1 */}
        <BentoCard
          title={featuredProject.name}
          description={featuredProject.description}
          header={
            <div 
              className="h-full w-full bg-cover bg-center rounded-lg min-h-[10rem]" 
              style={{ backgroundImage: `url(${getProjectImage(featuredProject.id)})` }}
            />
          }
          className="md:col-span-1"
          href="/works"
          icon={<Layers className="h-4 w-4 text-sky-500" />}
        />

        {/* Featured Project 2 */}
         <BentoCard
          title={secondaryProject.name}
          description={secondaryProject.description}
          header={
            <div 
              className="h-full w-full bg-cover bg-center rounded-lg min-h-[10rem]" 
              style={{ backgroundImage: `url(${getProjectImage(secondaryProject.id)})` }}
            />
          }
          className="md:col-span-1"
          href="/works"
          icon={<Layers className="h-4 w-4 text-teal-500" />}
        />

        {/* Skills Quick View */}
        <BentoCard
          title="Tech Stack"
          description="React, TypeScript, Tailwind, Node.js..."
          header={
            <div className="grid grid-cols-3 gap-2 p-4">
              {SKILLS.slice(0, 6).map(s => (
                <div key={s.name} className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded text-center">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-[10px] mt-1 text-slate-600">{s.name}</span>
                </div>
              ))}
            </div>
          }
          className="md:col-span-1"
          href="/about"
          icon={<Wrench className="h-4 w-4 text-slate-500" />}
        />

        {/* Nexus Link */}
        <BentoCard
          title="Nexus"
          description={`Explored ${TOOLS.length} tools and counting.`}
          header={<div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-4xl">{TOOLS.length}</div>}
          className="md:col-span-1"
          href="/nexus"
          cta="Explore Tools"
          icon={<Sparkles className="h-4 w-4 text-purple-500" />}
        />
        
        {/* Location / Contact */}
        <BentoCard
          title={PROFILE.location}
          description="Open to remote opportunities."
          header={<div className="h-full w-full bg-slate-200 rounded-lg flex items-center justify-center"><MapPin className="h-12 w-12 text-slate-400" /></div>}
          className="md:col-span-1"
          href="mailto:shixiaohe3112@163.com"
          cta="Contact Me"
          icon={<Mail className="h-4 w-4 text-red-500" />}
        />
      </BentoGrid>
    </div>
  );
}
