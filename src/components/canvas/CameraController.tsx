import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useNavigationStore, REGION_COORDS } from '../../stores/navigationStore';
import * as THREE from 'three';

export function CameraController() {
  const { camera } = useThree();
  const currentRegion = useNavigationStore((s) => s.currentRegion);
  const setTransitioning = useNavigationStore((s) => s.setTransitioning);

  const targetPosition = useRef(new THREE.Vector3(0, 0, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const coords = REGION_COORDS[currentRegion];
    targetPosition.current.set(...coords.position);
    targetLookAt.current.set(...coords.lookAt);
    setTransitioning(true);
  }, [currentRegion, setTransitioning]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPosition.current, delta * 2);
    currentLookAt.current.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt.current);

    const positionReached = camera.position.distanceTo(targetPosition.current) < 0.1;
    const lookAtReached = currentLookAt.current.distanceTo(targetLookAt.current) < 0.1;

    if (positionReached && lookAtReached) {
      setTransitioning(false);
    }
  });

  return null;
}
