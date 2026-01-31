import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HeroContent } from '../html/HeroContent';

export function HomeRegion() {
  const mainGeoRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mainGeoRef.current) {
      mainGeoRef.current.rotation.x += 0.002;
      mainGeoRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 主视觉几何体 - wireframe */}
      <mesh ref={mainGeoRef}>
        <icosahedronGeometry args={[4, 1]} />
        <meshPhysicalMaterial
          color="#00f5ff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          thickness={1}
          wireframe
        />
      </mesh>

      {/* 内层实心几何体 */}
      <mesh>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.8}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* HTML 内容 */}
      <HeroContent />
    </group>
  );
}
