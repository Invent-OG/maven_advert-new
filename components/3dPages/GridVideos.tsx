// "use client";
// import React, { useState } from "react";

// const videoLinks = [
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182561/w-p-c-edited1_dpha5x.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182560/vapereklame-1_ljq7or.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182559/time-outro-final-nologos_qzadrc.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182559/the-kraken_c06bxr.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182558/perfume_yn3pmq.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182558/tem-studio-perfume-commercial_govbis.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182557/pro-max-video_sb12ay.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182555/Peanut_Butter_Advertisement_Product_Visualization_in_Blender_-_Sourav_1080p_h264_hjjvuh.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182554/new_lk6yif.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182553/light-exploded-rotation-v1-4k-transparent-bg-forward-and-back_t1zwit.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182541/deodrant0001-0270_t7hcow.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182541/ath-adx5000_xalrn0.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182540/as1_x5l9kg.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182540/asart-tyflow-tomato-soup-delivery_gpupuw.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182538/720vid_xgn1ip.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182537/5_fkwmvp.mp4",
//   "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182536/4_ncqaqc.mp4",
// ];

// function GridVideos() {
//   const [selected, setSelected] = useState<string | null>(null);

//   return (
//     <section className="w-full bg-black py-10">
//       {/* Masonry Layout */}
//       <div className="max-w-7xl mx-auto px-4 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
//         {videoLinks.map((src, index) => (
//           <div
//             key={index}
//             className="overflow-hidden rounded-none cursor-pointer group"
//             onClick={() => setSelected(src)}
//           >
//             <video
//               src={src}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Fullscreen Popup */}
//       {selected && (
//         <div
//           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
//           onClick={() => setSelected(null)}
//         >
//           <video
//             src={selected}
//             autoPlay
//             loop
//             muted
//             controls
//             playsInline
//             className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
//           />
//           <button
//             onClick={() => setSelected(null)}
//             className="absolute top-5 right-5 text-white text-3xl font-bold"
//           >
//             ✕
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }

// export default GridVideos;
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const videoLinks = [
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182561/w-p-c-edited1_dpha5x.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182560/vapereklame-1_ljq7or.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182559/time-outro-final-nologos_qzadrc.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182559/the-kraken_c06bxr.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182558/perfume_yn3pmq.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182558/tem-studio-perfume-commercial_govbis.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182557/pro-max-video_sb12ay.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182555/Peanut_Butter_Advertisement_Product_Visualization_in_Blender_-_Sourav_1080p_h264_hjjvuh.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182554/new_lk6yif.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182553/light-exploded-rotation-v1-4k-transparent-bg-forward-and-back_t1zwit.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182541/deodrant0001-0270_t7hcow.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182541/ath-adx5000_xalrn0.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182540/as1_x5l9kg.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182540/asart-tyflow-tomato-soup-delivery_gpupuw.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182538/720vid_xgn1ip.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182537/5_fkwmvp.mp4",
  "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765182536/4_ncqaqc.mp4",
];

function SmartVideo({ src, onClick }: { src: string; onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked or failed, handled silently
      });
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="break-inside-avoid overflow-hidden rounded-none cursor-pointer group mb-4"
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata" // Only load metadata initially
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}

function GridVideos() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="w-full bg-black py-10">
      {/* Unified Masonry Layout */}
      <div className="max-w-7xl mx-auto px-4 columns-2 lg:columns-3 gap-4 space-y-4">
        {videoLinks.map((src, index) => (
          <SmartVideo key={index} src={src} onClick={() => setSelected(src)} />
        ))}
      </div>

      {/* FULLSCREEN POPUP */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <video
            src={selected}
            autoPlay
            loop
            muted
            controls
            playsInline
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
          />
          <button
            onClick={() => setSelected(null)}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

export default GridVideos;
