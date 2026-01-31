import { PROJECTS } from '../../constants';
import { ProjectCard } from '../html/ProjectCard';
import { Html } from '@react-three/drei';

export function WorksRegion() {
  const radius = 15;
  const angleStep = Math.PI / 6;

  return (
    <group position={[50, 0, -20]}>
      <Html position={[0, 8, 0]} center>
        <h2 className="text-3xl font-bold text-white">作品集</h2>
      </Html>

      {PROJECTS.map((project, index) => {
        const angle = (index - (PROJECTS.length - 1) / 2) * angleStep;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + radius;
        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          />
        );
      })}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[12, 0.1, 8, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
