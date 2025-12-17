// "use client";

// import { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function StickyShowCaseThree() {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const leftImageRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dragging, setDragging] = useState(false);

//   // Start dragging
//   const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   // Stop dragging
//   const stopDrag = () => setDragging(false);

//   // Dragging logic
//   const onDrag = (e: MouseEvent | TouchEvent) => {
//     if (
//       !dragging ||
//       !sliderRef.current ||
//       !leftImageRef.current ||
//       !containerRef.current
//     )
//       return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

//     let x = clientX - containerRect.left;
//     const sliderWidth = sliderRef.current.offsetWidth;

//     // Clamp the drag position within edges
//     x = Math.max(
//       sliderWidth / 2,
//       Math.min(containerRect.width - sliderWidth / 2, x)
//     );

//     // Update left image width and handle position
//     leftImageRef.current.style.width = `${x}px`;
//     sliderRef.current.style.left = `${x - sliderWidth / 2}px`;
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", onDrag);
//     window.addEventListener("touchmove", onDrag);
//     window.addEventListener("mouseup", stopDrag);
//     window.addEventListener("touchend", stopDrag);

//     return () => {
//       window.removeEventListener("mousemove", onDrag);
//       window.removeEventListener("touchmove", onDrag);
//       window.removeEventListener("mouseup", stopDrag);
//       window.removeEventListener("touchend", stopDrag);
//     };
//   }, [dragging]);

//   // Initialize handle in center
//   useEffect(() => {
//     if (containerRef.current && leftImageRef.current && sliderRef.current) {
//       const centerX = containerRef.current.offsetWidth / 2;
//       leftImageRef.current.style.width = `${centerX}px`;
//       sliderRef.current.style.left = `${
//         centerX - sliderRef.current.offsetWidth / 2
//       }px`;
//     }
//   }, []);
//   // AOS initialized globally

//   return (
//     <div
//       className="p-10"
//       style={{
//         background:
//           "radial-gradient(circle at top, #402B7D 0%, #402B7D 0%, #000000 100%)",
//       }}
//     >
//       <h4
//         data-aos="fade-up"
//         className="text-center text-white text-4xl 
//     md:text-7xl 
//     lg:text-8xl 
//       font-medium
//       tracking-tighter

//       mx-auto  p-6 sm:p-10 "
//       >
//         Redefining Your <br /> Visual Presence{" "}
//       </h4>
//       <p
//         data-aos="fade-up"
//         className="text-white text-center  text-sm sm:text-base tracking-tight md:text-base lg:text-base mb-6"
//       >
//         See the updated design (left) against the old version (right)
//       </p>

//       <section className="w-full flex justify-center items-center p-6 sm:p-10 md:p-12 lg:p-16 min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
//         <div
//           data-aos="fade-up"
//           ref={containerRef}
//           className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[600px] lg:w-[340px] lg:h-[680px] overflow-hidden rounded-[2rem]"
//         >
//           {/* Right Image (background) */}
//           <div className="absolute top-0 left-0 h-full w-full overflow-hidden z-0 flex justify-center items-center">
//             <div className="w-[95%] h-[96%] relative rounded-[2rem] overflow-hidden">
//               <Image
//                 src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965983/web1_lnkv9u.png"
//                 alt="Right Image"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           {/* Left Image (foreground) */}
//           <div
//             ref={leftImageRef}
//             className="absolute top-0 left-2 h-full overflow-hidden z-10 pl-2 sm:pl-3 flex justify-center items-center"
//           >
//             <div className="w-[100%] h-[96%] relative rounded-l-[2rem] overflow-hidden">
//               <Image
//                 src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965984/web2_aaxuck.png"
//                 alt="Left Image"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//           {/* Draggable Handle */}
//           <div
//             ref={sliderRef}
//             onMouseDown={startDrag}
//             onTouchStart={startDrag}
//             className="absolute top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex justify-center items-center cursor-grab z-100"
//           >
//             <ChevronLeft size={18} className="text-gray-800" />
//             <ChevronRight size={18} className="text-gray-800" />
//           </div>
//           {/* Phone Frame Overlay */}
//           <Image
//             src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
//             alt="Phone Frame"
//             fill
//             className="pointer-events-none select-none z-30 object-contain"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function StickyShowCaseThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0-100
  const [dragging, setDragging] = useState(false);

  // Start dragging
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  // Stop dragging
  const stopDrag = () => setDragging(false);

  // Dragging logic
  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    // Calculate position relative to container
    let x = clientX - containerRect.left;
    
    // Clamp values
    x = Math.max(0, Math.min(containerRect.width, x));

    // Convert to percentage
    const percent = (x / containerRect.width) * 100;
    setSliderPosition(percent);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("touchmove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [dragging]);

  return (
    <div
      className="p-10"
      style={{
        background:
          "radial-gradient(circle at top, #402B7D 0%, #402B7D 0%, #000000 100%)",
      }}
    >
      <h4
        data-aos="fade-up"
        className="text-center text-white text-4xl 
    md:text-7xl 
    lg:text-8xl 
      font-medium
      tracking-tighter

      mx-auto  p-6 sm:p-10 "
      >
        Redefining Your <br /> Visual Presence{" "}
      </h4>
      <p
        data-aos="fade-up"
        className="text-white text-center  text-sm sm:text-base tracking-tight md:text-base lg:text-base mb-6"
      >
        See the updated design (left) against the old version (right)
      </p>

      <section className="w-full flex justify-center items-center p-6 sm:p-10 md:p-12 lg:p-16 min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
        <div
          data-aos="fade-up"
          ref={containerRef}
          className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[600px] lg:w-[340px] lg:h-[680px] select-none"
        >
          {/* SCREEN CONTENT AREA */}
          {/* Centered with fixed aspect ratio slightly smaller than frame to fit inside bezel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[96%] rounded-[2rem] overflow-hidden z-20">
            {/* Right Image (Background - Old Version) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965983/web1_lnkv9u.png"
                alt="Old Version"
                fill
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* Left Image (Foreground - New Version) - Clipped */}
            <div 
                className="absolute inset-0 w-full h-full bg-white"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1765965984/web2_aaxuck.png"
                alt="New Version"
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* Phone Frame Overlay */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <Image
                src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
                alt="Phone Frame"
                fill
                className="object-contain"
                priority
            />
          </div>

          {/* Draggable Handle */}
          <div
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex justify-center items-center cursor-grab z-40 hover:scale-110 transition-transform active:scale-95"
            style={{ 
                left: `${sliderPosition}%`, 
                transform: 'translate(-50%, -50%)',
                touchAction: 'none'
            }}
          >
            <ChevronLeft size={18} className="text-gray-800" />
            <ChevronRight size={18} className="text-gray-800" />
          </div>
          
        </div>
      </section>
    </div>
  );
}
