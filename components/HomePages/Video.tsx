// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import AOS from "aos";
// // import "aos/dist/aos.css";

// // gsap.registerPlugin(ScrollTrigger);

// // const Video = () => {
// //   const videoRef = useRef<HTMLIFrameElement>(null);
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     AOS.init({
// //       duration: 800,
// //       once: false,
// //     });
// //   }, []);

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="flex flex-col py-12 sm:py-16 md:py-20 items-center justify-center bg-gradient-to-b from-[#1a3c8b] via-[#000000] to-black text-white text-center px-4 sm:px-6 md:px-8 lg:px-12"
// //     >
// //       {/* Top Text */}
// //       <p
// //         data-aos="fade-down"
// //         className="text-[10px] sm:text-xs md:text-sm py-2 sm:py-4 tracking-wide uppercase mb-2 sm:mb-3 opacity-80"
// //       >
// //         Join thousands on MavenAdvert™
// //       </p>

// //       {/* Heading */}
// //       <h2
// //         data-aos="fade-down"
// //         className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-none xl:text-7xl font-bold max-w-full sm:max-w-2xl md:max-w-3xl"
// //       >
// //         The easiest way to elevate your brand{" "}
// //       </h2>

// //       {/* Subtext */}
// //       <p
// //         data-aos="fade-down"
// //         className="text-xs sm:text-sm md:text-xl lg:text-base text-gray-300 mt-2 py-8 sm:mt-3 max-w-full sm:max-w-lg px-2 sm:px-0 leading-relaxed"
// //       >
// //         No complicated tools. Just a fast, seamless way to explore creative
// //         solutions that engage, Inspire, and deliver results.
// //       </p>

// //       {/* Video Section */}
// //       <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 relative w-full max-w-full sm:max-w-4xl px-2 sm:px-0">
// //         <div
// //           data-aos="fade-down"
// //           className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] rounded-none overflow-hidden shadow-2xl bg-black"
// //         >
// //           <iframe
// //             ref={videoRef}
// //             className="absolute top-0 left-0 w-full h-full pointer-events-none"
// //             loading="lazy"
// //             src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182540/asart-tyflow-tomato-soup-delivery_gpupuw.mp4"
// //             title="YouTube video"
// //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //             allowFullScreen
// //           ></iframe>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Video;
// "use client";

// import React, { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "aos/dist/aos.css";

// gsap.registerPlugin(ScrollTrigger);

// const Video = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // AOS initialized globally

//   return (
//     <div
//       ref={containerRef}
//       className="flex flex-col py-12 sm:py-16 md:py-20 items-center justify-center bg-gradient-to-b from-[#1a3c8b] via-[#000000] to-black text-white text-center px-4 sm:px-6 md:px-8 lg:px-12"
//     >
//       {/* Top Text */}
//       <p
//         data-aos="fade-down"
//         className="text-[10px] sm:text-xs md:text-sm py-2 sm:py-4 tracking-wide uppercase mb-2 sm:mb-3 opacity-80"
//       >
//         Join thousands on MavenAdvert™
//       </p>

//       {/* Heading */}
//       <h2
//         data-aos="fade-down"
//         className="text-4xl 
//     md:text-7xl 
//     lg:text-8xl 
//       font-medium
//       tracking-tighter

//     text-white  max-w-full sm:max-w-2xl md:max-w-3xl"
//       >
//         The easiest way to elevate your brand{" "}
//       </h2>

//       {/* Subtext */}
//       <p
//         data-aos="fade-down"
//         className="text-white text-sm sm:text-base tracking-tight md:text-base lg:text-base mt-2 py-8 sm:mt-3 max-w-full sm:max-w-lg px-2 sm:px-0"
//       >
//         No complicated tools. Just a fast, seamless way to explore creative
//         solutions that engage, Inspire, and deliver results.
//       </p>

//       {/* Video Section */}
//       <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 relative w-full max-w-full sm:max-w-4xl px-2 sm:px-0">
//         <div
//           data-aos="fade-down"
//           className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] rounded-none overflow-hidden shadow-2xl bg-black"
//         >
//           <video
//             ref={videoRef}
//             className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none object-cover"
//             src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765961221/1_1_zujesb.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//           ></video>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;

"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // AOS initialized globally

  return (
    <div
      ref={containerRef}
      className="flex flex-col py-12 sm:py-16 md:py-20 items-center justify-center bg-gradient-to-b from-[#1a3c8b] via-[#000000] to-black text-white text-center px-4 sm:px-6 md:px-8 lg:px-12"
    >
      {/* Top Text */}
      <p
        data-aos="fade-down"
        className="text-[10px] sm:text-xs md:text-sm py-2 sm:py-4 tracking-wide uppercase mb-2 sm:mb-3 opacity-80"
      >
        Join thousands on MavenAdvert™
      </p>

      {/* Heading */}
      <h2
        data-aos="fade-down"
        className="text-4xl 
    md:text-7xl 
    lg:text-8xl 
      font-medium
      tracking-tighter

    text-white  max-w-full sm:max-w-2xl md:max-w-3xl"
      >
        The easiest way to elevate your brand{" "}
      </h2>

      {/* Subtext */}
      <p
        data-aos="fade-down"
        className="text-white text-sm sm:text-base tracking-tight md:text-base lg:text-base mt-2 py-8 sm:mt-3 max-w-full sm:max-w-lg px-2 sm:px-0"
      >
        No complicated tools. Just a fast, seamless way to explore creative
        solutions that engage, Inspire, and deliver results.
      </p>

      {/* Video Section */}
      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 relative w-full max-w-full sm:max-w-4xl px-2 sm:px-0">
        <div
          data-aos="fade-down"
          className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200/20 bg-gray-900"
        >
          {/* Browser Window Header */}
          <div className="h-8 sm:h-10 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 space-x-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]"></div>
          </div>

          {/* Video Content */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none object-cover"
              src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765961221/1_1_zujesb.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
