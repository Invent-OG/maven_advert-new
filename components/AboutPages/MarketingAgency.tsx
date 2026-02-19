"use client";
import React, { useEffect } from "react";
import {
  FaThumbsUp,
  FaMousePointer,
  FaBullhorn,
  FaQuestion,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function MarketingAgency() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 ">
      {/* Top Badge */}
      <div className="mb-4">
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
          Welcome to Maven Advert{" "}
        </span>
      </div>

      {/* Header and Description */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start  gap-6">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900  md:w-1/2">
          Guiding brands to grow, engage, and succeed{" "}
        </h2>
        <p className="text-gray-500 text-md md:w-1/2">
          We craft tailored strategies across digital marketing, web
          development, branding, SEO, and automation, ensuring measurable
          results and long-term partnerships. Our focus is on creating impactful
          campaigns, seamless digital experiences, and growth-driven solutions
          that elevate businesses and drive engagement.
        </p>
      </div>

      {/* Features */}
      <div
        data-aos="fade-down"
        className="grid grid-cols-1 md:grid-cols-4 gap-8 md:mt-24 text-center"
      >
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaThumbsUp className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">Brand Trust </h4>
          <p className="text-gray-500 text-base">
            Building brands that people remember, respect, and return to.{" "}
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaMousePointer className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">
            Expert Execution{" "}
          </h4>
          <p className="text-gray-500 text-base">
            Delivering ideas that move fast, scale smart, and perform
            better.{" "}
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaBullhorn className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg  mb-2">
            Creative Intelligence{" "}
          </h4>
          <p className="text-gray-500 text-base">
            Where insight meets imagination to create meaningful impact.{" "}
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaQuestion className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg  mb-2">
            Enduring Partnership{" "}
          </h4>
          <p className="text-gray-500 text-base">
            Working side by side to keep your brand always ahead.{" "}
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-12 flex items-center justify-center gap-2 text-gray-600 font-semibold">
        <span className="font-serif text-md">
          We provide <strong>quality marketing</strong> services to customers.
        </span>
      </div>
    </section>
  );
}

export default MarketingAgency;
