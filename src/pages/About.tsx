import React from "react";
import { BentoGrid } from "../components/ui/BentoGrid";
import { BentoCard } from "../components/ui/BentoCard";
import { Badge } from "../components/ui/Badge";
import { PROFILE, SKILLS } from "../constants";
import { Mail, Github, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-slate-100 border border-slate-200 text-4xl overflow-hidden">
           {/* Placeholder Avatar or Initials */}
           <span className="font-display font-bold text-slate-400">RH</span>
        </div>
        <h1 className="text-4xl font-display font-bold text-slate-900">About {PROFILE.name}</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          {PROFILE.tagline}
        </p>
        <div className="flex justify-center gap-4 text-slate-400">
           <a href={PROFILE.contact.github} className="hover:text-slate-900 transition-colors"><Github className="h-5 w-5"/></a>
           <a href={`mailto:${PROFILE.contact.email}`} className="hover:text-slate-900 transition-colors"><Mail className="h-5 w-5"/></a>
        </div>
      </div>

      {/* Bio */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold font-display text-slate-900">My Journey</h2>
        {PROFILE.bio.map((paragraph, i) => (
          <p key={i} className="text-lg text-slate-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-display text-slate-900">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
             <h3 className="font-semibold text-slate-800">Languages & Core</h3>
             <div className="flex flex-wrap gap-2">
               {SKILLS.slice(0, 5).map(s => (
                 <Badge key={s.name} variant="secondary" className="px-3 py-1 text-sm">{s.icon} {s.name}</Badge>
               ))}
             </div>
           </div>
           
           <div className="space-y-4">
             <h3 className="font-semibold text-slate-800">Frameworks & Tools</h3>
             <div className="flex flex-wrap gap-2">
               {SKILLS.slice(5).map(s => (
                 <Badge key={s.name} variant="outline" className="px-3 py-1 text-sm">{s.icon} {s.name}</Badge>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="rounded-2xl bg-slate-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold font-display mb-4">Let's Work Together</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <a 
          href={`mailto:${PROFILE.contact.email}`}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
        >
          Say Hello <Mail className="ml-2 h-4 w-4"/>
        </a>
      </div>
    </div>
  );
}
