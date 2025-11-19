"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

export default function LayerOne() {
  return (
    <div className="w-full flex flex-col">
      {/* ====================== 1. TOP FULL IMAGE ====================== */}
      <section className=" w-full">
        <CldImage
          src="page-01_r5ihgs"
          alt="Top Banner"
          width={2000}
          height={1500}
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
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center py-10 px-6 gap-6">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <CldImage
            src="page-03_xzfhej"
            alt="Right Content Image"
            width={1200}
            height={1200}
            className="w-full h-screen "
          />
        </div>

        {/* Right Content */}
        <div className="max-w-2xl md:w-1/2 space-y-8">
          <h2 className="text-3xl font-bold">Lorem Ipsum</h2>
          <p className="text-black">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
            earum sint molestias mollitia eius nostrum eum, adipisci repellat
            totam deserunt, atque odio ab ducimus dignissimos ex maiores, quod
            possimus veritatis non optio cupiditate! Doloremque deserunt unde
            veritatis quisquam dicta, aliquam consectetur quibusdam rerum
            recusandae impedit error corrupti vero voluptatem aliquid.
          </p>

          <ul className="space-y-2">
            <li className="font-medium">
              1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
              earum sint molestias mollitia eius nostrum eum,
            </li>
            <li className="font-medium">
              2. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
              earum sint molestias mollitia eius nostrum eum,
            </li>
            <li className="font-medium">
              3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
              earum sint molestias mollitia eius nostrum eum,
            </li>
          </ul>
        </div>
      </section>

      {/* ====================== 3. FULL SIZE IMAGE ====================== */}
      <section className="w-full p-10 py-10">
        <CldImage
          src="page-06_t3dw8b"
          alt="Full Size Section"
          width={2000}
          height={1500}
          className="w-full h-auto object-cover"
        />
      </section>

      {/* ====================== 4. TWO IMAGES SIDE BY SIDE ====================== */}
      <section className="max-w-6xl mx-auto py-10 px-6">
        <div className="w-full  flex flex-col md:flex-row gap-6">
          <CldImage
            src="page-04_xb9k4y"
            alt="Left Image"
            width={1000}
            height={1000}
            className="w-full md:w-1/2 h-auto "
          />

          <CldImage
            src="page-05_z83aui"
            alt="Right Image"
            width={1000}
            height={1000}
            className="w-full md:w-1/2 h-auto "
          />
        </div>
      </section>

      {/* ====================== 5. LEFT IMAGE + RIGHT 3 BULLET POINTS ====================== */}
      <section className="w-full relative">
        {/* Full Width Image */}
        <CldImage
          src="page-02_syokgp"
          alt="Background Image"
          width={2000}
          height={1200}
          className="w-full h-auto object-cover"
        />

        {/* Right Side Overlay Content */}
        <div className="absolute text-white top-1/2 right-10 -translate-y-1/2 text-left space-y-4 p-6 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Final Section Title
          </h2>

          <ul className="space-y-2 text-lg">
            <li className="font-medium flex items-start gap-2">
              <span className="text-3xl leading-none">•</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              cupiditate.
            </li>

            <li className="font-medium flex items-start gap-2">
              <span className="text-3xl leading-none">•</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              cupiditate.
            </li>

            <li className="font-medium flex items-start gap-2">
              <span className="text-3xl leading-none">•</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              cupiditate.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
