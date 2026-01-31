import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: 'icosahedron' | 'octahedron' | 'dodecahedron';
  size?: number;
  color?: string;
  speed?: number;
}

export function FloatingGeometry({
  position,
  geometry,
  size = 1,
  color = '#00f5ff',
  speed = 1,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.005 * speed;
    meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.5;
  });

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'icosahedron': return <icosahedronGeometry args={[size, 0]} />;
      case 'octahedron': return <octahedronGeometry args={[size, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[size, 0]} />;
    }
  }, [geometry, size]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometryComponent}
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.8}
        transmission={0.5}
        thickness={0.5}
      />
    </mesh>
  );
}

export function Geometries() {
  const geometries: FloatingGeometryProps[] = [
    { position: [0, 0, 0], geometry: 'icosahedron', size: 3, color: '#00f5ff' },
    { position: [-8, 3, -5], geometry: 'octahedron', size: 1.5, color: '#a855f7' },
    { position: [7, -2, -8], geometry: 'dodecahedron', size: 1.2, color: '#3b82f6' },
    { position: [-5, -4, -3], geometry: 'icosahedron', size: 0.8, color: '#ec4899' },
    { position: [10, 5, -10], geometry: 'octahedron', size: 1, color: '#00f5ff' },
    { position: [50, 2, -20], geometry: 'icosahedron', size: 2, color: '#3b82f6' },
    { position: [45, -3, -25], geometry: 'dodecahedron', size: 1.5, color: '#a855f7' },
    { position: [55, 4, -15], geometry: 'octahedron', size: 1, color: '#00f5ff' },
    { position: [-50, 10, -30], geometry: 'dodecahedron', size: 2.5, color: '#a855f7' },
    { position: [-55, 8, -35], geometry: 'icosahedron', size: 1.2, color: '#ec4899' },
    { position: [-45, 12, -25], geometry: 'octahedron', size: 1.5, color: '#3b82f6' },
    { position: [0, 40, -40], geometry: 'octahedron', size: 2, color: '#ec4899' },
    { position: [-6, 38, -45], geometry: 'icosahedron', size: 1.3, color: '#00f5ff' },
    { position: [5, 42, -35], geometry: 'dodecahedron', size: 1, color: '#a855f7' },
  ];

  return (
    <group>
      {geometries.map((props, index) => (
        <FloatingGeometry key={index} {...props} speed={0.5 + Math.random() * 0.5} />
      ))}
    </group>
  );
}
