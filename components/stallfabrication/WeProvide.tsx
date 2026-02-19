"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brush, Building2, FileSpreadsheet, Ruler } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WeProvide() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // GSAP animation placeholder removed
  }, []);

  const services = [
    {
      title: "Pre-Promotional Activities",
      description:
        "Strategic digital promotions, teasers, and engagement campaigns that create buzz before the event.​",
      icon: <Brush className="w-10 h-10" />,
    },
    {
      title: "On-Site Fabrication Excellence",
      description:
        "Premium design, detailing, and on-ground execution built to captivate and endure.​",
      icon: <FileSpreadsheet className="w-10 h-10" />,
    },
    {
      title: "Post-Promotional Activities",
      description:
        "Beyond the event, we help extend your brand’s visibility through engaging post-stall promotions and digital highlights.",
      icon: <Building2 className="w-10 h-10" />,
    },
    {
      title: "Experiential Design Focus",
      description:
        "Each stall is crafted not just to display, but to connect — transforming spaces into immersive brand experiences.",
      icon: <Ruler className="w-10 h-10" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-white text-center overflow-hidden"
    >
      {/* Heading */}
      <div className="mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          What Makes Us Stand Apart{" "}
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          At Maven Advert, we go beyond building stalls — we build experiences
          that live before, during, and after the event. Every step is crafted
          to amplify your brand’s impact and audience connection.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 ">
        {services.map((service, i) => (
          <div
            key={i}
            className="service-card group relative w-full h-[320px] [perspective:1100px] 
            transition-all duration-500 
            hover:scale-[1.05] hover:-translate-y-2 
            hover:shadow-2xl"
          >
            {/* Flip container with balloon easing */}
            <div
              className="relative w-full h-full transition-transform duration-[900ms] 
              [transform-style:preserve-3d] 
              group-hover:[transform:rotateY(180deg)] 
              group-hover:duration-[1200ms] 
              group-hover:ease-[cubic-bezier(.34,1.56,.64,1)]"
            >
              {/* FRONT */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-xl flex flex-col items-start justify-center px-6 text-start [backface-visibility:hidden]">
                <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 bg-orange-500 text-white rounded-xl flex flex-col items-start justify-start px-6 pt-10 text-start [backface-visibility:hidden] [transform:rotateY(180deg)]">
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
