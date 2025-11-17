// "use client";

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// export default function Hero3D() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const bgRef = useRef<HTMLDivElement | null>(null);
//   const fgRef = useRef<HTMLDivElement | null>(null);
//   const textRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const bg = bgRef.current;
//     const fg = fgRef.current;
//     const text = textRef.current;
//     if (!section || !bg || !fg || !text) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "bottom+=60% top",
//         scrub: 0.5,
//         pin: true,
//         anticipatePin: 1,
//       },
//     });

//     tl.to(bg, { yPercent: -20, ease: "power1.inOut" }, 0)
//       .to(fg, { yPercent: -20, scale: 0.9, ease: "power1.inOut" }, 0)
//       .to(text, { yPercent: -20, ease: "power1.inOut" }, 0);

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="relative h-[100vh] md:h-[200vh] w-full overflow-hidden bg-[#020D13] text-white"
//       >
//         {/* --- Background --- */}
//         <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
//           <Image
//             src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/6871489b268d768c6ebf7e35_01-BG-min-p-1080.jpg"
//             alt="Background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         {/* --- Text Layer --- */}
//         <div
//           ref={textRef}
//           className="absolute top-[25vh] left-0 right-0 z-10 flex flex-col items-center text-center will-change-transform px-4 md:px-0"
//         >
//           <h1 className="text-[18vw] sm:text-[10vw] md:text-[12vw] font-extrabold uppercase leading-[0.9em] text-white">
//             How We
//           </h1>
//           <h1 className="text-[18vw] sm:text-[13vw] md:text-[12vw] font-extrabold uppercase text-white leading-[0.9em]">
//             Do Gen Ai
//           </h1>
//         </div>

//         {/* --- Foreground Image (Characters) --- */}
//         <div
//           ref={fgRef}
//           className="absolute inset-0 z-20 flex items-center justify-center will-change-transform px-4 md:px-0"
//         >
//           <Image
//             src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/68714ba1d0af15a29306f724_01-FG-min.png"
//             alt="Foreground"
//             width={750}
//             height={450}
//             className="object-contain w-[85vw] sm:w-[70vw] md:w-[60vw] drop-shadow-[0_0_30px_rgba(0,0,0,0.6)]"
//             priority
//           />
//           <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center px-4 md:px-6">
//             <p className="max-w-md sm:max-w-2xl text-center text-sm sm:text-lg md:text-2xl font-semibold text-gray-200 leading-snug">
//               Watch from start to finish how we leverage AI-generated images to
//               elevate our brand and storytelling.
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// old one working code is perfect

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero3D() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    const text = textRef.current;
    if (!section || !bg || !fg || !text) return;

    // -----------------------------------------------------
    // MAIN TIMELINE FOR PARALLAX + SCROLL ANIMATION
    // -----------------------------------------------------
    // - "scrub" makes animation follow scroll.
    // - "pin" freezes the section to create a parallax effect.
    // - "start" and "end" define the scroll range.
    // -----------------------------------------------------

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // When section top hits viewport top
        end: "end+=60% top", // Extend scroll distance
        scrub: 0.1, // Controls smoothness of animation
        pin: true, // Locks this section during scroll animation
        anticipatePin: 1, // Avoids jank
      },
    });

    // -----------------------------------------------------
    // BACKGROUND ANIMATION
    // -----------------------------------------------------
    // yPercent: -20 → moves background UP by 20%
    // Controls how strong parallax depth is.
    // Increase number = stronger movement
    // -----------------------------------------------------
    tl.to(
      bg,
      {
        yPercent: -5,
        ease: "power1.inOut",
      },
      0
    );

    // -----------------------------------------------------
    // FOREGROUND ANIMATION
    // -----------------------------------------------------
    // yPercent: -20 → moves FG UP creating depth contrast
    // scale: 0.6 → makes FG shrink slightly
    // You can control:
    //    - How much it moves (yPercent)
    //    - How much it scales (scale)
    // -----------------------------------------------------
    tl.to(
      fg,
      {
        yPercent: -20,
        scale: 0.9,
        ease: "power1.inOut",
      },
      0
    );

    // -----------------------------------------------------
    // TEXT ANIMATION
    // -----------------------------------------------------
    // Moves text UP to sync with parallax
    // yPercent: -20 controls lift amount
    // -----------------------------------------------------
    tl.to(
      text,
      {
        yPercent: -20,
        ease: "power1.inOut",
      },
      0
    );

    // Cleanup ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[100vh] md:h-[200vh] w-full overflow-hidden bg-[#020D13] text-white"
      >
        {/* ---------------- BACKGROUND IMAGE ---------------- */}
        {/* 
          This is the back layer.
          It moves slower to create parallax depth.
        */}
        <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
          <Image
            src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/6871489b268d768c6ebf7e35_01-BG-min-p-1080.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ---------------- TEXT LAYER ---------------- */}
        {/* Moves slightly with parallax */}
        <div
          ref={textRef}
          className="absolute top-[25vh] left-0 right-0 z-10 flex flex-col items-center text-center will-change-transform px-4 md:px-0"
        >
          <h1 className="text-[18vw] sm:text-[10vw] md:text-[12vw] font-extrabold uppercase leading-[0.9em] text-white">
            How We
          </h1>
          <h1 className="text-[18vw] sm:text-[13vw] md:text-[12vw] font-extrabold uppercase text-white leading-[0.9em]">
            Do Gen Ai
          </h1>
        </div>

        {/* ---------------- FOREGROUND IMAGE (Characters) ---------------- */}
        {/* Foreground scales + moves for deep 3D feel */}
        <div
          ref={fgRef}
          className="absolute inset-0 z-20 flex items-center justify-center will-change-transform px-4 md:px-0"
        >
          <Image
            src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/68714ba1d0af15a29306f724_01-FG-min.png"
            alt="Foreground"
            width={750}
            height={450}
            className="object-contain w-[85vw] sm:w-[70vw] md:w-[60vw] drop-shadow-[0_0_30px_rgba(0,0,0,0.6)]"
            priority
          />

          {/* FG Text */}
          <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center px-4 md:px-6">
            <p className="max-w-md sm:max-w-2xl text-center text-sm sm:text-lg md:text-2xl font-semibold text-gray-200 leading-snug">
              Watch from start to finish how we leverage AI-generated images to
              elevate our brand and storytelling.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
