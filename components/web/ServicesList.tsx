"use client";

import React, { useRef } from "react";
import { Monitor, Code, Smartphone, Globe, Layers, Zap } from "lucide-react";

const services = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Web Design",
    description:
      "Visually stunning, user-centric designs that capture your brand's essence and engage your audience.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Custom Development",
    description:
      "Tailor-made solutions built with modern frameworks like React, Next.js, and Node.js for scalability and performance.",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Responsive & Mobile",
    description:
      "Seamless experiences across all devices, ensuring your site looks and works perfectly on mobile, tablet, and desktop.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "SEO Optimization",
    description:
      "Built-in technical SEO best practices to help your website rank higher and reach more customers organically.",
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "CMS Integration",
    description:
      "Easy-to-manage content systems like Sanity, Strapi, or WordPress, giving you full control over your content.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Tuning",
    description:
      "Lightning-fast load times and optimized core web vitals for superior user experience and conversion rates.",
  },
];

export default function ServicesList() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Expertise</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            We cover every aspect of the digital lifecycle, from initial concept
            to final deployment and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="mb-6 text-gray-300 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
