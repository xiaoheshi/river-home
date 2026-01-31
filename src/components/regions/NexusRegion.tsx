import { useMemo } from 'react';
import { TOOLS } from '../../constants';
import { ToolNode } from '../html/ToolNode';
import { Html } from '@react-three/drei';

export function NexusRegion() {
  const toolPositions = useMemo(() => {
    return TOOLS.map((tool, index) => {
      const angle = (index / TOOLS.length) * Math.PI * 2;
      const radius = 8 + (index % 3) * 3;
      const x = Math.cos(angle) * radius;
      const y = (Math.sin(index * 1.5) * 3);
      const z = Math.sin(angle) * radius;
      return { tool, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  return (
    <group position={[-50, 10, -30]}>
      <Html position={[0, 12, 0]} center>
        <h2 className="text-3xl font-bold text-white">工具港</h2>
      </Html>

      {toolPositions.map(({ tool, position }) => (
        <ToolNode key={tool.id} tool={tool} position={position} />
      ))}

      {toolPositions.slice(0, -1).map(({ position }, index) => {
        const nextPos = toolPositions[(index + 1) % toolPositions.length].position;
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...position, ...nextPos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#a855f7" transparent opacity={0.2} />
          </line>
        );
      })}
    </group>
  );
}
