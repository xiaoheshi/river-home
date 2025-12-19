
import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 2000], [0, -200]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 1.5 + 0.5;
        // 模拟河流流向：主要从左向右移动
        this.speedX = Math.random() * 0.8 + 0.2;
        this.speedY = (Math.random() - 0.5) * 0.3;
        
        const blueHue = Math.floor(Math.random() * 40) + 180; // 180-220 hue
        this.color = `hsla(${blueHue}, 70%, 50%, ${Math.random() * 0.15 + 0.05})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > (canvas?.width || window.innerWidth)) this.x = -10;
        if (this.x < -10) this.x = canvas?.width || window.innerWidth;
        if (this.y > (canvas?.height || window.innerHeight)) this.y = -10;
        if (this.y < -10) this.y = canvas?.height || window.innerHeight;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas 
      ref={canvasRef} 
      style={{ y: yOffset }}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};
