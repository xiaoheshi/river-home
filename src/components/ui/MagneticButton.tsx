import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

const variantStyles = {
  primary: "bg-gradient-primary text-white shadow-lg hover:shadow-xl",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

export function MagneticButton({
  children,
  className,
  strength = 30,
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = ((e.clientX - centerX) / rect.width) * strength;
    const y = ((e.clientY - centerY) / rect.height) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium",
        "transition-colors duration-200",
        variantStyles[variant],
        className
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
