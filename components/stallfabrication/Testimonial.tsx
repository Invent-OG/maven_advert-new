"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: "Zachary Farmer",
      role: "Developer",
      image:
        "https://images.pexels.com/photos/5328003/pexels-photo-5328003.jpeg",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      signature:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Signature_001.svg",
      rating: 5,
    },
    {
      name: "Isabella Moore",
      role: "Architect",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      signature:
        "https://upload.wikimedia.org/wikipedia/commons/1/1c/Signature_003.svg",
      rating: 5,
    },
    {
      name: "Ethan Carter",
      role: "Project Manager",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      signature:
        "https://upload.wikimedia.org/wikipedia/commons/9/96/Signature_002.svg",
      rating: 4,
    },
  ];

  // GSAP entry animation
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.from(section, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  }, []);

  // GSAP fade transition when changing slides
  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );
  }, [index]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const current = testimonials[index];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-[#f7fbfd] overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0a1b3d] mb-4">
          Our Customers Love
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua saidul
        </p>
      </div>

      {/* Testimonial Container */}
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 gap-12"
      >
        {/* Left Image */}
        <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex-shrink-0 mx-auto lg:mx-0">
          <div className="absolute inset-0 bg-orange-500 rounded-[100px_200px_100px_200px/150px_100px_150px_100px]"></div>
          <div className="absolute inset-[10px] rounded-[100px_200px_100px_200px/150px_100px_150px_100px] overflow-hidden">
            <Image
              src={current.image}
              alt={current.name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white border border-orange-500 rounded-full p-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white border border-orange-500 rounded-full p-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Content */}
        <div className="flex flex-col text-left lg:pl-10 max-w-xl">
          <h3 className="text-2xl font-semibold text-[#0a1b3d] mb-1">
            {current.name}
          </h3>
          <p className="text-gray-600 mb-4">{current.role}</p>

          <p className="text-gray-700 text-base mb-6 leading-relaxed">
            {current.text}
          </p>

          {/* Signature */}
          <div className="flex items-center justify-between">
            <Image
              src={current.signature}
              alt="signature"
              width={100}
              height={50}
              className="opacity-70"
            />
            <div className="flex text-orange-500">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-500" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
