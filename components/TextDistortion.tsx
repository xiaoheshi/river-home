import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, MotionValue } from 'framer-motion';

interface TextDistortionProps {
  text: string;
  className?: string;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export const TextDistortion: React.FC<TextDistortionProps> = ({ 
  text, 
  className = "",
  mouseX,
  mouseY
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [charPositions, setCharPositions] = useState<{x: number, y: number}[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const updateCharPositions = useCallback(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('[data-char]');
    const positions: {x: number, y: number}[] = [];
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      positions.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    });
    setCharPositions(positions);
  }, []);

  useEffect(() => {
    updateCharPositions();
    const timer = setTimeout(updateCharPositions, 200);
    window.addEventListener('resize', updateCharPositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCharPositions);
    };
  }, [updateCharPositions, text]);

  useEffect(() => {
    if (mouseX && mouseY) {
      const unsubX = mouseX.on('change', (x) => setMousePos(prev => ({ ...prev, x })));
      const unsubY = mouseY.on('change', (y) => setMousePos(prev => ({ ...prev, y })));
      return () => { unsubX(); unsubY(); };
    } else {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const getCharStyle = (index: number) => {
    if (!charPositions[index]) return { y: 0, scale: 1 };
    
    const pos = charPositions[index];
    const distance = Math.sqrt(
      Math.pow(mousePos.x - pos.x, 2) + 
      Math.pow(mousePos.y - pos.y, 2)
    );
    
    const maxDistance = 180;
    const influence = Math.max(0, 1 - distance / maxDistance);
    
    return {
      y: influence * -18,
      scale: 1 + influence * 0.2,
    };
  };

  return (
    <span 
      ref={containerRef}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {text.split('').map((char, i) => {
        const { y, scale } = getCharStyle(i);
        return (
          <CharWithSpring 
            key={i} 
            char={char} 
            targetY={y} 
            targetScale={scale}
          />
        );
      })}
    </span>
  );
};

interface CharWithSpringProps {
  char: string;
  targetY: number;
  targetScale: number;
}

const CharWithSpring: React.FC<CharWithSpringProps> = ({ char, targetY, targetScale }) => {
  const springY = useSpring(targetY, { stiffness: 300, damping: 25 });
  const springScale = useSpring(targetScale, { stiffness: 300, damping: 25 });

  useEffect(() => {
    springY.set(targetY);
    springScale.set(targetScale);
  }, [targetY, targetScale, springY, springScale]);

  return (
    <motion.span
      data-char
      className="slogan-char"
      style={{
        y: springY,
        scale: springScale,
        display: 'inline-block',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
