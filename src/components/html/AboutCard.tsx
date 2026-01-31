import { Html } from '@react-three/drei';
import { PROFILE, SKILLS } from '../../constants';

export function AboutCard() {
  return (
    <Html position={[0, 0, 5]} center style={{ pointerEvents: 'auto' }}>
      <div className="w-[500px] p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
            <span className="text-4xl">&#x1F468;&#x200D;&#x1F4BB;</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{PROFILE.name}</h2>
          <p className="text-slate-400 mt-2">{PROFILE.tagline}</p>
        </div>

        <div className="space-y-4 mb-8">
          {SKILLS.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{skill.icon} {skill.name}</span>
                <span className="text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <a href={PROFILE.contact.github} target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="text-xl">&#x1F419;</span>
          </a>
          <a href={`mailto:${PROFILE.contact.email}`}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <span className="text-xl">&#x1F4E7;</span>
          </a>
        </div>
      </div>
    </Html>
  );
}
