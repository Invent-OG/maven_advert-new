"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import { Section } from "lucide-react";

export default function LayerTwo() {
  return (
    <div className="w-full flex flex-col">
      {/* ====================== 1. TOP FULL IMAGE ====================== */}
      <section className=" w-full">
        <CldImage
          src="page-01_nmz0il"
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
      <section className="max-w-6xl mx-auto ">
        {/* Left Image */}
        <div className="w-full">
          <CldImage
            src="page-06_kwpxuh"
            alt="Right Content Image"
            width={1600}
            height={1200}
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
          <CldImage
            src="page-03_g1zdg3"
            alt="Left Image"
            width={1000}
            height={1000}
            className="w-full md:w-1/2 h-auto "
          />

          <CldImage
            src="page-04_zufchx"
            alt="Right Image"
            width={1000}
            height={1000}
            className="w-full md:w-1/2 h-auto "
          />
        </div>
      </section>
      <section className="text-black mb-6 text-center  max-w-4xl mx-auto flex items-center justify-center px-6">
        <p className="text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          numquam omnis dolores at in cumque laboriosam sapiente, rem fugiat,
          minima accusamus pariatur quos voluptatibus aspernatur. Deleniti
          cumque beatae corporis facere?
        </p>
      </section>

      {/* ====================== 5. LEFT IMAGE + RIGHT 3 BULLET POINTS ====================== */}
      <section className="w-full relative">
        {/* Full Width Image */}
        <CldImage
          src="page-02_rz9zja"
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
