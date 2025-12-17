// "use client";
// /* eslint-disable @next/next/no-img-element */

// import React from "react";

// export default function LayerOne({
//   title,
//   description,
//   content,
//   images,
// }: {
//   title: string;
//   description: string;
//   content: string;
//   images: string[];
// }) {
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//   // const resolveImageSrc = (value?: string) => {
//   //   if (!value) return "/next.svg";
//   //   if (value.startsWith("http://") || value.startsWith("https://")) {
//   //     return value;
//   //   }
//   //   if (cloudName) {
//   //     return `https://res.cloudinary.com/${cloudName}/image/upload/${value}`;
//   //   }
//   //   return "/next.svg";
//   // };
// const resolveImageSrc = (value?: string) => {
//   if (value && (value.startsWith("http://") || value.startsWith("https://"))) {
//     return value;
//   }
//   if (value && cloudName) {
//     return `https://res.cloudinary.com/${cloudName}/image/upload/${value}`;
//   }
//   return "/previews/placeholder.png"; // <— nicer preview
// };

//   return (
//     <div className="w-full flex flex-col">
//       {/* ====================== 1. TOP FULL IMAGE ====================== */}
//       <section className=" w-full">
//         <img
//           src={resolveImageSrc(images?.[0])}
//           alt="Top Banner"
//           className="w-full py-16 h-auto object-cover"
//         />
//       </section>
//       <section className="max-w-5xl mx-auto  px-6 bg-white">
//         {/* 4 Column Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
//           {/* Column 1 */}
//           <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
//             <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
//             <p className="text-gray-600 text-sm">Quick turnaround</p>
//           </div>

//           {/* Column 2 */}
//           <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
//             <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
//             <p className="text-gray-600 text-sm">Top-notch output</p>
//           </div>

//           {/* Column 3 */}
//           <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
//             <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
//             <p className="text-gray-600 text-sm">Skilled professionals</p>
//           </div>

//           {/* Column 4 */}
//           <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
//             <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
//             <p className="text-gray-600 text-sm">Always available</p>
//           </div>
//         </div>
//       </section>

//       {/* ====================== 2. RIGHT SIDE CONTENT LAYOUT ====================== */}
//       <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-10 px-6 gap-6">
//         {/* Left Image */}
//         <div className="w-full md:w-1/2">
//           <img
//             src={resolveImageSrc(images?.[1])}
//             alt="Right Content Image"
//             className="w-full h-screen "
//           />
//         </div>

//         {/* Right Content */}
//         <div className="max-w-2xl md:w-1/2 space-y-8">
//           <h2 className="text-3xl font-bold">{title}</h2>
//           <p className="text-black">{description}</p>

//           <div
//             className="prose text-black"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </div>
//       </section>

//       {/* ====================== 3. FULL SIZE IMAGE ====================== */}
//       <section className="w-full p-10 py-10">
//         <img
//           src={resolveImageSrc(images?.[2])}
//           alt="Full Size Section"
//           className="w-full h-auto object-cover"
//         />
//       </section>

//       {/* ====================== 4. TWO IMAGES SIDE BY SIDE ====================== */}
//       <section className="max-w-6xl mx-auto py-10 px-6">
//         <div className="w-full  flex flex-col md:flex-row gap-6">
//           <img
//             src={resolveImageSrc(images?.[3])}
//             alt="Left Image"
//             className="w-full md:w-1/2 h-auto "
//           />

//           <img
//             src={resolveImageSrc(images?.[4])}
//             alt="Right Image"
//             className="w-full md:w-1/2 h-auto "
//           />
//         </div>
//       </section>

//       {/* ====================== 5. LEFT IMAGE + RIGHT 3 BULLET POINTS ====================== */}
//       <section className="w-full relative">
//         {/* Full Width Image */}
//         <img
//           src={resolveImageSrc(images?.[5])}
//           alt="Background Image"
//           className="w-full h-auto object-cover"
//         />

//         {/* Right Side Overlay Content */}
//         <div className="absolute text-white top-1/2 right-10 -translate-y-1/2 text-left space-y-4 p-6 max-w-md">
//           <h2 className="text-4xl font-bold leading-tight">
//             Final Section Title
//           </h2>

//           <ul className="space-y-2 text-lg">
//             <li className="font-medium flex items-start gap-2">
//               <span className="text-3xl leading-none">•</span>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
//               cupiditate.
//             </li>

//             <li className="font-medium flex items-start gap-2">
//               <span className="text-3xl leading-none">•</span>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
//               cupiditate.
//             </li>

//             <li className="font-medium flex items-start gap-2">
//               <span className="text-3xl leading-none">•</span>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
//               cupiditate.
//             </li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function LayerOne({
  title,
  description,
  content,
  images,
  websiteUrl,
}: {
  title: string;
  description: string;
  content: string;
  images: string[];
  websiteUrl?: string | null;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const resolveImageSrc = (value?: string) => {
    if (
      value &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      return value;
    }
    if (value && cloudName) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/${value}`;
    }
    return "/previews/placeholder.png";
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* ====================== 1. TOP FULL IMAGE ====================== */}
      <section className="w-full">
        <img
          src={resolveImageSrc(images?.[0])}
          alt="Top Banner"
          className="w-full mt-16 h-[65vh] sm:h-[55vh] md:h-[80vh] object-cover"
        />
      </section>

      {/* ================= 2. 4 FEATURE BOXES ================= */}
      <section className="max-w-6xl px-4 sm:px-6 mx-auto py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { title: "Fast Delivery", sub: "Quick turnaround" },
            { title: "Premium Quality", sub: "Top-notch output" },
            { title: "Expert Team", sub: "Skilled professionals" },
            { title: "24/7 Support", sub: "Always available" },
          ].map((box, index) => (
            <div
              key={index}
              className="border p-6 rounded-xl bg-gray-50 hover:shadow-md transition text-center"
            >
              <h3 className="md:text-xl text-sm font-semibold mb-1">
                {box.title}
              </h3>
              <p className="text-gray-600 text-sm">{box.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================== 3. IMAGE LEFT + CONTENT RIGHT ====================== */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-16 px-4 sm:px-6 gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={resolveImageSrc(images?.[1])}
            alt="Right Content Image"
            className="w-full h-[520px] sm:h-[420px] md:h-[550px] object-contain"
          />
        </div>

        <div className="max-w-2xl md:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
          <p className="text-black text-base sm:text-lg">{description}</p>
          <div
            className="prose max-w-full text-black overflow-hidden"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* ====================== 4. FULL SIZE IMAGE ====================== */}
      <section className="w-full mb-4">
        <img
          src={resolveImageSrc(images?.[2])}
          alt="Full Size Section"
          className="w-full h-[45vh] sm:h-[65vh] md:h-[100vh] object-contain"
        />
      </section>

      {/* ====================== 5. TWO SIDE BY SIDE IMAGES ====================== */}
      <section className="w-full mb-10 px-4 sm:px-8 md:px-20 lg:px-[188px]">
        <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-2">
          <img
            src={resolveImageSrc(images?.[3])}
            alt="Left Image"
            className="w-full md:w-1/2 h-[280px] sm:h-[380px] md:h-[520px] object-cover"
          />
          <img
            src={resolveImageSrc(images?.[4])}
            alt="Right Image"
            className="w-full md:w-1/2 h-[280px] sm:h-[380px] md:h-[520px] object-cover"
          />
        </div>
      </section>

      {/* ====================== 6. FINAL BACKGROUND IMAGE + BULLETS ====================== */}
      <section className="relative w-full mb-14 min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh]">
        <img
          src={resolveImageSrc(images?.[5])}
          alt="Background Image"
          className="w-full h-[60vh] sm:h-[70vh] md:h-[85vh] object-cover"
        />

        <div className="absolute text-white top-1/2 left-1/2 md:right-16 md:left-auto -translate-x-1/2 md:translate-x-0 -translate-y-1/2 space-y-5 sm:space-y-6 p-4 sm:p-6 max-w-md text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Final Section Title
          </h2>

          <ul className="space-y-3 text-base sm:text-xl">
            {[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius cupiditate.",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius cupiditate.",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius cupiditate.",
            ].map((text, index) => (
              <li key={index} className="font-medium flex items-start gap-3">
                <span className="text-3xl sm:text-4xl leading-none">•</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FIXED FLOATING VISIT BUTTON */}
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-2xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 font-medium"
        >
          <span>Visit Site</span>
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
