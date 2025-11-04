"use client";

import React from "react";
import Image from "next/image";

const tipsData = [
  {
    id: "01",
    title: "PICK A TOOL AND STICK TO IT",
    description:
      "Every image generator has its own visual style, so using the same prompt across different tools can produce completely different results. This variability makes it hard to iterate quickly or maintain consistency across a project. The fastest way to get reliable, usable outputs is to pick one tool and learn how it behaves. Once you're familiar with its quirks, you’ll spend less time troubleshooting and more time creating.",
    image:
      "https://cdn.prod.website-files.com/63f9f100025c058594957cca%2F6871acefa162f4b7055b7e9c_Humanize-min20-poster-00001.jpg",
    label: "MIDJOURNEY",
  },
  {
    id: "02",
    title: "REFINE PROMPTS IN SMALL STEPS",
    description:
      "Every image generator has its own visual style, so using the same prompt across different tools can produce completely different results. This variability makes it hard to iterate quickly or maintain consistency across a project. The fastest way to get reliable, usable outputs is to pick one tool and learn how it behaves. Once you're familiar with its quirks, you’ll spend less time troubleshooting and more time creating.",
    image:
      "https://images.pexels.com/photos/34447498/pexels-photo-34447498.jpeg",
    label: "DALLE-3",
  },
  {
    id: "03",
    title: "USE REFERENCE IMAGES",
    description:
      "Every image generator has its own visual style, so using the same prompt across different tools can produce completely different results. This variability makes it hard to iterate quickly or maintain consistency across a project. The fastest way to get reliable, usable outputs is to pick one tool and learn how it behaves. Once you're familiar with its quirks, you’ll spend less time troubleshooting and more time creating.",
    image:
      "https://images.pexels.com/photos/29325065/pexels-photo-29325065.jpeg",
    label: "LEONARDO",
  },
  {
    id: "03",
    title: "Digital",
    description:
      "Every image generator has its own visual style, so using the same prompt across different tools can produce completely different results. This variability makes it hard to iterate quickly or maintain consistency across a project. The fastest way to get reliable, usable outputs is to pick one tool and learn how it behaves. Once you're familiar with its quirks, you’ll spend less time troubleshooting and more time creating.",
    image:
      "https://images.pexels.com/photos/34036469/pexels-photo-34036469.jpeg",
    label: "MARKETING",
  },
];

export default function WhyItWorks() {
  return (
    <section className="flex flex-col lg:flex-row max-w-7xl mx-auto py-24 px-6 gap-32">
      {/* Left Sticky Title */}
      <div className="lg:w-1/2 w-full md:sticky top-24 self-start">
        <h2 className="text-6xl md:text-9xl font-extrabold text-black">
          WHY IT <br />
          WORKS
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
