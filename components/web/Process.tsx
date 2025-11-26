"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your brand, goals, and audience to define a strategic roadmap for your digital presence.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our designers craft visually compelling interfaces that align with your brand identity and user needs.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We bring designs to life with clean, efficient code, ensuring performance, security, and scalability.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "After rigorous testing, we deploy your site and provide the support needed for a successful takeoff.",
  },
];

export default function Process() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Process</h2>
          <p className="text-gray-400 text-lg">
            A proven methodology that ensures transparency, collaboration, and
            exceptional results at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative pt-8">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full" />
              
              <span className="block text-4xl font-bold text-white/20 mb-6">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
