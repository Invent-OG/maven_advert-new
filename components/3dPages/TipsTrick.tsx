"use client";

import React from "react";
import Image from "next/image";

const tipsData = [
  {
    id: "01",
    title: "CGI Advertisement",
    description:
      "We create cinematic CGI ads by building realistic 3D models, adding photoreal lighting, and blending them seamlessly into real footage. From concept to final composite, we craft visually striking ads that highlight products, enhance brand impact, and capture audience attention across digital platforms.",
    image:
      "https://images.pexels.com/photos/18983802/pexels-photo-18983802.jpeg",
    label: "MIDJOURNEY",
  },
  {
    id: "02",
    title: "3D Product Animation",
    description:
      "At Maven Advert, we craft 3D product animation videos that turn your ideas into visually compelling stories. As a leading 3D product animation company in Coimbatore, we highlight every feature, texture, and mechanism with precision, creating product animations that engage customers, boost understanding, and elevate your brand across digital platforms.",
    image:
      "https://images.pexels.com/photos/34447498/pexels-photo-34447498.jpeg",
    label: "DALLE-3",
  },
  {
    id: "03",
    title: "Industrial Animation",
    description:
      "We create industrial 3D animation videos that simplify complex machinery, processes, and prototypes. As a top 3D animation company in Coimbatore, we use detailed simulations, cutaway views, and exploded diagrams to showcase engineering precision. Our animations help businesses explain products, demonstrate workflows, and engage clients with clarity and impact.",
    image:
      "https://images.pexels.com/photos/29325065/pexels-photo-29325065.jpeg",
    label: "LEONARDO",
  },
];

export default function TipsTrick() {
  return (
    <section className="flex flex-col lg:flex-row max-w-7xl mx-auto py-24 px-6 gap-32">
      {/* Left Sticky Title */}
      <div className="lg:w-1/2 w-full md:sticky top-24 self-start">
        <h2 className="text-6xl md:text-9xl font-extrabold text-black">
          TIPS & <br />
          TRICKS
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
              <Image
                src={tip.image}
                alt={tip.title}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-sm font-semibold rounded-md shadow">
                {tip.label}
              </div>
            </div>

            {/* Text Content */}
            <div className="mt-4">
              <p className="text-blue-600 font-semibold text-4xl mb-2">
                {tip.id}
              </p>
              <h3 className="text-3xl lg:text-7xl font-extrabold text-black mb-4 leading-tight">
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
