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

//     // Smooth subtle parallax effect — short, clean motion
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

//     tl.to(bg, { yPercent: -60, ease: "power1.inOut" }, 0)
//       .to(fg, { yPercent: -60, scale: 0.8, ease: "power1.inOut" }, 0)
//       .to(text, { yPercent: -99, ease: "power1.inOut" }, 0);

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="relative h-[200vh] w-full overflow-hidden bg-[#020D13] text-white"
//       >
//         {/* --- Background --- */}
//         <div
//           ref={bgRef}
//           className="absolute inset-0 top-10 z-0 will-change-transform"
//         >
//           <Image
//             src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/6871489b268d768c6ebf7e35_01-BG-min-p-1080.jpg"
//             alt="Background"
//             fill
//             className=" object-cover"
//             priority
//           />
//         </div>

//         {/* --- Text Layer (Top aligned) --- */}
//         <div
//           ref={textRef}
//           className="absolute top-[25vh] left-0 right-0 z-10 flex flex-col items-center text-center will-change-transform"
//         >
//           <h1 className="text-[8vw] md:text-[13vw] font-extrabold uppercase leading-[0.9em] text-white">
//             How We
//           </h1>
//           <h1 className="text-[12vw] md:text-[13vw] font-extrabold uppercase text-white leading-[0.9em]">
//             Do Gen Ai
//           </h1>
//         </div>

//         {/* --- Foreground Image (Characters) --- */}
//         <div
//           ref={fgRef}
//           className="absolute inset-0 z-20 flex bottom-1/4 items-end justify-center will-change-transform"
//         >
//           <Image
//             src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/68714ba1d0af15a29306f724_01-FG-min.png"
//             alt="Foreground"
//             width={750}
//             height={450}
//             className="object-contain max-w-[75vw] md:max-w-[60vw] drop-shadow-[0_0_50px_rgba(0,0,0,0.6)]"
//             priority
//           />
//           <div className="absolute -bottom-60 left-0 right-0 z-30 flex justify-center  px-6">
//             <p className="max-w-3xl text-center text-lg md:text-2xl font-semibold text-gray-200 leading-snug">
//               Watch from start to finish how we leverage AI-generated images to
//               elevate our brand and storytelling.
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
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

//     // Smooth subtle parallax effect — short, clean motion
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
//         className="relative h-[200vh] w-full overflow-hidden bg-[#020D13] text-white"
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

//         {/* --- Text Layer (Top aligned) --- */}
//         <div
//           ref={textRef}
//           className="absolute top-[25vh] left-0 right-0 z-10 flex flex-col items-center text-center will-change-transform"
//         >
//           <h1 className="text-[8vw] md:text-[13vw] font-extrabold uppercase leading-[0.9em] text-white">
//             How We
//           </h1>
//           <h1 className="text-[12vw] md:text-[13vw] font-extrabold uppercase text-white leading-[0.9em]">
//             Do Gen Ai
//           </h1>
//         </div>

//         {/* --- Foreground Image (Characters) --- */}
//         <div
//           ref={fgRef}
//           className="absolute inset-0 z-20 flex  items-center justify-center will-change-transform"
//         >
//           <Image
//             src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/68714ba1d0af15a29306f724_01-FG-min.png"
//             alt="Foreground"
//             width={750}
//             height={450}
//             className="object-contain max-w-[75vw] md:max-w-[60vw] drop-shadow-[0_0_50px_rgba(0,0,0,0.6)]"
//             priority
//           />
//           <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center  px-6">
//             <p className="max-w-3xl text-center text-lg md:text-2xl font-semibold text-gray-200 leading-snug">
//               Watch from start to finish how we leverage AI-generated images to
//               elevate our brand and storytelling.
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom+=60% top",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(bg, { yPercent: -20, ease: "power1.inOut" }, 0)
      .to(fg, { yPercent: -20, scale: 0.9, ease: "power1.inOut" }, 0)
      .to(text, { yPercent: -20, ease: "power1.inOut" }, 0);

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
        {/* --- Background --- */}
        <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
          <Image
            src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/6871489b268d768c6ebf7e35_01-BG-min-p-1080.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* --- Text Layer --- */}
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

        {/* --- Foreground Image (Characters) --- */}
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
