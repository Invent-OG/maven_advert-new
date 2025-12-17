// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { LiquidButton } from "../ui/liquid-glass-button";
// import { FaBolt } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger);

// export default function StickyShowcase() {
//   const router = useRouter();

//   const containerRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Floating animation for side phones
//       gsap.utils.toArray<HTMLElement>(".phone-anim").forEach((phone, i) => {
//         gsap.to(phone, {
//           y: i === 2 ? -40 : -40,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: ".showcase-section",
//             start: "top top",
//             end: "center 30%",
//             scrub: 1,
//           },
//         });
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="showcase-section relative w-full min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden"
//     >
//       {/* Top content */}
//       <div className="sticky top-0 z-10 flex flex-col items-center text-center px-4">
//         <div className="md:mt-24 mt-24"></div>

//         <h1
//           className="        
//     text-4xl 
//     md:text-7xl 
//     lg:text-8xl 
//       font-medium
//       tracking-tighter

//     text-neutral-900 
//     md:py-4 
//     mt-20 md:mt-0 
    

//   "
//         >
//           Build a Remarkable <br />
//           Brand Experience
//         </h1>

//         <p className=" mt-2 mb-6 text-neutral-700 text-sm sm:text-base tracking-tight md:text-base lg:text-base">
//           Design, Launch, and grow with Maven.
//         </p>

//         <LiquidButton
//           onClick={() => router.push("/contact")}
//           className="mt-6"
//           size="xl"
//         >
//           <span className="flex items-center gap-2">
//             Get Started
//             <FaBolt />
//           </span>
//         </LiquidButton>
//       </div>

//       {/* Phones Showcase */}
//       <div className="relative py-20">
//         <div className="flex justify-center items-end  flex-nowrap -mx-[70px] sm:-mx-[60px] md:-mx-[80px] lg:-mx-[120px]">
//           {/* Phone 1 */}
//           <PhoneMockup
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965945/mobile3_ygstdm.png"
//             className="phone-anim translate-y-36 hidden sm:block"
//           />

//           {/* Phone 2 */}
//           <PhoneMockup
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965943/mobile1_rwvabu.png"
//             className="phone-anim translate-y-24"
//           />

//           {/* Phone 3 */}
//           <PhoneMockup
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965944/mobile2_atoj7x.png"
//             className="phone-anim scale-105 z-10"
//             priority
//           />

//           {/* Phone 4 */}
//           <PhoneMockup
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965946/mobile4_l5gbix.png"
//             className="phone-anim translate-y-24"
//           />

//           {/* Phone 5 */}
//           <PhoneMockup
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965948/mobile5_tvwpzc.png"
//             className="phone-anim translate-y-36 hidden sm:block"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// /* -----------------
//    Phone Mockup Component (NO FRAME)
// ------------------- */
// type PhoneMockupProps = {
//   screen: string;
//   className?: string;
//   priority?: boolean;
// };

// function PhoneMockup({
//   screen,
//   className,
//   priority = false,
// }: PhoneMockupProps) {
//   return (
//     <div
//       className={`relative 
//     w-[180px] h-[360px]             // mobile
//     sm:w-[200px] sm:h-[400px]       // small devices
//     md:w-[260px] md:h-[500px]       // increased width
//     lg:w-[300px] lg:h-[560px]       // increased width
//     xl:w-[390px] xl:h-[620px]       // increased width
//     ${className || " "}`}
//     >
//       {/* ONLY SCREEN IMAGE */}
//       <Image
//         src={screen}
//         alt="screen"
//         fill
//         className="object-cover  "
//         priority={priority}
//       />
//     </div>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiquidButton } from "../ui/liquid-glass-button";
import { FaBolt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function StickyShowcase() {
  const router = useRouter();

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for side phones
      gsap.utils.toArray<HTMLElement>(".phone-anim").forEach((phone, i) => {
        gsap.to(phone, {
          y: i === 2 ? -40 : -40,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".showcase-section",
            start: "top top",
            end: "center 30%",
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="showcase-section relative w-full min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden"
    >
      {/* Top content */}
      <div className="sticky top-0 z-10 flex flex-col items-center text-center px-4">
        <div className="md:mt-24 mt-24"></div>

        <h1
          className="        
    text-4xl 
    md:text-7xl 
    lg:text-8xl 
      font-medium
      tracking-tighter

    text-neutral-900 
    md:py-4 
    mt-20 md:mt-0 
    

  "
        >
          Build a Remarkable <br />
          Brand Experience
        </h1>

        <p className=" mt-2 mb-6 text-neutral-700 text-sm sm:text-base tracking-tight md:text-base lg:text-base">
          Design, Launch, and grow with Maven.
        </p>

        <LiquidButton
          onClick={() => router.push("/contact")}
          className="mt-6"
          size="xl"
        >
          <span className="flex items-center gap-2">
            Get Started
            <FaBolt />
          </span>
        </LiquidButton>
      </div>

      {/* Phones Showcase */}
      <div className="relative py-20">
        <div className="flex justify-center items-end  flex-nowrap -mx-[70px] sm:-mx-[60px] md:-mx-[80px] lg:-mx-[120px]">
          {/* Phone 1 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965945/mobile3_ygstdm.png"
            className="phone-anim translate-y-36 hidden sm:block"
          />

          {/* Phone 2 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965943/mobile1_rwvabu.png"
            className="phone-anim translate-y-24"
          />

          {/* Phone 3 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965944/mobile2_atoj7x.png"
            className="phone-anim scale-105 z-10"
            priority
          />

          {/* Phone 4 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965946/mobile4_l5gbix.png"
            className="phone-anim translate-y-24"
          />

          {/* Phone 5 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965948/mobile5_tvwpzc.png"
            className="phone-anim translate-y-36 hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------
   Phone Mockup Component (NO FRAME)
------------------- */
type PhoneMockupProps = {
  screen: string;
  className?: string;
  priority?: boolean;
};

function PhoneMockup({
  screen,
  className,
  priority = false,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative 
    w-[180px] h-[360px]             // mobile
    sm:w-[200px] sm:h-[400px]       // small devices
    md:w-[260px] md:h-[500px]       // increased width
    lg:w-[300px] lg:h-[560px]       // increased width
    xl:w-[390px] xl:h-[620px]       // increased width
    ${className || " "}`}
    >
      {/* ONLY SCREEN IMAGE */}
      <Image
        src={screen}
        alt="screen"
        fill
        className="object-cover  "
        priority={priority}
      />
    </div>
  );
}
