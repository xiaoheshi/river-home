import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

function Connection({ start, end, color = '#00f5ff' }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 2, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(20);
  }, [start, end]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.5} />
    </line>
  );
}

export function Connections() {
  const connections: ConnectionProps[] = [
    { start: [0, 0, 0], end: [-8, 3, -5], color: '#00f5ff' },
    { start: [0, 0, 0], end: [7, -2, -8], color: '#a855f7' },
    { start: [-8, 3, -5], end: [10, 5, -10], color: '#3b82f6' },
    { start: [10, 5, -10], end: [45, -3, -25], color: '#3b82f6' },
    { start: [-8, 3, -5], end: [-45, 12, -25], color: '#a855f7' },
    { start: [0, 0, 0], end: [0, 40, -40], color: '#ec4899' },
  ];

  return (
    <group>
      {connections.map((props, index) => (
        <Connection key={index} {...props} />
      ))}
    </group>
  );
}
