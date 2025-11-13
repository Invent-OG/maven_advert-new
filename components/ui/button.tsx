import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg transform hover:-translate-y-0.5",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md transform hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg transform hover:-translate-y-0.5",
        ghost:
          "hover:bg-accent hover:text-accent-foreground transform hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline",

        // ⭐ ENHANCED ORANGE VARIANT WITH GRADIENT & ANIMATIONS
        orange:
          "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] hover:bg-gradient-to-r hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-400 before:via-orange-500 before:to-orange-400 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Ripple effect component
const ButtonRipple = () => (
  <span className="absolute inset-0 overflow-hidden rounded-md">
    <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full group-hover:w-20 group-hover:h-20 group-hover:opacity-0 group-hover:scale-150 transition-all duration-700 ease-out transform -translate-x-1/2 -translate-y-1/2" />
  </span>
);

// Shine effect component
const ButtonShine = () => (
  <span className="absolute top-0 left-0 w-6 h-full bg-white/20 skew-x-12 -translate-x-16 group-hover:translate-x-[calc(100%+16px)] transition-transform duration-700 ease-out" />
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  withRipple?: boolean;
  withShine?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      withRipple = true,
      withShine = true,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Shine effect */}
        {withShine && variant === "orange" && <ButtonShine />}

        {/* Ripple effect */}
        {withRipple && variant === "orange" && <ButtonRipple />}

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };