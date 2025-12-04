"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function Said() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <section className="w-full flex flex-col md:flex-row items-stretch bg-black text-white overflow-hidden min-h-[600px] md:min-h-[500px]">
      {/* Left Side - Image */}
      <div
        data-aos="fade-right"
        className="relative w-full md:w-1/2 h-[600px] md:h-auto"
      >
        <CldImage
          src="Assets-16_fkg8zo"
          alt="Oliur"
          fill
          className="object-cover"
          quality="auto"
          format="auto"
          priority
        />
      </div>

      {/* Right Side - Testimonial */}
      <div
        data-aos="fade-left"
        className="w-full md:w-1/2 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] flex flex-col justify-center p-10 md:p-16"
      >
        {/* Quotation Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gray-800 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="none"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h.01M15 12h.01M12 12h.01M9 16h6M9 8h6"
              />
            </svg>
          </div>
          <p className="text-gray-300 text-sm">Oliur said</p>
        </div>

        {/* Quote Text */}
        <blockquote className="text-3xl md:text-4xl font-medium italic leading-snug mb-8">
          A mini website builder more aimed for professionals.{" "}
          <span className="font-semibold not-italic">Love the aesthetic.</span>
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="https://framerusercontent.com/images/TpMLCULNEpBMGtsbiAjXEdQLEc.webp?scale-down-to=512"
              alt="Oliur"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-white text-base">Oliur</h4>
            <p className="text-gray-400 text-sm">Designer & Creator</p>
            <Link
              href="#"
              className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1 mt-1"
            >
              Oliur on YouTube
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M10 15V9l5 3-5 3zm12-3c0-3.87-3.13-7-7-7H9C5.13 5 2 8.13 2 12s3.13 7 7 7h6c3.87 0 7-3.13 7-7z" />
              </svg>
              <span className="text-gray-400 ml-2">421K Subscribers</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
