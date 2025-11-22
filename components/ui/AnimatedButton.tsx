// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import type { ButtonHTMLAttributes, ReactNode } from "react";

// type AnimatedButtonProps = {
//   children: ReactNode;
//   onClick?: () => void;
//   type?: "button" | "submit" | "reset";
//   className?: string;
// } & ButtonHTMLAttributes<HTMLButtonElement>;

// export default function AnimatedButton({
//   children,
//   onClick,
//   type = "button",
//   className = "",
//   ...rest
// }: AnimatedButtonProps) {
//   const btnRef = useRef<HTMLButtonElement | null>(null);
//   const glow1Ref = useRef<HTMLSpanElement | null>(null);
//   const glow2Ref = useRef<HTMLSpanElement | null>(null);

//   useEffect(() => {
//     const btn = btnRef.current;
//     const glow1 = glow1Ref.current;
//     const glow2 = glow2Ref.current;

//     if (!btn || !glow1 || !glow2) return;

//     // Hide glows initially
//     gsap.set(glow1, { x: "-150%", opacity: 0 });
//     gsap.set(glow2, { x: "150%", opacity: 0 });

//     const handleEnter = () => {
//       gsap.to(btn, {
//         scale: 1.05,
//         duration: 0.3,
//         ease: "power2.out",
//       });

//       gsap.fromTo(
//         glow1,
//         { x: "-150%", opacity: 0 },
//         { x: "150%", opacity: 0.9, duration: 1.2, ease: "power2.out" }
//       );
//       gsap.fromTo(
//         glow2,
//         { x: "150%", opacity: 0 },
//         { x: "-150%", opacity: 0.9, duration: 1.2, ease: "power2.out" }
//       );
//     };

//     const handleLeave = () => {
//       gsap.to(btn, {
//         scale: 1,
//         duration: 0.3,
//         ease: "power2.inOut",
//       });

//       gsap.to(glow1, {
//         x: "-150%",
//         opacity: 0,
//         duration: 0.6,
//         ease: "power2.inOut",
//       });
//       gsap.to(glow2, {
//         x: "150%",
//         opacity: 0,
//         duration: 0.6,
//         ease: "power2.inOut",
//       });
//     };

//     btn.addEventListener("mouseenter", handleEnter);
//     btn.addEventListener("mouseleave", handleLeave);

//     return () => {
//       btn.removeEventListener("mouseenter", handleEnter);
//       btn.removeEventListener("mouseleave", handleLeave);
//     };
//   }, []);

//   return (
//     <button
//       ref={btnRef}
//       type={type}
//       onClick={onClick}
//       className={`
//         relative overflow-hidden z-10
//         px-6 py-2 rounded-lg font-medium text-white
//         bg-[#E84E1B]                                    /* 🔥 Main brand background */
//         border border-[#E84E1B]                        /* 🔥 Border same as logo */
//         shadow-[0px_0px_20px_6px_rgba(232,78,27,0.45)] /* 🔥 Orange glow shadow */
//         transition-transform duration-300 ease-in-out
//         ${className}
//       `}
//       {...rest}
//     >
//       {/* Glass Glow 1 */}
//       <span
//         ref={glow1Ref}
//         className="absolute top-0 left-0 w-2/3 h-full pointer-events-none"
//       >
//         <span
//           className="
//             absolute w-full h-full
//             bg-white/40 blur-md rounded-full   /* 🔥 Glass shine */
//           "
//         />
//       </span>

//       {/* Glass Glow 2 */}
//       <span
//         ref={glow2Ref}
//         className="absolute top-0 left-0 w-2/3 h-full pointer-events-none"
//       >
//         <span
//           className="
//             absolute w-full h-full
//             bg-white/40 blur-md rounded-full   /* 🔥 Second glass shine */
//           "
//         />
//       </span>

//       {/* Button text */}
//       <span className="relative z-10">{children}</span>
//     </button>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type GlassButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function LiquidGlassButton({
  children,
  className = "",
  ...rest
}: GlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const shine = shineRef.current;

    if (!btn || !shine) return;

    gsap.set(shine, { x: "-150%", opacity: 0 });

    const enter = () => {
      gsap.to(btn, {
        scale: 1.04,
        duration: 0.25,
        ease: "power3.out",
      });

      gsap.to(shine, {
        x: "180%",
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
      });
    };

    const leave = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.25,
        ease: "power3.inOut",
      });

      gsap.to(shine, {
        x: "-150%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className={`
        relative overflow-hidden
        px-7 py-3 rounded-full
        font-medium text-white
        
        /* 💧 Liquid glass core */
        bg-gradient-to-b from-[#1b1b1b] to-[#0f0f0f]
        backdrop-blur-xl

        /* Inner liquid glow + outer bloom */
        shadow-[inset_0_2px_8px_rgba(255,255,255,0.18),
                inset_0_-2px_6px_rgba(0,0,0,0.6),
                0_4px_18px_rgba(0,0,0,0.45)]

        transition-all duration-300
        ${className}
      `}
      {...rest}
    >
      {/* Top glossy reflection */}
      <div
        className="absolute inset-x-2 top-0 h-1/2 rounded-full
        bg-white/8 blur-md pointer-events-none"
      />

      {/* Shine pass */}
      <div
        ref={shineRef}
        className="
          absolute top-0 left-0 w-1/2 h-full
          bg-white/20 blur-xl rounded-full
          pointer-events-none
        "
      />

      <span className="relative z-10 drop-shadow-sm">{children}</span>
    </button>
  );
}
