import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 hover:bg-primary/90 transform transition-all duration-300",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-white shadow-lg hover:shadow-xl hover:scale-105 hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 transform transition-all duration-300",
        outline:
          "border-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 hover:bg-primary/10 hover:border-primary/40 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transform transition-all duration-300",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-105 hover:bg-secondary/80 transform transition-all duration-300",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:scale-105 transform transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105 transform transition-all duration-300",
      },
      size: {
        default: "h-10 px-6 py-3 has-[>svg]:px-4 rounded-lg",
        sm: "h-9 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 py-2",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 py-4 text-base",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      {/* Shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants }
