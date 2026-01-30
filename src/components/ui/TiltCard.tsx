import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useTiltEffect } from "../../hooks/useTiltEffect";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltMax = 10,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const { style, handlers, tilt } = useTiltEffect({ max: tiltMax, scale });

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white border border-slate-200/50",
        "shadow-lg",
        className
      )}
      style={style}
      {...handlers}
    >
      {children}

      {/* Glare effect */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${50 + tilt.rotateY * 2}% ${50 - tilt.rotateX * 2}%,
              rgba(255,255,255,0.3) 0%,
              transparent 60%
            )`,
          }}
        />
      )}
    </motion.div>
  );
}
