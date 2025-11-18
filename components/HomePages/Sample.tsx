"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

export default function Sample() {
  return (
    <div className="w-screen h-screen relative">
      <CldImage
        src="page-01_myjsuo" // your Cloudinary public ID
        alt="Fullscreen Image"
        fill // makes it full screen
        crop="fill" // ensures full coverage
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
    </div>
  );
}
