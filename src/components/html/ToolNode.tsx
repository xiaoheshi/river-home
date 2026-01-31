import { Html } from '@react-three/drei';
import { useState } from 'react';
import { Tool } from '../../types';

interface ToolNodeProps {
  tool: Tool;
  position: [number, number, number];
}

export function ToolNode({ tool, position }: ToolNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhysicalMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <Html position={[0, 1.2, 0]} center style={{ pointerEvents: isHovered ? 'auto' : 'none' }}>
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="px-4 py-3 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 text-center min-w-[150px]">
            <div className="text-2xl mb-1">{tool.icon}</div>
            <div className="text-white font-medium">{tool.name}</div>
            <div className="text-xs text-slate-400 mt-1">{tool.category}</div>
          </div>
        </div>
      </Html>
    </group>
  );
}
