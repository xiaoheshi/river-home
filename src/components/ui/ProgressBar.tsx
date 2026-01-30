import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../utils/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  color?: "purple" | "blue" | "cyan" | "gradient";
  className?: string;
}

const colorMap = {
  purple: "bg-primary-purple",
  blue: "bg-primary-blue",
  cyan: "bg-primary-cyan",
  gradient: "bg-gradient-primary",
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  color = "gradient",
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 1000;
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        setDisplayValue(Math.round(value * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showValue && <span className="text-slate-500">{displayValue}%</span>}
        </div>
      )}

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", colorMap[color])}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
