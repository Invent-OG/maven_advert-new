"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Youtube } from "lucide-react";
import { gsap } from "gsap";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string | null;
  youtubeUrl?: string | null;
}

// ---- CARD UI (keeps your design) ----
function MovingCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-[#111] text-white p-6 rounded-2xl shadow-lg border border-gray-800 w-80 mb-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="relative h-14 w-14 rounded-full overflow-hidden">
          {testimonial.imageUrl ? (
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-700 text-xs h-full w-full">
              No Img
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>

        {testimonial.youtubeUrl && (
          <a
            href={testimonial.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-600"
          >
            <Youtube className="h-6 w-6" />
          </a>
        )}
      </div>

      <p
        className="
          text-gray-300 text-sm
          line-clamp-1
          hover:line-clamp-none
          transition-all duration-300
          max-h-[22px] hover:max-h-[300px]
          overflow-hidden
        "
      >
        {testimonial.content}
      </p>
    </div>
  );
}

// ---- MOVING COLUMN (typed refs) ----
function MovingColumn({
  testimonials,
  speed,
}: {
  testimonials: Testimonial[];
  speed: number;
}) {
  // columnRef holds the DOM element we animate
  const columnRef = useRef<HTMLDivElement | null>(null);
  // tweenRef holds the gsap tween instance (properly typed)
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!columnRef.current) return;

    // duplicate list visually by rendering testimonials twice; scrollHeight/2 gives one-cycle height
    const totalHeight = columnRef.current.scrollHeight / 2;

    // create infinite tween
    tweenRef.current = gsap.to(columnRef.current, {
      y: -totalHeight,
      ease: "none",
      repeat: -1,
      duration: speed,
      // use modifiers or set to ensure pixel-perfect loop if needed
    });

    const el = columnRef.current;
    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [speed, testimonials]); // re-run if testimonials change

  // render twice for seamless loop
  const movingTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      ref={columnRef}
      className="flex flex-col items-center will-change-transform"
    >
      {movingTestimonials.map((t, i) => (
        <MovingCard key={`${t.id}-${i}`} testimonial={t} />
      ))}
    </div>
  );
}

// ---- MAIN COMPONENT ----
export default function DynamicTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        const json = await res.json();
        if (json.success) {
          // ensure ids are strings (match Testimonial type)
          const normalized = json.testimonials.map(
            (t: Omit<Testimonial, "id"> & { id: string | number }) => ({
              ...t,
              id: String(t.id),
            })
          );
          setTestimonials(normalized);
        } else {
          console.error("Failed to load testimonials:", json);
        }
      } catch (err) {
        console.error("Error fetching testimonials", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading testimonials…</div>;
  }

  // split testimonials into 3 columns (works with any count)
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="bg-black py-16">
      {/* <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mx-auto text-center text-white mb-14">
        Testimonials
      </h2> */}

      <div className="relative overflow-hidden max-h-[700px] px-4 flex justify-center gap-6">
        {/* fade masks */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        {/* columns */}
        <div className="w-auto">
          <MovingColumn testimonials={col1} speed={18} />
        </div>

        <div className="hidden md:block w-auto">
          <MovingColumn testimonials={col2} speed={22} />
        </div>

        <div className="hidden lg:block w-auto">
          <MovingColumn testimonials={col3} speed={26} />
        </div>
      </div>
    </section>
  );
}
