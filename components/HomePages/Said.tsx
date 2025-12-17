"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function Said() {
  // AOS initialized globally
  return (
    <section className="w-full flex flex-col md:flex-row items-stretch bg-black text-white overflow-hidden min-h-[600px] md:min-h-[500px]">
      {/* Left Side - Image */}
      <div
        data-aos="fade-right"
        className="relative w-full md:w-1/2 h-[600px] md:h-auto"
      >
        {/* <CldImage
          src="Assets-16_fkg8zo"
          alt="Oliur"
          fill
          className="object-cover"
          quality="auto"
          format="auto"
          priority
        /> */}
        <Image
          src="https://images.pexels.com/photos/3800848/pexels-photo-3800848.jpeg"
          alt="Oliur"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Testimonial */}
      <div
        data-aos="fade-left"
        className="w-full md:w-1/2 bg-gradient-to-b from-white/40 to-black/90 flex flex-col justify-center p-10 md:p-16"
      >
        {/* Quote Text */}
        <div className="relative">
          <span className="text-white/70 text-6xl absolute -top-6 -left-2 select-none">
            “
          </span>

          <blockquote className="text-white text-3xl md:text-4xl font-extralight mb-8 pl-6">
            A sleek studio experience crafted for you.
          </blockquote>

          <span className="text-white/70 text-6xl absolute -mb-4 right-0 select-none">
            ”
          </span>
        </div>
      </div>
    </section>
  );
}
