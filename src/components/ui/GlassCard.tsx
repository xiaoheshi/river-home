import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "purple" | "blue" | "cyan" | "none";
}

const glowColorMap = {
  purple: "hover:shadow-primary-purple/20",
  blue: "hover:shadow-primary-blue/20",
  cyan: "hover:shadow-primary-cyan/20",
  none: "",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverEffect = true, glowColor = "purple", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl bg-white/80 backdrop-blur-sm",
          "border border-slate-200/50",
          "shadow-sm",
          hoverEffect && [
            "transition-all duration-300",
            "hover:shadow-xl hover:-translate-y-1",
            glowColorMap[glowColor],
          ],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
