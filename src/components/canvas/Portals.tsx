import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import type { Region } from '../../stores/navigationStore';

interface PortalProps {
  targetRegion: Region;
  position: [number, number, number];
  label: string;
}

function Portal({ targetRegion, position, label }: PortalProps) {
  const navigate = useNavigate();
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    const scale = isHovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  const handleClick = () => {
    const paths: Record<Region, string> = { home: '/', works: '/works', nexus: '/nexus', about: '/about' };
    navigate(paths[targetRegion]);
  };

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={handleClick} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
        <torusGeometry args={[1, 0.3, 8, 32]} />
        <meshPhysicalMaterial
          color={isHovered ? '#00f5ff' : '#a855f7'}
          emissive={isHovered ? '#00f5ff' : '#a855f7'}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Html position={[0, 2, 0]} center>
        <div className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all ${isHovered ? 'bg-cyan-500/80 text-white' : 'bg-white/10 text-white/60'}`}>
          {label}
        </div>
      </Html>
    </group>
  );
}

export function Portals() {
  return (
    <group>
      <Portal targetRegion="works" position={[15, 0, -5]} label="Works →" />
      <Portal targetRegion="nexus" position={[-15, 5, -5]} label="← Nexus" />
      <Portal targetRegion="about" position={[0, 15, -10]} label="↑ About" />
      <Portal targetRegion="home" position={[35, 0, -15]} label="← Home" />
      <Portal targetRegion="home" position={[-35, 10, -25]} label="Home →" />
      <Portal targetRegion="home" position={[0, 25, -35]} label="↓ Home" />
    </group>
  );
}
