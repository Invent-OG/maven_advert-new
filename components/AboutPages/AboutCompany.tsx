"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedButton from "../ui/AnimatedButton";
import { LiquidButton } from "../ui/liquid-glass-button";
import { useRouter } from "next/navigation";
import { FaRocket } from "react-icons/fa";

const tabs = [
  {
    id: 1,
    title: "Strategic Insight",
    heading:
      "Empowering brands with data-driven strategies and creative foresight.",
    description:
      "We go beyond trends — analysing audience behavior, market potential, and brand positioning to build purposeful campaigns that drive measurable growth.",
    feature: "Strategy shapes success.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1770990330/Gemini_Generated_Image_lvxl46lvxl46lvxl_xx0lzt.png",
    overlayImage:
      "https://images.pexels.com/photos/34193142/pexels-photo-34193142.jpeg",
  },
  {
    id: 2,
    title: "Creative Precision",
    heading: "Creativity refined through insight, vision, and purpose.",
    description:
      "We design brands, campaigns, and experiences that resonate deeply and drive real growth.",
    feature: "Details define excellence.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1770990399/Gemini_Generated_Image_ujphifujphifujph_kdpo3d.png",
    overlayImage:
      "https://images.pexels.com/photos/34193142/pexels-photo-34193142.jpeg",
  },
  {
    id: 3,
    title: "Proven Expertise",
    heading: "Driven by insight, strengthened by experience.",
    description:
      "Our team brings years of strategic knowledge, creative depth, and proven results — helping brands evolve with purpose and precision.",
    feature: "Experience builds trust.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1770990499/Gemini_Generated_Image_ctlqpdctlqpdctlq_1_ym94pw.png",
    overlayImage:
      "https://images.pexels.com/photos/34193142/pexels-photo-34193142.jpeg",
  },
  {
    id: 4,
    title: "Innovative Partnerships",
    heading: "Collaborating beyond boundaries to create impact.",
    description:
      "We believe in partnerships that inspire progress — combining ideas, strategy, and creativity to shape lasting success.",
    feature: "Together, we grow.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1770990578/Gemini_Generated_Image_p2l0kdp2l0kdp2l0_fblzge.png",
    overlayImage:
      "https://images.pexels.com/photos/34193142/pexels-photo-34193142.jpeg",
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
        className="flex justify-start lg:justify-center noScrollbar overflow-x-auto whitespace-nowrap no-scrollbar gap-2 px-2 py-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
        px-5 py-2 rounded-full text-sm font-medium cursor-pointer flex-shrink-0 transition-all duration-300
        ${
          activeTab === tab.id
            ? "bg-orange-500 text-white shadow-md"
            : "bg-gray-100 text-neutral-900  hover:bg-orange-500/20"
        }
      `}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-14 gap-5">
        {/* Left Image */}
        <div
          data-aos="fade-right"
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative">
            <Image
              src={tabs[activeTab - 1].image}
              alt="Main illustration"
              width={400}
              height={400}
              className="rounded-xl shadow-lg"
            />
            {/* <Image
              // src={tabs[activeTab - 1].overlayImage}
              src={
                "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651201/logos_png-02_ykasmr.png"
              }
              alt="Floating overlay"
              width={800} // smaller width
              height={800} // smaller height (keeps aspect ratio)
              className="absolute -bottom-10 -left-40 pb-5 rounded-2xl lg:-left-50 "
            /> */}
          </div>
        </div>

        {/* Right Content */}
        <div
          data-aos="fade-left"
          className="w-full flex flex-col gap-5 lg:w-1/2 "
        >
          <h6 className="text-sm text-orange-500 font-bold  tracking-wide uppercase ">
            {tabs[activeTab - 1].title}
          </h6>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight ">
            {tabs[activeTab - 1].heading}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {tabs[activeTab - 1].description}
          </p>

          <div className="flex items-center gap-5 mt-2">
            <LiquidButton
              onClick={() => router.push("/contact")}
              className="mt-6"
              size="xl"
            >
              <span className="flex items-center gap-2">
                Get Started
                <FaRocket />
              </span>
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
