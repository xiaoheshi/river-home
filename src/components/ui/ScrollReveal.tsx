import { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "fade";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function ScrollReveal({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={animations[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
