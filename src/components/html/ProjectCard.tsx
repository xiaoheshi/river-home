import { Html } from '@react-three/drei';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function ProjectCard({ project, position, rotation = [0, 0, 0] }: ProjectCardProps) {
  return (
    <Html position={position} rotation={rotation} transform occlude style={{ pointerEvents: 'auto' }}>
      <div className="w-72 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
        <div className="w-full h-40 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4 flex items-center justify-center">
          <span className="text-4xl">{project.icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">{tech}</span>
          ))}
        </div>
      </div>
    </Html>
  );
}
