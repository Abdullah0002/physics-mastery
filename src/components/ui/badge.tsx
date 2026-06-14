import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Physics difficulty badges
        easy: "border-easy/30 bg-easy/10 text-easy",
        medium: "border-medium/30 bg-medium/10 text-[#b45309] dark:text-medium",
        hard: "border-hard/30 bg-hard/10 text-hard",
        advanced: "border-advanced/30 bg-advanced/10 text-advanced",
        // Exam badges
        "jee-main": "border-jee-main/30 bg-jee-main/10 text-jee-main",
        "jee-advanced": "border-jee-advanced/30 bg-jee-advanced/10 text-jee-advanced",
        neet: "border-neet/30 bg-neet/10 text-neet",
        // New badge
        new: "border-transparent bg-gradient-to-r from-brand-500 to-violet-500 text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
