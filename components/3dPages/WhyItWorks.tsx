"use client";

import React from "react";

const tipsData = [
  {
    id: "01",
    title: "3D Character Animation",
    description:
      "We bring characters to life with 3D character animation that captures realistic movements, expressions, and emotions. As a leading 3D animation company in Coimbatore, we craft animations that make storytelling engaging and immersive, helping brands, films, and campaigns connect with their audience on a deeper level.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181947/3d_character_Animation_jqm2sa.mp4",
    label: "MIDJOURNEY",
  },
  {
    id: "02",
    title: "Architectural walkthroughs",
    description:
      "We transform blueprints into immersive architectural walkthroughs, creating photorealistic 3D environments for residential and commercial projects. Our 3D animation services in Coimbatore highlight materials, lighting, and spatial design, allowing clients to experience spaces virtually before construction begins.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181947/Architectural_Walkthroughs_zyns0h.mp4",
    label: "DALLE-3",
  },
];

export default function WhyItWorks() {
  return (
    <section className="flex flex-col lg:flex-row max-w-7xl mx-auto py-24 px-6 gap-32">
      {/* Left Sticky Title */}
      <div className="lg:w-1/2 w-full md:sticky top-24 self-start">
        <h2 className="text-6xl md:text-8xl font-extrabold text-neutral-900">
               3D Animation Services

        </h2>
      </div>

      {/* Right Column Content */}
      <div className="lg:w-2/3 w-full flex flex-col gap-24">
        {tipsData.map((tip) => (
          <div
            key={tip.id}
            className="flex flex-col items-start gap-6 border-b border-gray-300 pb-12"
          >
            {/* Image */}
            <div className="relative w-full aspect-[7/3] rounded-2xl overflow-hidden shadow-md bg-gray-100">
              <video
                src={tip.image}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-sm font-semibold rounded-md shadow z-10">
                {tip.label}
              </div>
            </div>

            {/* Text Content */}
            <div className="mt-4">
              <p className="text-blue-600 font-semibold text-4xl mb-2">
                {tip.id}
              </p>
              <h3 className="text-3xl lg:text-6xl font-extrabold text-neutral-900 mb-4 leading-tight">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-md leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
