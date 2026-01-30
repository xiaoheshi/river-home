import React, { ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "./Button";

export interface BentoCardProps {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  href?: string;
  cta?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  cta,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-sm border border-slate-200 bg-white p-4 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-slate-800 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-slate-500 text-xs">
          {description}
        </div>
        {href && (
           <div className="mt-4">
             <Button variant="ghost" size="sm" asChild className="pointer-events-auto pl-0 hover:pl-2 transition-all">
               <a href={href}>
                 {cta || "View Project"}
                 <ArrowRightIcon className="ml-2 h-4 w-4" />
               </a>
             </Button>
           </div>
        )}
      </div>
    </div>
  );
};
