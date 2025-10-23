// "use client";

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// export default function SaidTwo() {
//   const phoneRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     phoneRefs.current.forEach((phone, i) => {
//       gsap.to(phone, {
//         y: -250 - i * 50, // move up on scroll with stacking effect
//         ease: "power1.out",
//         scrollTrigger: {
//           trigger: phone,
//           start: "top center",
//           end: "bottom 20%",
//           scrub: true,
//         },
//       });
//     });
//   }, []);

//   return (
//     <section
//       className="showcase-section relative w-full min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden flex items-center px-4 md:px-20"
//       style={{
//         background: "radial-gradient(ellipse at top, #C02900 0%, #000000 70%)",
//       }}
//     >
//       {/* Left Side - Centered stacked images */}
//       <div className="flex-1 flex justify-center items-center relative">
//         {/* First Image - z-0 */}
//         <PhoneMockup
//           ref={(el) => {
//             if (el) phoneRefs.current[0] = el;
//           }}
//           screen="https://picsum.photos/400/800?random=1"
//           className="phone-anim relative z-0 top-[110px]"
//         />
//         <PhoneMockup
//           ref={(el) => {
//             if (el) phoneRefs.current[1] = el;
//           }}
//           screen="https://picsum.photos/400/800?random=2"
//           className="phone-anim absolute top-[170px] -left-[100px] z-10"
//         />
//       </div>

//       {/* Right Side - Testimonial */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center p-10 md:p-16">
//         {/* Quotation Header */}
//         <div className="flex items-center gap-2 mb-4">
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

//         {/* Quote Text */}
//         <blockquote className="text-3xl md:text-4xl text-white font-medium italic leading-snug mb-8">
//           A mini website builder more aimed for professionals.{" "}
//           <span className="font-semibold not-italic">Love the aesthetic.</span>
//         </blockquote>

//         {/* Author Info */}
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full overflow-hidden">
//             <Image
//               src="https://framerusercontent.com/images/TpMLCULNEpBMGtsbiAjXEdQLEc.webp?scale-down-to=512"
//               alt="Oliur"
//               width={48}
//               height={48}
//               className="object-cover"
//             />
//           </div>
//           <div>
//             <h4 className="font-semibold text-white text-base">Oliur</h4>
//             <p className="text-gray-400 text-sm">Designer & Creator</p>
//             <a
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
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* -----------------
//    Phone Mockup Component
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
//         className={`relative w-[200px] h-[400px] md:w-[240px] md:h-[480px] lg:w-[260px] lg:h-[520px] xl:w-[280px] xl:h-[560px] ${
//           className || ""
//         }`}
//       >
//         {/* Screen image */}
//         <Image
//           src={screen}
//           alt="screen"
//           fill
//           className="object-cover rounded-[2rem] px-[12px] pt-[10px] pb-[12px]"
//         />
//         {/* iPhone frame */}
//         <Image
//           src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
//           alt="frame"
//           fill
//           className="pointer-events-none select-none"
//         />
//       </div>
//     );
//   }
// );

// PhoneMockup.displayName = "PhoneMockup";
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function SaidTwo() {
  const phoneRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    phoneRefs.current.forEach((phone, i) => {
      gsap.to(phone, {
        y: -250 - i * 50, // move up on scroll with stacking effect
        ease: "power1.out",
        scrollTrigger: {
          trigger: phone,
          start: "top center",
          end: "bottom 20%",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <section
      className="showcase-section relative w-full min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden flex flex-col md:flex-row items-center px-6 sm:px-10 md:px-20 py-16 md:py-24"
      style={{
        background: "radial-gradient(ellipse at top, #C02900 0%, #000000 70%)",
      }}
    >
      {/* Left Side - Centered stacked images */}
      <div className="flex-1 flex justify-center items-center relative mb-12 md:mb-0 overflow-visible">
        <div className="relative flex justify-center items-center">
          {/* First Image - z-0 */}
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[0] = el;
            }}
            screen="https://picsum.photos/400/800?random=1"
            className="phone-anim relative z-0 top-[90px] sm:top-[110px]"
          />
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[1] = el;
            }}
            screen="https://picsum.photos/400/800?random=2"
            className="phone-anim absolute top-[140px] sm:top-[170px] -left-[60px] md:-left-[100px] z-10"
          />
        </div>
      </div>

      {/* Right Side - Testimonial */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 sm:p-10 md:p-16">
        {/* Quotation Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gray-800 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="none"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h.01M15 12h.01M12 12h.01M9 16h6M9 8h6"
              />
            </svg>
          </div>
          <p className="text-gray-300 text-sm">Oliur said</p>
        </div>

        {/* Quote Text */}
        <blockquote className="text-2xl sm:text-3xl md:text-4xl text-white font-medium italic leading-snug mb-8 max-w-lg sm:max-w-xl md:max-w-lg">
          A mini website builder more aimed for professionals.{" "}
          <span className="font-semibold not-italic">Love the aesthetic.</span>
        </blockquote>

        {/* Author Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="https://framerusercontent.com/images/TpMLCULNEpBMGtsbiAjXEdQLEc.webp?scale-down-to=512"
              alt="Oliur"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="font-semibold text-white text-base">Oliur</h4>
            <p className="text-gray-400 text-sm">Designer & Creator</p>
            <a
              href="#"
              className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1 mt-1"
            >
              Oliur on YouTube
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M10 15V9l5 3-5 3zm12-3c0-3.87-3.13-7-7-7H9C5.13 5 2 8.13 2 12s3.13 7 7 7h6c3.87 0 7-3.13 7-7z" />
              </svg>
              <span className="text-gray-400 ml-2">421K Subscribers</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -----------------
   Phone Mockup Component
------------------- */
type PhoneMockupProps = {
  screen: string;
  className?: string;
};

const PhoneMockup = React.forwardRef<HTMLDivElement, PhoneMockupProps>(
  ({ screen, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-[180px] h-[360px] sm:w-[200px] sm:h-[400px] md:w-[240px] md:h-[480px] lg:w-[260px] lg:h-[520px] xl:w-[280px] xl:h-[560px] ${
          className || ""
        }`}
      >
        {/* Screen image */}
        <Image
          src={screen}
          alt="screen"
          fill
          className="object-cover rounded-[2rem] px-[12px] pt-[10px] pb-[12px]"
        />
        {/* iPhone frame */}
        <Image
          src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
          alt="frame"
          fill
          className="pointer-events-none select-none"
        />
      </div>
    );
  }
);

PhoneMockup.displayName = "PhoneMockup";
