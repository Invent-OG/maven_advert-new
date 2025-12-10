"use client";
import React from "react";
import { CheckCircle, Zap, User, Globe } from "lucide-react";
import "aos/dist/aos.css";

function PersonalBrand() {
  // AOS initialized globally
  const features = [
    {
      icon: <CheckCircle size={24} className="text-black" />,
      title: "Accelerate Your Brand Growth",
      description:
        "Choose your pathway, shape your strategy, and expand your brand presence.",
    },
    {
      icon: <Zap size={24} className="text-black" />,
      title: "Integrated Solutions",
      description:
        "Access a suite of services — from web development and automation to marketing and branding — crafted to amplify your digital impact.",
    },
    {
      icon: <User size={24} className="text-black" />,
      title: "Deploy Instantly",
      description:
        "Launch campaigns, websites, or digital systems with expertise where everything from code to content, executed seamlessly.",
    },
    {
      icon: <Globe size={24} className="text-black" />,
      title: "Seamless Digital Management",
      description:
        "Monitor, adjust, and optimize every element with intuitive tools designed for smooth operations.",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 md:px-12 lg:px-20 py-16">
      {/* Heading */}
      <div
        data-aos="fade-up"
        className="md:text-center text-start md:p-0 p-4 max-w-3xl mb-12"
      >
        <h2
          className="text-4xl 
    md:text-7xl 
    lg:text-8xl 
      font-medium
      tracking-tighter

    text-neutral-900  mb-6 "
        >
          Accelerate Your Brand Growth{" "}
        </h2>
        <p className="text-neutral-700 text-sm sm:text-base tracking-tight md:text-base lg:text-base max-w-sm mx-auto text-center">
          Unlock powerful tools and tailored solutions to grow your brand,
          enhance your operations, and launch digital experiences with ease.
        </p>
      </div>

      {/* Cards Section */}
      <div
        data-aos="fade-down"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-start text-start p-6 sm:p-8 border border-neutral-200 rounded-xl hover:shadow-lg transition-shadow"
          >
            {/* Icon with gray border */}
            <div className="w-16 h-16 flex text-neutral-900 justify-center items-center mb-4 rounded-full border-1 border-gray-300">
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl text-neutral-900 font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed sm:text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PersonalBrand;
