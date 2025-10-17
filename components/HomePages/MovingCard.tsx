"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Sample testimonial data
const sampleTestimonials = [
  {
    id: 1,
    text: "Amazing service! Highly recommend.",
    image:
      "https://images.pexels.com/photos/34094217/pexels-photo-34094217.jpeg",
    name: "John Doe",
    role: "CEO, Example Co",
  },
  {
    id: 2,
    text: "Loved the experience. Will come back.",
    image:
      "https://images.pexels.com/photos/33469927/pexels-photo-33469927.jpeg",
    name: "Jane Smith",
    role: "Marketing Head, ABC Corp",
  },
  {
    id: 3,
    text: "Great quality and friendly team!",
    image:
      "https://images.pexels.com/photos/30253590/pexels-photo-30253590.jpeg",
    name: "Alice Johnson",
    role: "Product Manager, TechSoft",
  },
  {
    id: 4,
    text: "Exceeded my expectations!",
    image:
      "https://images.pexels.com/photos/34125457/pexels-photo-34125457.jpeg",
    name: "Michael Brown",
    role: "Entrepreneur",
  },
  {
    id: 5,
    text: "Best service ever!",
    image:
      "https://images.pexels.com/photos/33272514/pexels-photo-33272514.jpeg",
    name: "Emily Davis",
    role: "Designer, Creatives Ltd",
  },
  {
    id: 6,
    text: "Professional and reliable.",
    image:
      "https://images.pexels.com/photos/14379193/pexels-photo-14379193.jpeg",
    name: "David Wilson",
    role: "Startup Founder",
  },
];

// Horizontal MovingCard Component
function MovingCard({
  testimonial,
}: {
  testimonial: (typeof sampleTestimonials)[0];
}) {
  return (
    <div className="bg-[#131414] p-4 rounded-xl shadow-lg mb-6 flex items-center w-80 h-32">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
        />
      </div>

      {/* Content */}
      <div className="ml-4 flex flex-col justify-center flex-1">
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <span className="text-gray-400 text-sm">{testimonial.role}</span>
        </div>
        <p className="text-white text-sm mt-1 line-clamp-2">
          {testimonial.text}
        </p>
      </div>
    </div>
  );
}

// Column Component
function MovingColumn({
  testimonials,
  speed,
}: {
  testimonials: typeof sampleTestimonials;
  speed: number;
}) {
  const columnRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<GSAPTween | null>(null);

  useEffect(() => {
    if (!columnRef.current) return;

    const totalHeight = columnRef.current.scrollHeight / 2;

    tweenRef.current = gsap.to(columnRef.current, {
      y: -totalHeight,
      ease: "none",
      repeat: -1,
      duration: speed,
    });

    const el = columnRef.current;
    const handleMouseEnter = () => tweenRef.current?.pause();
    const handleMouseLeave = () => tweenRef.current?.resume();

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      tweenRef.current?.kill();
    };
  }, [speed]);

  const movingTestimonials = [...testimonials, ...testimonials];

  return (
    <div ref={columnRef} className="flex flex-col items-center">
      {movingTestimonials.map((t, idx) => (
        <MovingCard key={t.id + "-" + idx} testimonial={t} />
      ))}
    </div>
  );
}

// Main Testimonials Component
export default function Testimonials() {
  // Split testimonials into three columns
  const firstColumn = sampleTestimonials.filter((_, i) => i % 3 === 0);
  const secondColumn = sampleTestimonials.filter((_, i) => i % 3 === 1);
  const thirdColumn = sampleTestimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="bg-black  relative">
      {/* Scroll container with fading masks */}
      <div className="relative overflow-hidden max-h-[700px] px-4 flex justify-center gap-6 flex-wrap md:flex-nowrap">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>

        {/* Column 1 */}
        <div className="w-full md:w-auto mb-6 md:mb-0">
          <MovingColumn testimonials={firstColumn} speed={18} />
        </div>

        {/* Column 2 */}
        <div className="hidden md:block w-full md:w-auto">
          <MovingColumn testimonials={secondColumn} speed={22} />
        </div>

        {/* Column 3 */}
        <div className="hidden lg:block w-full lg:w-auto">
          <MovingColumn testimonials={thirdColumn} speed={25} />
        </div>
      </div>
    </section>
  );
}
