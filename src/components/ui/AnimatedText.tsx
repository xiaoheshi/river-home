import { motion, Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  animation?: "fadeUp" | "fadeIn" | "typewriter";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  typewriter: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
  },
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerChildren = 0.03,
  animation = "fadeUp",
  as: Tag = "p",
}: AnimatedTextProps) {
  const letters = text.split("");

  return (
    <motion.div
      className={cn("inline-block", className)}
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants[animation]}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
