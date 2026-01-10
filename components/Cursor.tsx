import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0));
    };

    if (isTouchDevice()) return;

    setIsVisible(true);
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[data-cursor="pointer"]') !== null;
      
      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body, a, button, input, textarea {
          cursor: none !important;
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="bg-white rounded-full"
          style={{
            width: isHovering ? '0px' : '8px',
            height: isHovering ? '0px' : '8px',
            transition: 'width 0.2s, height 0.2s',
            opacity: 0.9,
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className={`rounded-full border transition-all duration-300 ease-out flex items-center justify-center backdrop-blur-[1px] ${
            isHovering ? 'bg-opacity-10' : 'bg-transparent'
          }`}
          style={{
            width: isHovering ? '60px' : '40px',
            height: isHovering ? '60px' : '40px',
            borderColor: isHovering ? 'rgba(45, 212, 191, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            backgroundColor: isHovering ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
            borderWidth: isHovering ? '2px' : '1px',
            boxShadow: isHovering ? '0 0 20px rgba(20, 184, 166, 0.4)' : 'none',
          }}
        />
      </motion.div>
    </>
  );
};
