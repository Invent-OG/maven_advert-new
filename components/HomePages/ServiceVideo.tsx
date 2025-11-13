"use client";
import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ServiceVideo() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <video
        data-aos="fade-down"
        src="https://framerusercontent.com/assets/X4WMcgpwDRngGVOj4ArVeLJWQ.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-4xl"
      />
    </div>
  );
}

export default ServiceVideo;
