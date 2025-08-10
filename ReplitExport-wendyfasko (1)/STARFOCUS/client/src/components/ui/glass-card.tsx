import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'highlight';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card rounded-xl",
          {
            'hover:bg-white/10 transition-all cursor-pointer': variant === 'interactive',
            'border-neon-blue/50 bg-neon-blue/10': variant === 'highlight'
          },
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
