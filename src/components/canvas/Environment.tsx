import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Environment() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#050816', 0.008);
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-20, 10, 10]} intensity={1} color="#00f5ff" distance={100} />
      <pointLight position={[20, -10, -20]} intensity={0.8} color="#a855f7" distance={100} />
    </>
  );
}
