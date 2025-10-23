// "use client";

// import { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";

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

//   return (
//     <div
//       className=""
//       style={{
//         background:
//           "radial-gradient(circle at top, #402B7D 0%, #402B7D 0%, #000000 100%)",
//       }}
//     >
//       <h4 className="text-center text-white text-4xl md:text-7xl p-10 font-bold">
//         You look better on <br /> MavenAdvert
//       </h4>
//       <p className="text-white text-center">
//         See Oliver&apos;s new MavenAdvert (left) v.s. his old website (right)
//       </p>

//       <section className="w-full p-10 min-h-screen flex justify-center items-center">
//         <div
//           ref={containerRef}
//           className="relative w-[260px] h-[520px] md:w-[300px] md:h-[600px] lg:w-[340px] lg:h-[680px] overflow-hidden rounded-[2rem]"
//         >
//           {/* Right Image (background) */}
//           <div className="absolute top-0 left-0 h-full w-full overflow-hidden z-0 flex justify-center items-center">
//             <div className="w-[95%] h-[96%] relative rounded-l-[2rem] rounded-r-[2rem] overflow-hidden">
//               <Image
//                 src="https://images.pexels.com/photos/6800789/pexels-photo-6800789.jpeg"
//                 alt="Right Image"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           {/* Left Image (foreground) */}
//           <div
//             ref={leftImageRef}
//             className="absolute top-0 left-0 h-full overflow-hidden z-10 pl-3 flex justify-center items-center"
//           >
//             <div className="w-[100%] h-[96%] relative rounded-l-[2rem] overflow-hidden">
//               <Image
//                 src="https://images.pexels.com/photos/8885555/pexels-photo-8885555.jpeg"
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
//             className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex justify-center items-center cursor-grab z-20"
//           >
//             <ChevronLeft size={20} className="text-gray-800" />
//             <ChevronRight size={20} className="text-gray-800" />
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

export default function StickyShowCaseThree() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (
      !dragging ||
      !sliderRef.current ||
      !leftImageRef.current ||
      !containerRef.current
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    let x = clientX - containerRect.left;
    const sliderWidth = sliderRef.current.offsetWidth;

    // Clamp the drag position within edges
    x = Math.max(
      sliderWidth / 2,
      Math.min(containerRect.width - sliderWidth / 2, x)
    );

    // Update left image width and handle position
    leftImageRef.current.style.width = `${x}px`;
    sliderRef.current.style.left = `${x - sliderWidth / 2}px`;
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

  // Initialize handle in center
  useEffect(() => {
    if (containerRef.current && leftImageRef.current && sliderRef.current) {
      const centerX = containerRef.current.offsetWidth / 2;
      leftImageRef.current.style.width = `${centerX}px`;
      sliderRef.current.style.left = `${
        centerX - sliderRef.current.offsetWidth / 2
      }px`;
    }
  }, []);

  return (
    <div
      className=""
      style={{
        background:
          "radial-gradient(circle at top, #402B7D 0%, #402B7D 0%, #000000 100%)",
      }}
    >
      <h4 className="text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl p-6 sm:p-10 font-bold">
        You look better on <br /> MavenAdvert
      </h4>
      <p className="text-white text-center text-sm sm:text-base md:text-lg mb-6">
        See Oliver&apos;s new MavenAdvert (left) v.s. his old website (right)
      </p>

      <section className="w-full flex justify-center items-center p-6 sm:p-10 md:p-12 lg:p-16 min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
        <div
          ref={containerRef}
          className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px] md:w-[300px] md:h-[600px] lg:w-[340px] lg:h-[680px] overflow-hidden rounded-[2rem]"
        >
          {/* Right Image (background) */}
          <div className="absolute top-0 left-0 h-full w-full overflow-hidden z-0 flex justify-center items-center">
            <div className="w-[95%] h-[96%] relative rounded-[2rem] overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/6800789/pexels-photo-6800789.jpeg"
                alt="Right Image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Left Image (foreground) */}
          <div
            ref={leftImageRef}
            className="absolute top-0 left-2 h-full overflow-hidden z-10 pl-2 sm:pl-3 flex justify-center items-center"
          >
            <div className="w-[100%] h-[96%] relative rounded-l-[2rem] overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/8885555/pexels-photo-8885555.jpeg"
                alt="Left Image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Draggable Handle */}
          <div
            ref={sliderRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex justify-center items-center cursor-grab z-20"
          >
            <ChevronLeft size={18} className="text-gray-800" />
            <ChevronRight size={18} className="text-gray-800" />
          </div>

          {/* Phone Frame Overlay */}
          <Image
            src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
            alt="Phone Frame"
            fill
            className="pointer-events-none select-none z-30 object-contain"
          />
        </div>
      </section>
    </div>
  );
}
