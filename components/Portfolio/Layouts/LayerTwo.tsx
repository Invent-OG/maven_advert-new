"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";

export default function LayerTwo({
  title,
  description,
  content,
  images,
}: {
  title: string;
  description: string;
  content: string;
  images: string[];
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const resolveImageSrc = (value?: string) => {
    if (!value) return "/next.svg";
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    if (cloudName) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/${value}`;
    }
    return "/next.svg";
  };

  return (
    <div className="w-full flex flex-col">
      {/* ====================== 1. TOP FULL IMAGE ====================== */}
      <section className=" w-full">
        <img
          src={resolveImageSrc(images?.[0])}
          alt="Top Banner"
          className="w-full py-16 h-auto object-cover"
        />
      </section>
      <section className="max-w-5xl mx-auto  px-6 bg-white">
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Column 1 */}
          <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Quick turnaround</p>
          </div>

          {/* Column 2 */}
          <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-sm">Top-notch output</p>
          </div>

          {/* Column 3 */}
          <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-600 text-sm">Skilled professionals</p>
          </div>

          {/* Column 4 */}
          <div className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Always available</p>
          </div>
        </div>
      </section>

      {/* ====================== 2. RIGHT SIDE CONTENT LAYOUT ====================== */}
      <section className="max-w-6xl mx-auto ">
        {/* Left Image */}
        <div className="w-full">
          <img
            src={resolveImageSrc(images?.[1])}
            alt="Right Content Image"
            className="w-full h-auto "
          />
        </div>
      </section>

      {/* ====================== 3. FULL SIZE IMAGE ====================== */}
      {/* <section className="w-full p-10 py-10">
        <CldImage
          src="page-06_t3dw8b"
          alt="Full Size Section"
          width={2000}
          height={1500}
          className="w-full h-auto object-cover"
        />
      </section> */}

      {/* ====================== 4. TWO IMAGES SIDE BY SIDE ====================== */}
      <section className="max-w-6xl mx-auto py-10 ">
        <div className="w-full  flex flex-col md:flex-row gap-6">
          <img
            src={resolveImageSrc(images?.[2])}
            alt="Left Image"
            className="w-full md:w-1/2 h-auto "
          />

          <img
            src={resolveImageSrc(images?.[3])}
            alt="Right Image"
            className="w-full md:w-1/2 h-auto "
          />
        </div>
      </section>
      <section className="text-black mb-6 text-center  max-w-4xl mx-auto flex items-center justify-center px-6">
        <div
          className="text-xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </section>

      {/* ====================== 5. LEFT IMAGE + RIGHT 3 BULLET POINTS ====================== */}
      <section className="w-full relative">
        {/* Full Width Image */}
        <img
          src={resolveImageSrc(images?.[4])}
          alt="Background Image"
          className="w-full h-auto object-cover"
        />

        {/* Right Side Overlay Content */}
        <div className="absolute text-white top-1/2 right-10 -translate-y-1/2 text-left space-y-4 p-6 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">{title}</h2>

          <div
            className="space-y-3 text-lg"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />
        </div>
      </section>
    </div>
  );
}
