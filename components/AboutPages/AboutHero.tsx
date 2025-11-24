"use client";

import Image from "next/image";

export default function AboutHero() {
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
        <p className="text-xs sm:text-sm md:text-base text-gray-500">
          Full-Service Marketing,
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-neutral-800 leading-none">
          Growth <br /> Engineers
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
          src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722332/Banner_Kaniska_hs9ij7.png"
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
