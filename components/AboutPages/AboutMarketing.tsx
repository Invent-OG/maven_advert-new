"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

function AboutMarketing() {
  return (
    <section className="w-full bg-[#f8fafc] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0c1523] leading-tight">
              Committed staff are <br /> ready to help you.
            </h2>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 text-left md:pl-16">
            <p className="text-gray-500 leading-relaxed text-[17px]">
              We curate an excellent quality hand-crafted email template designs
              that enhance readability of users with possibility. We believe in
              maintaining long-term relationship.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative bg-white p-12 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
            {/* Background shape */}
            <div
              className="absolute bottom-0 right-0 w-32 h-32 opacity-30"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/34125810/pexels-photo-34125810.jpeg')",
                backgroundSize: "cover",
              }}
            ></div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6 leading-snug">
              Build a greatest career <br /> with crafto marketing.
            </h3>
            <button className="flex items-center gap-2 bg-[#0c1523] text-white px-6 py-3 rounded-md text-sm font-medium">
              Join with us <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2 (Highlighted) */}
          <div className="relative bg-[#fff176] rounded-lg p-12 shadow-sm transition-all duration-300 hover:shadow-md">
            {/* Background shape */}
            <div
              className="absolute bottom-0 right-0 w-32 h-32 opacity-15"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/34125810/pexels-photo-34125810.jpeg')",
                backgroundSize: "cover",
              }}
            ></div>

            {/* Dot indicator on the left */}
            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#0c1523]"></div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6 leading-snug">
              Ready to work together <br /> for better solutions.
            </h3>
            <button className="flex items-center gap-2 bg-[#0c1523] text-white px-6 py-3 rounded-md text-sm font-medium">
              View our job <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white rounded-lg p-12 shadow-sm transition-all duration-300 hover:shadow-md">
            {/* Background shape */}
            <div
              className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/34125810/pexels-photo-34125810.jpeg')",
                backgroundSize: "cover",
              }}
            ></div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6 leading-snug">
              I only intended to be a <br /> freelancer marketing.
            </h3>
            <button className="flex items-center gap-2 bg-[#0c1523] text-white px-6 py-3 rounded-md text-sm font-medium">
              Contact now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMarketing;
