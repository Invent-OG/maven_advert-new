// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";

// export default function SaidThree() {
//   const phoneRefs = useRef<HTMLDivElement[]>([]);

//   return (
//     <section className="relative w-full min-h-screen bg-red-600 flex flex-col md:flex-row items-center px-4 md:px-20 ">
//       {/* Left Side - Membership content */}
//       <div className="flex-1 flex flex-col justify-center p-6 md:p-16 order-2 md:order-1">
//         <h2 className="text-4xl md:text-6xl lg:text-7xl max-w-2xl font-bold text-gray-900 mb-6">
//           Make your personal site now.
//         </h2>
//         <p className="text-gray-700 text-sm md:text-base font-semibold mb-6 max-w-xl">
//           Pop Site has partnered with{" "}
//           <span className="font-semibold">MemberSpace</span> to help you sell
//           members-only content on your site. Build a thriving community and
//           unlock exclusive access for your members.
//         </p>
//       </div>

//       {/* Right Side - Centered stacked images */}
//       <div className="flex-1 pb-32 flex justify-center items-end relative order-1 md:order-2 space-x-[-80px] md:space-x-[-80px] ">
//         <PhoneMockup
//           ref={(el) => {
//             if (el) phoneRefs.current[0] = el;
//           }}
//           screen="https://picsum.photos/400/800?random=1"
//           className="relative z-0 translate-y-0"
//         />
//         <PhoneMockup
//           ref={(el) => {
//             if (el) phoneRefs.current[1] = el;
//           }}
//           screen="https://picsum.photos/400/800?random=2"
//           className="relative z-10 translate-y-[60px]"
//         />
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

export default function SaidThree() {
  const phoneRefs = useRef<HTMLDivElement[]>([]);

  return (
    <section className="relative w-full min-h-screen  flex flex-col md:flex-row items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 md:py-24 overflow-hidden">
      {/* Left Side - Membership content */}
      <div className="flex-1 flex flex-col justify-center items-start text-center md:text-left p-4 sm:p-8 md:p-12 lg:p-16 order-2 md:order-1">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight max-w-2xl mx-auto md:mx-0">
          Make your personal site now.
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg font-semibold mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
          Pop Site has partnered with{" "}
          <span className="font-semibold">MemberSpace</span> to help you sell
          members-only content on your site. Build a thriving community and
          unlock exclusive access for your members.
        </p>
      </div>

      {/* Right Side - Centered stacked images */}
      <div className="flex-1 flex right-10 -top-15 md:top-0 justify-center items-end relative order-1 pb-10 md:order-2 pt-12 md:pt-0">
        <div className="flex justify-center items-end gap-[-80px] md:gap-[-80px] relative">
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[0] = el;
            }}
            screen="https://picsum.photos/400/800?random=1"
            className="relative z-0 left-30 translate-y-0"
          />
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[1] = el;
            }}
            screen="https://picsum.photos/400/800?random=2"
            className="relative z-10 translate-y-[60px]"
          />
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
