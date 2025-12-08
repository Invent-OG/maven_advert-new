"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedButton from "../ui/AnimatedButton";
import { LiquidButton } from "../ui/liquid-glass-button";
import { useRouter } from "next/navigation";

const tabs = [
  {
    id: 1,
    title: "Strategic Insight",
    heading:
      "Empowering brands with data-driven strategies and creative foresight.",
    description:
      "We go beyond trends — analysing audience behavior, market potential, and brand positioning to build purposeful campaigns that drive measurable growth.",
    feature: "Strategy shapes success.",
  },
  {
    id: 2,
    title: "Creative Precision",
    heading: "Creativity refined through insight, vision, and purpose.",
    description:
      "We design brands, campaigns, and experiences that resonate deeply and drive real growth.",
    feature: "Details define excellence.",
  },
  {
    id: 3,
    title: "Proven Expertise",
    heading: "Driven by insight, strengthened by experience.",
    description:
      "Our team brings years of strategic knowledge, creative depth, and proven results — helping brands evolve with purpose and precision.",
    feature: "Experience builds trust.",
  },
  {
    id: 4,
    title: "Innovative Partnerships",
    heading: "Collaborating beyond boundaries to create impact.",
    description:
      "We believe in partnerships that inspire progress — combining ideas, strategy, and creativity to shape lasting success.",
    feature: "Together, we grow.",
  },
];

function AboutCompany() {
  const [activeTab, setActiveTab] = useState(3); // Default: Trusted experience
  const router = useRouter();

  // GSAP floating animation for overlay image
  useEffect(() => {
    gsap.to(".float-img", {
      y: -15,
      duration: 2,
      ease: "ease.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="w-full bg-gray-100 py-16 overflow-x-hidden">
      {/* Tabs Navigation */}
      <div
        data-aos="fade-down"
        className="flex justify-start lg:justify-center noScrollbar border-b border-gray-200 overflow-x-auto whitespace-nowrap no-scrollbar px-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-3 text-sm font-medium flex-shrink-0 transition-all duration-300 ${
              activeTab === tab.id
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-14 gap-10">
        {/* Left Image */}
        <div
          data-aos="fade-right"
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/15443240/pexels-photo-15443240.jpeg"
              alt="Main illustration"
              width={400}
              height={400}
              className="rounded-xl shadow-lg"
            />
            <Image
              src="https://images.pexels.com/photos/34193142/pexels-photo-34193142.jpeg"
              alt="Floating overlay"
              width={150} // smaller width
              height={100} // smaller height (keeps aspect ratio)
              className="absolute -bottom-10 lg:-left-10 rounded-2xl -left-5 float-img"
            />
          </div>
        </div>

        {/* Right Content */}
        <div
          data-aos="fade-left"
          className="w-full flex flex-col gap-8 lg:w-1/2 "
        >
          <h6 className="text-sm text-orange-500 font-bold  tracking-wide uppercase mb-3">
            {tabs[activeTab - 1].title}
          </h6>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {tabs[activeTab - 1].heading}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {tabs[activeTab - 1].description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="px-4 py-3 bg-gray-50 border border-gray-50 rounded-lg flex items-center gap-2 shadow-sm">
              <span className="text-red-500 text-xl">🌐</span>
              <span className="font-medium text-gray-800">
                {tabs[activeTab - 1].feature}
              </span>
            </div>
          </div>
          <p className="text-black text-sm">
            Get your{" "}
            <span className="font-bold underline">first payment today</span> and
            grow your business.
          </p>

          <div className="flex items-center gap-5 mt-8">
            {/* <button className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
              Discover More →
            </button> */}
            {/* <AnimatedButton> Discover More →</AnimatedButton> */}
            <LiquidButton
              onClick={() => router.push("/contact")}
              className=""
              size="xl"
              radius={"md"}
            >
              Get Started
            </LiquidButton>
            <button className="text-gray-700 text-sm font-medium flex items-center gap-2 hover:text-black transition">
              ✉️ Connect & Grow
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
