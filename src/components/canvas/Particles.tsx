import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  spread?: number;
  performanceTier?: 'high' | 'medium' | 'low';
}

export function Particles({ count = 500, spread = 100, performanceTier = 'high' }: ParticlesProps) {
  const actualCount = performanceTier === 'low' ? Math.floor(count / 4) : performanceTier === 'medium' ? Math.floor(count / 2) : count;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const colors = new Float32Array(actualCount * 3);
    const colorOptions = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ec4899'),
    ];

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread - 20;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return [positions, colors];
  }, [actualCount, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={actualCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={actualCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}
