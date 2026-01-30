import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface GradientBlobProps {
  className?: string;
  color?: "purple" | "blue" | "cyan" | "mixed";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: "sm" | "md" | "lg";
}

const colorMap = {
  purple: "bg-primary-purple",
  blue: "bg-primary-blue",
  cyan: "bg-primary-cyan",
  mixed: "bg-gradient-primary",
};

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[500px] h-[500px]",
};

const blurMap = {
  sm: "blur-2xl",
  md: "blur-3xl",
  lg: "blur-[100px]",
};

export function GradientBlob({
  className,
  color = "mixed",
  size = "lg",
  blur = "lg",
}: GradientBlobProps) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full opacity-30 pointer-events-none",
        colorMap[color],
        sizeMap[size],
        blurMap[blur],
        className
      )}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
