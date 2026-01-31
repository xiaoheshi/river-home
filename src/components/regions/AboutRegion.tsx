import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AboutCard } from '../html/AboutCard';

export function AboutRegion() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 40, -40]}>
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[15, 0.2, 8, 64]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[12, 0.15, 8, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>

      <mesh>
        <octahedronGeometry args={[3, 0]} />
        <meshPhysicalMaterial
          color="#ec4899"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>

      <AboutCard />
    </group>
  );
}
