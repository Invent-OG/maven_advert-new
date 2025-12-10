// "use client";

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Image from "next/image";

// export default function Partner() {
//   const marqueeRef = useRef<HTMLDivElement>(null);

//   const images = [
//     "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344977/ten_digit_logo_o4fhau.webp",
//     "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344314/Interakt_logo_uywjgb.webp",
//     "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765353428/OG_logo_black_xortdx.png",
//     "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344315/Zoho_partner_logo_lvdbrd.webp",
//   ];

//   useEffect(() => {
//     const marquee = marqueeRef.current;
//     if (!marquee) return;

//     const ctx = gsap.context(() => {
//       const totalWidth = marquee.scrollWidth / 3; // corrected to match 3x images

//       gsap.fromTo(
//         marquee,
//         { x: 0 },
//         {
//           x: -totalWidth,
//           duration: 30,
//           ease: "linear",
//           repeat: -1,
//         }
//       );
//     }, marqueeRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className=" flex flex-col justify-center items-center mt-10 py-10 overflow-hidden">
//       {/* <h2 className="md:text-5xl text-4xl text-neutral-900 font-normal text-center mb-8">
//         Brands We Work With
//       </h2> */}

//       <div className="overflow-hidden max-w-4xl w-full">
//         <div
//           ref={marqueeRef}
//           className="flex space-x-10 whitespace-nowrap w-max"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           {/* Repeat images 3 times for smooth infinite scroll */}
//           {[...images, ...images, ...images].map((src, index) => (
//             // <img
//             //   key={index}
//             //   src={src}
//             //   alt={`Featured ${index + 1}`}
//             //   className="h-24 object-contain inline-block select-none"
//             //   draggable={false}
//             // />

//             <Image
//               key={index}
//               src={src}
//               alt={`Featured ${index + 1}`}
//               className="h-32 object-contain inline-block select-none"
//               width={180}
//               height={180}
//               draggable={false}
//             />
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         div::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function Partner() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344977/ten_digit_logo_o4fhau.webp",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344314/Interakt_logo_uywjgb.webp",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765353428/OG_logo_black_xortdx.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344315/Zoho_partner_logo_lvdbrd.webp",
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      const totalWidth = marquee.scrollWidth / 3;

      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 30,
          ease: "linear",
          repeat: -1,
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="flex flex-col justify-start items-center overflow-hidden">
      <div className="overflow-hidden max-w-4xl w-full">
        <div
          ref={marqueeRef}
          className="flex space-x-18 whitespace-nowrap w-max"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...images, ...images, ...images].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Featured ${index + 1}`}
              className={`
                object-contain inline-block select-none
                ${src.includes("ten_digit_logo") ? "scale-140" : "scale-100"}
              `}
              width={180}
              height={180}
              draggable={false}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
