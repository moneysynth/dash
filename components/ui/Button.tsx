import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed active:scale-95";
    
    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 dark:bg-primary dark:text-slate-900 dark:hover:bg-primary/80 dark:hover:shadow-primary/20 active:bg-primary/95 active:shadow-md active:translate-y-0",
      secondary:
        "bg-secondary text-white hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5 dark:bg-secondary dark:text-slate-900 dark:hover:bg-secondary/80 dark:hover:shadow-secondary/20 active:bg-secondary/95 active:shadow-md active:translate-y-0",
      outline:
        "border-2 border-border bg-transparent hover:bg-surface hover:border-primary hover:shadow-md hover:-translate-y-0.5 text-text-primary dark:text-text-primary active:bg-surface/80 active:border-primary/80 active:shadow-sm active:translate-y-0",
      ghost:
        "hover:bg-surface hover:shadow-sm hover:-translate-y-0.5 text-text-primary dark:text-text-primary active:bg-surface/80 active:translate-y-0",
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-12 px-8 text-lg",
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

