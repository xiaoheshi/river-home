import { useState, useCallback, MouseEvent } from "react";

interface TiltValues {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseTiltEffectOptions {
  max?: number;
  scale?: number;
  speed?: number;
}

export function useTiltEffect(options: UseTiltEffectOptions = {}) {
  const { max = 15, scale = 1.02, speed = 400 } = options;

  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      setTilt({ rotateX, rotateY, scale });
    },
    [max, scale]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: `transform ${speed}ms ease-out`,
  };

  return {
    tilt,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
