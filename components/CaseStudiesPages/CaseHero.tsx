"use client";
import React from "react";

export default function CaseHero() {
  return (
    <section className="relative w-full min-h-[40vh] md:min-h-[70vh] bg-white flex flex-col md:flex-row md:items-center items-start px-4 sm:px-6 md:px-20 py-12 md:py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-case-studies-title-bg.jpg"
          alt="Marketing Contact"
          className="w-full h-full md:h-full absolute md:top-0 top-10 object-cover object-center max-h-[320px] md:max-h-full"
        />
        {/* Optional overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
      </div>

      {/* Left side - text content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end items-start text-left space-y-2 sm:space-y-4 md:space-y-4">
        <p className="text-xs font-medium sm:text-sm md:text-base text-orange-500 md:text-orange-500">
          We help grow business
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-neutral-800 leading-snug">
          Marketing <br /> Case Studies
        </h1>
      </div>
    </section>
  );
}
