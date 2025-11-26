"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-20 border-t border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          Ready to elevate your <br />
          <span className="text-gray-500">digital presence?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Let's collaborate to build a website that not only looks amazing but
          drives real business growth.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            Start a Project <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
