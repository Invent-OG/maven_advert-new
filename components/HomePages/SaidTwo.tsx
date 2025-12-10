// "use client";

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Image from "next/image";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// export default function SaidTwo() {
//   const phoneRefs = useRef<HTMLDivElement[]>([]);

//   // SCROLL ANIMATION (same as your MemberShip component)
//   useEffect(() => {
//     const phones = phoneRefs.current.filter(Boolean);

//     phones.forEach((phone, i) => {
//       gsap.to(phone, {
//         y: -150 - i * 50,
//         ease: "power1.out",
//         scrollTrigger: {
//           trigger: phone,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });
//     });
//   }, []);

//   return (
//     <section
//       className="showcase-section relative w-full min-h-screen flex flex-col md:flex-row
//       items-center justify-between px-6 sm:px-10 md:px-20 py-16 overflow-hidden"
//       style={{
//         background: "radial-gradient(ellipse at top, #C02900 0%, #000000 70%)",
//       }}
//     >
//       {/* LEFT SIDE */}
//       <div className="flex-1 flex justify-center items-center relative  md:mb-0 overflow-visible">
//         <div className="relative flex justify-center items-center">
//           {/* Phone 1 */}
//           <PhoneMockup
//             ref={(el) => {
//               if (el) phoneRefs.current[0] = el;
//             }}
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/phone1_ujwx3x"
//             className="phone-anim relative z-0 top-[90px] left-[80px] md:left-[10px] sm:top-[110px]"
//           />

//           {/* Phone 2 */}
//           <PhoneMockup
//             ref={(el) => {
//               if (el) phoneRefs.current[1] = el;
//             }}
//             screen="https://res.cloudinary.com/dr9gcshs6/image/upload/phone2_wqfevl"
//             className="phone-anim absolute top-[140px] sm:top-[170px] -left-[60px] md:-left-[200px] z-10"
//           />
//         </div>
//       </div>

//       {/* RIGHT SIDE (FIXED ALIGNMENT) */}
//       <div
//         className="w-full md:w-1/2 flex flex-col
//   justify-center md:justify-center
//   items-start                 /* mobile text start */
//   md:items-start              /* desktop stays same */
//   text-left                   /* mobile text left */
//   md:text-left
//   p-2 sm:p-10 md:p-10 lg:p-10
//   space-y-4"
//       >
//         {/* Oliur Said Header */}
//         <div className="flex items-center gap-2">
//           <div className="bg-gray-800 p-2 rounded-md">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="white"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="none"
//               className="w-4 h-4"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 12h.01M15 12h.01M12 12h.01M9 16h6M9 8h6"
//               />
//             </svg>
//           </div>
//           <p className="text-gray-300 text-sm">Oliur said</p>
//         </div>

//         {/* QUOTE */}
//         <blockquote className="text-2xl sm:text-3xl md:text-4xl text-white font-medium italic leading-snug max-w-md">
//           Growth Metrics, Performance Tracking, Lasting Impact
//         </blockquote>

//         {/* PROFILE */}
//         <div className="flex flex-row items-center gap-4 pt-2">
//           <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
//             <Image
//               src="https://framerusercontent.com/images/TpMLCULNEpBMGtsbiAjXEdQLEc.webp?scale-down-to=512"
//               alt="Oliur"
//               width={48}
//               height={48}
//               className="object-cover"
//             />
//           </div>

//           <div className="flex flex-col text-left">
//             <h4 className="font-semibold text-white text-base">Oliur</h4>
//             <p className="text-gray-400 text-sm">Designer & Creator</p>

//             <Link
//               href="#"
//               className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1 mt-1"
//             >
//               Oliur on YouTube
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="w-4 h-4"
//               >
//                 <path d="M10 15V9l5 3-5 3zm12-3c0-3.87-3.13-7-7-7H9C5.13 5 2 8.13 2 12s3.13 7 7 7h6c3.87 0 7-3.13 7-7z" />
//               </svg>
//               <span className="text-gray-400 ml-2">421K Subscribers</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* -----------------
//    Phone Mockup Component (your exact sizes)
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

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SaidTwo() {
  const phonesRef = useRef(null);

  useEffect(() => {
    if (!phonesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        phonesRef.current,
        { y: 80 },
        {
          y: -80,
          ease: "power2.out",
          scrollTrigger: {
            trigger: phonesRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, phonesRef); // Scope to phonesRef

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="w-full overflow-hidden text-white py-20 "
      style={{
        background: "radial-gradient(ellipse at top, #C02900 0%, #000000 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-0">
        {/* LEFT — Phones */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div
            ref={phonesRef}
            className="relative w-[280px] sm:w-[300px] md:w-[450px] lg:w-[520px]"
          >
            {/* BACK PHONE */}
            <Image
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/phone1_ujwx3x"
              alt="analytics phone"
              width={800}
              height={800}
              className="absolute -left-10 sm:-left-16 md:-left-24 top-12 opacity-80 pointer-events-none"
            />

            {/* FRONT PHONE */}
            <Image
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/phone2_wqfevl"
              alt="instagram phone"
              width={800}
              height={800}
              className="relative z-10 md:-right-14 -right-10 pointer-events-none"
            />
          </div>
        </div>

        {/* RIGHT — MAIN PARAGRAPH */}
        <div className="w-full md:w-1/2 text-center md:text-left font-medium md:pl-10">
          <p className="text-3xl sm:text-4xl md:text-5xl leading-tight  tracking-tight">
            Growth Metrics,
            <br /> Performance
            <br /> Tracking,
            <br /> Lasting Impact
          </p>
        </div>
      </div>
    </section>
  );
}
