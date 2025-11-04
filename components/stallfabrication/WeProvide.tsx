"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brush, Building2, FileSpreadsheet, Ruler } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WeProvide() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".service-card");

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  }, []);

  const services = [
    {
      title: "Interior Design",
      description:
        "Bring creature let Fish t grass under the given a void fromt deep form greater and days give upon day light",
      icon: <Brush className="w-10 h-10" />,
    },
    {
      title: "Budget Planning",
      description:
        "Bring creature let Fish t grass under the given a void fromt deep form greater and days give upon day light",
      icon: <FileSpreadsheet className="w-10 h-10" />,
    },
    {
      title: "Project Planning",
      description:
        "Bring creature let Fish t grass under the given a void fromt deep form greater and days give upon day light",
      icon: <Building2 className="w-10 h-10" />,
    },
    {
      title: "Architecture Service",
      description:
        "Bring creature let Fish t grass under the given a void fromt deep form greater and days give upon day light",
      icon: <Ruler className="w-10 h-10" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-white text-center overflow-hidden"
    >
      {/* Section Heading */}
      <div className="mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0a1b3d] mb-4">
          What We Provide Special
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua saidul
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 ">
        {services.map((service, i) => (
          <div
            key={i}
            className="service-card group relative w-full h-[320px] [perspective:1000px]"
          >
            {/* Inner container */}
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Side */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center px-6 text-center [backface-visibility:hidden]">
                <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#0a1b3d] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-orange-500 text-white rounded-xl flex flex-col items-center justify-center px-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
