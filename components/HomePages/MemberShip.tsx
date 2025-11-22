// "use client";

// import React, { useRef, useEffect } from "react";
// import Image from "next/image";
// import AnimatedButton from "../ui/AnimatedButton";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function MemberShip() {
//   const router = useRouter();
//   const phoneRefs = useRef<HTMLDivElement[]>([]);

//   // GSAP ScrollTrigger animation: scroll down -> phones move up, scroll up -> phones move down
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const phones = phoneRefs.current.filter(Boolean) as HTMLDivElement[];

//       phones.forEach((phone, i) => {
//         gsap.to(phone, {
//           y: -120 - i * 40,
//           ease: "power1.out",
//           scrollTrigger: {
//             trigger: phone,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: true,
//             // markers: true,
//           },
//         });
//       });
//     });

//     return () => {
//       ctx.revert();
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//     };
//   }, []);

//   return (
//     <section className="relative w-full min-h-screen bg-white flex flex-col md:flex-row items-center px-6 sm:px-10 md:px-16 lg:px-20 py-2 md:py-24 overflow-hidden">
//       {/* Left Side - Centered stacked images */}
//       <div className="w-full md:w-1/2 flex justify-center items-center relative md:mb-0">
//         <div className="relative top-20 md:top-0 flex justify-center items-center">
//           {/* Phone 1 - conservative offsets so it doesn't overlap right column */}
//           <PhoneMockup
//             ref={(el) => {
//               if (el) phoneRefs.current[0] = el;
//             }}
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/phone1_ujwx3x"
//             className="phone-anim relative z-0 top-[40px] sm:top-[50px] left-[80px]"
//           />

//           {/* Phone 2 - conservative negative left to tuck behind the first but not overlap text */}
//           <PhoneMockup
//             ref={(el) => {
//               if (el) phoneRefs.current[1] = el;
//             }}
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/phone2_wqfevl"
//             className="phone-anim absolute top-[100px] sm:top-[120px] -left-[50px] sm:-left-[60px] md:-left-[120px] z-10"
//           />
//         </div>
//       </div>

//       {/* Right Side - Membership content */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-start md:text-left p-4 sm:p-8 md:p-12 lg:p-16">
//         <h2 className="md:text-7xl text-3xl font-bold text-neutral-900 mb-6 leading-normal max-w-xl">
//           Automate Your Digital Workflow.{" "}
//         </h2>

//         <p className="text-gray-700 text-sm sm:text-base md:text-sm font-semibold mb-8 max-w-xl leading-relaxed">
//           Seamlessly connect WhatsApp, CRM, and analytics tools to manage leads,
//           nurture customers, and scale smarter.
//         </p>

//         <AnimatedButton onClick={() => router.push("/contact")}>
//           Get Started
//         </AnimatedButton>
//       </div>
//     </section>
//   );
// }

// /* -----------------
//    Phone Mockup Component (FRAME REMOVED + BIGGER SIZES)
// ------------------- */
// type PhoneMockupProps = {
//   screen: string;
//   className?: string;
// };

// const PhoneMockup = React.forwardRef<HTMLDivElement, PhoneMockupProps>(
//   ({ screen, className }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={`relative
//           w-[220px] h-[440px]
//           sm:w-[240px] sm:h-[480px]
//           md:w-[300px] md:h-[600px]
//           lg:w-[330px] lg:h-[660px]
//           xl:w-[360px] xl:h-[720px]
//           ${className || ""}`}
//       >
//         {/* Screen image */}
//         <Image
//           src={screen}
//           alt="screen"
//           fill
//           className="object-cover rounded-[2rem] px-[12px] pt-[10px] pb-[12px]"
//         />
//       </div>
//     );
//   }
// );

// PhoneMockup.displayName = "PhoneMockup";
"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import AnimatedButton from "../ui/AnimatedButton";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MemberShip() {
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger animation
  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: -40,
        ease: "power1.out",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      className="
        relative max-w-6xl mx-auto min-h-screen bg-white 
        flex flex-col md:flex-row 
        items-start md:items-center 
        justify-start md:justify-between
        px-6 sm:px-10 py-6 md:py-12 
        overflow-hidden gap-10 
      "
    >
      {/* LEFT SIDE — CONTENT */}
      <div
        className="
          w-full md:w-1/2 
          flex flex-col 
          justify-center 
          items-start 
          text-left 
          max-w-2xl
        "
      >
        <h2 className="md:text-7xl text-4xl font-bold text-neutral-900 mb-6 leading-tight">
          Automate Your Digital Workflow.
        </h2>

        <p className="text-gray-700 text-sm sm:text-base font-semibold mb-8 leading-relaxed">
          Seamlessly connect WhatsApp, CRM, and analytics tools to manage leads,
          nurture customers, and scale smarter.
        </p>

        <AnimatedButton onClick={() => router.push("/contact")}>
          Get Started
        </AnimatedButton>
      </div>

      {/* RIGHT SIDE — IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end items-start">
        <div
          ref={imageRef}
          className="
            relative
            w-[280px] h-[450px]
            sm:w-[340px] sm:h-[550px]
            md:w-[420px] md:h-[700px]
            lg:w-[520px] lg:h-[820px]
            xl:w-[680px] xl:h-[900px]
          "
        >
          <Image
            src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646705/responsive_copy_qpquw8.png"
            alt="Membership Preview"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
