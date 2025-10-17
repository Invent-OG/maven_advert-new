"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const tabs = [
  {
    id: 1,
    title: "Company benefits",
    heading: "Build better results with company insights.",
    description:
      "Leverage years of experience and expert data insights to boost your company's performance and long-term growth. Our analytics help streamline decision-making and enhance ROI.",
    feature: "Real-time performance tracking.",
  },
  {
    id: 2,
    title: "Competitive analysis",
    heading: "Understand your competition like never before.",
    description:
      "Analyze your competitors’ strategies, market trends, and performance metrics to help you stay one step ahead in your industry.",
    feature: "Comprehensive market analytics.",
  },
  {
    id: 3,
    title: "Trusted experience",
    heading: "Effective solutions for all business.",
    description:
      "Lorem ipsum is simply printing typesetting industry industry's standard dummy text printer scrambled ipsum is simply dummy text of the printing.",
    feature: "Competitors research intelligence.",
  },
  {
    id: 4,
    title: "Global partners",
    heading: "Partnering globally for your success.",
    description:
      "Collaborate with trusted global brands and agencies to expand your business network and unlock new opportunities worldwide.",
    feature: "International collaboration insights.",
  },
];

function AboutCompany() {
  const [activeTab, setActiveTab] = useState(3); // Default: Trusted experience

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

  return (
    <section className="w-full bg-white py-16">
      {/* Tabs Navigation */}
      <div className="flex justify-center border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${
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
        <div className="relative w-full lg:w-1/2 flex justify-center">
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
              className="absolute -bottom-10 -left-10 float-img"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full flex flex-col gap-8 lg:w-1/2 ">
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
            <div className="px-4 py-3 bg-gray-50 border rounded-lg flex items-center gap-2 shadow-sm">
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
            <button className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
              Explore services →
            </button>
            <button className="text-gray-700 text-sm font-medium flex items-center gap-2 hover:text-black transition">
              ✉️ Quick contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
