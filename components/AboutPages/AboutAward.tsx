"use client";
import React from "react";

function AboutAward() {
  return (
    <section className="w-full bg-white py-8 mb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0c1523] leading-tight">
              We are the marketing <br /> agency for business.
            </h2>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 text-left md:pl-16">
            <p className="text-gray-500 leading-relaxed text-[18px]">
              We curate an excellent quality hand-crafted email template designs
              that enhance readability of users with possibility. We believe in
              maintaining long-term relationship.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Dotted line */}
          <div className="absolute top-[68px] left-0 w-full border-t border-dotted border-gray-300"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {/* 2004 */}
            <div className="relative flex flex-col items-center">
              <div className="text-4xl font-bold text-neutral-800 mb-8">
                2004
              </div>
              {/* Dot on line */}
              <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#fff5f0] flex items-center justify-center border border-gray-200">
                <span className="w-3 h-3 rounded-full bg-[#ff6b3d]"></span>
              </div>
              <h3 className="font-bold text-xl text-neutral-700 mt-8">
                Crafto founded
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mt-3 max-w-[240px] mx-auto">
                Lorem ipsum is simply text of the printing typesetting.
              </p>
            </div>

            {/* 2010 */}
            <div className="relative flex flex-col items-center">
              <div className="text-4xl font-bold text-neutral-800 mb-8">
                2010
              </div>
              <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#fff5f0] flex items-center justify-center border border-gray-200">
                <span className="w-3 h-3 rounded-full bg-[#ff6b3d]"></span>
              </div>
              <h3 className="font-bold text-xl text-neutral-700 mt-8">
                Expand team
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mt-3 max-w-[240px] mx-auto">
                Lorem ipsum is simply text of the printing typesetting.
              </p>
            </div>

            {/* 2016 */}
            <div className="relative flex flex-col items-center">
              <div className="text-4xl font-bold text-neutral-800 mb-8">
                2016
              </div>
              <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#fff5f0] flex items-center justify-center border border-gray-200">
                <span className="w-3 h-3 rounded-full bg-[#ff6b3d]"></span>
              </div>
              <h3 className="font-bold text-xl text-neutral-700 mt-8">
                Build new office
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mt-3 max-w-[240px] mx-auto">
                Lorem ipsum is simply text of the printing typesetting.
              </p>
            </div>

            {/* 2020 */}
            <div className="relative flex flex-col items-center">
              <div className="text-4xl font-bold text-neutral-800 mb-8">
                2020
              </div>
              <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#fff5f0] flex items-center justify-center border border-gray-200">
                <span className="w-3 h-3 rounded-full bg-[#ff6b3d]"></span>
              </div>
              <h3 className="font-bold text-xl text-neutral-700 mt-8">
                Winning award
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mt-3 max-w-[240px] mx-auto">
                Lorem ipsum is simply text of the printing typesetting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAward;
