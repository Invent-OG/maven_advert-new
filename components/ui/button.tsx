"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ⭐ Keyframes for moving gradient (existing)
const movingGradient =
  "bg-[length:200%_200%] animate-[gradientMove_4s_ease_infinite]";

// ⭐ Keyframes for LAVA ANIMATION
const lavaAnimation =
  "animate-[lavaMove_6s_ease-in-out_infinite] bg-[length:200%_200%]";

// Add the keyframes globally (Tailwind-safe)
const globalStyles = `
@keyframes lavaMove {
  0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
  50% { background-position: 100% 50%; filter: hue-rotate(45deg); }
  100% { background-position: 0% 50%; filter: hue-rotate(0deg); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = globalStyles;
  document.head.appendChild(styleTag);
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
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

        // Existing orange animation
        orange: cn(
          "text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98]",
          "relative overflow-hidden rounded-full",

          // Orange gradient (kept same)
          "bg-gradient-to-r from-[#FFE6C7] via-[#FFB877] to-[#FF7A2A]",
          // ⭐ New Wave Animation
          "animate-[orangeWave_1s_ease-in-out_infinite]",

          "hover:brightness-110"
        ),

        // ⭐ NEW — LIQUID LAVA ANIMATION (PREMIUM MODERN STYLE)
        lava: cn(
          "text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.04] active:scale-[0.45]",
          "relative overflow-hidden",
          // Vibrant wavy organic gradient
          "bg-[radial-gradient(circle_at_30%_30%,#ff7a00,#ff5100,#d40000)]",
          lavaAnimation,
          "hover:brightness-110"
        ),
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

// Ripple
const ButtonRipple = () => (
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full group-hover:w-20 group-hover:h-20 group-hover:opacity-0 group-hover:scale-150 transition-all duration-700 ease-out transform -translate-x-1/2 -translate-y-1/2" />
  </span>
);

// Shine
const ButtonShine = () => (
  <span className="absolute top-0 left-0 w-10 h-full bg-white/20 skew-x-12 -translate-x-20 group-hover:translate-x-[calc(100%+32px)] transition-transform duration-700 ease-out" />
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
        {/* Shine effect for both orange & new lava animations */}
        {withShine && (variant === "orange" || variant === "lava") && (
          <ButtonShine />
        )}

        {/* Ripple effect */}
        {withRipple && (variant === "orange" || variant === "lava") && (
          <ButtonRipple />
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
