// "use client";
// import React from "react";

// export default function AppHero() {
//   return (
//     <section className="relative w-full min-h-[40vh] md:min-h-[70vh] bg-white flex flex-col md:flex-row md:items-center items-start px-4 sm:px-6 md:px-20 py-12 md:py-16 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-case-studies-title-bg.jpg"
//           alt="Marketing Contact"
//           className="w-full h-full md:h-full absolute md:top-0 top-10 object-cover object-center max-h-[320px] md:max-h-full"
//         />
//         {/* Optional overlay for better text visibility */}
//         <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
//       </div>

//       {/* Left side - text content */}
//       <div className="relative z-10 flex-1 flex flex-col justify-end items-start text-left space-y-2 sm:space-y-4 md:space-y-4">
//         <p className="text-xs font-medium sm:text-sm md:text-base text-orange-500 md:text-orange-500">
//           We Elevate Businesses{" "}
//         </p>
//         <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-neutral-800 leading-snug">
//           Creative <br /> Solutions
//         </h1>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";

export default function AppHero() {
  const dottedBg =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24'%3E%3Ccircle cx='2' cy='2' r='2' fill='%23b5b5b5' fill-opacity='0.35'/%3E%3C/svg%3E\")";

  return (
    <section
      className="relative w-full md:mt-0 mt-20 bg-[#FEF3F1] flex items-center justify-between px-4 sm:px-6 md:px-20 py-12 overflow-hidden"
      style={{
        backgroundImage: dottedBg,
        backgroundRepeat: "repeat",
      }}
    >
      {/* LEFT CONTENT */}
      <div className="relative z-20 w-1/2 flex flex-col space-y-4">
        <p className="text-xs sm:text-sm md:text-base text-neutral-600">
          We Elevate Businesses{" "}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-neutral-900 leading-none">
          Creative <br /> Solutions{" "}
        </h1>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="
          relative z-20 flex justify-end items-end 
          w-full md:w-[40%]      /* FULL WIDTH ON MOBILE, SAME ON DESKTOP */
          top-14 left-10 md:left-0 md:top-12 
          pr-0 md:pr-2
        "
      >
        <Image
          src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Jeevan_sykqgi.png"
          alt="Marketing Contact"
          width={1600}
          height={1600}
          priority
          className="
            w-[140%]       /* BIGGER IMAGE ON MOBILE */
            max-w-none     /* REMOVE SIZE LIMIT ON MOBILE */
            md:max-w-[1500px] 
            lg:max-w-[2000px] 
            object-contain
          "
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />
    </section>
  );
}
