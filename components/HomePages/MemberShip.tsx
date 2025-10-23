// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";

// export default function MemberShip() {
//   const phoneRefs = useRef<HTMLDivElement[]>([]);

//   return (
//     <section className="relative w-full min-h-screen bg-white flex flex-col md:flex-row items-center px-4 md:px-20 py-12">
//       {/* Left Side - Centered stacked images */}
//       <div className="flex-1 flex justify-center items-center relative mb-12 md:mb-0 overflow-visible">
//         <PhoneMockup
//           ref={(el) => {
//             if (el) phoneRefs.current[0] = el;
//           }}
//           screen="https://picsum.photos/400/800?random=1"
//           className="phone-anim relative z-0 top-[50px]"
//         />
//         <PhoneMockup
//           ref={(el) => {
//             if (el) phoneRefs.current[1] = el;
//           }}
//           screen="https://picsum.photos/400/800?random=2"
//           className="phone-anim absolute top-[120px] -left-[80px] z-10"
//         />
//       </div>

//       {/* Right Side - Membership content */}
//       <div className="flex-1 flex flex-col justify-center p-6 md:p-16">
//         <h2 className="text-4xl md:text-6xl lg:text-7xl max-w-2xl font-bold text-gray-900 mb-6">
//           Make a powerful membership site.
//         </h2>
//         <p className="text-gray-700 text-sm md:text-sm font-semibold mb-6 max-w-xl">
//           Pop Site has partnered with{" "}
//           <span className="font-semibold">MemberSpace</span> to help you sell
//           members-only content on your site. Build a thriving community and
//           unlock exclusive access for your members.
//         </p>
//         <a
//           href="#"
//           className="inline-block bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md max-w-max"
//         >
//           Get Started
//         </a>
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

import React, { useRef } from "react";
import Image from "next/image";

export default function MemberShip() {
  const phoneRefs = useRef<HTMLDivElement[]>([]);

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col md:flex-row items-center justify-evenly px-6 sm:px-10 md:px-16 lg:px-20 py-2 md:py-24 overflow-hidden">
      {/* Left Side - Centered stacked images */}
      <div className="flex-1 flex justify-center left-10 items-center relative  md:mb-0">
        <div className="relative flex justify-center items-center">
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[0] = el;
            }}
            screen="https://picsum.photos/400/800?random=1"
            className="phone-anim relative z-0 top-[40px] sm:top-[50px]"
          />
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[1] = el;
            }}
            screen="https://picsum.photos/400/800?random=2"
            className="phone-anim absolute top-[100px] sm:top-[120px] -left-[50px] sm:-left-[60px] md:-left-[80px] z-10"
          />
        </div>
      </div>

      {/* Right Side - Membership content */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 sm:p-8 md:p-12 lg:p-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight max-w-2xl">
          Make a powerful membership site.
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-sm font-semibold mb-8 max-w-xl leading-relaxed">
          Pop Site has partnered with{" "}
          <span className="font-semibold">MemberSpace</span> to help you sell
          members-only content on your site. Build a thriving community and
          unlock exclusive access for your members.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-400 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md"
        >
          Get Started
        </a>
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
