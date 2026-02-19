"use client";

import { CldImage } from "next-cloudinary";
import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaChevronRight,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <div className="relative  font-sans">
      {/* ========================================
        FLOATING CARD (Original Design Kept)
        ========================================
      */}
      <div className="absolute   -top-12 left-1/2 transform -translate-x-1/2 w-11/12 md:w-10/12 bg-orange-600 shadow-xl rounded-lg flex flex-col md:flex-row justify-between items-center p-6 md:p-8 z-10">
        {/* Left Side */}
        <div className="text-white text-lg md:text-4xl font-bold mb-4 md:mb-0">
          Let&apos;s talk about how we can <br /> transform your business!
        </div>

        {/* Right Side */}
        <a
          href="mailto:Info@mavenadvert.com"
          className="flex items-center bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          <FaEnvelope className="mr-2" /> Info@mavenadvert.com
        </a>
      </div>

      {/* ========================================
        NEW PROFESSIONAL FOOTER DESIGN
        ========================================
      */}
      <footer className="bg-neutral-950  text-white pt-40 pb-12 relative z-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-zinc-800 pb-12">
            {/* Column 1: Brand Identity */}
            <div className="flex flex-col items-start space-y-6">
              <div className="bg-white/5 p-3 rounded-lg inline-block">
                <CldImage
                  src="maven_white_logo-03_zhtjwf"
                  alt="Maven Logo"
                  width={144}
                  height={144}
                  className="w-40"
                  quality="auto"
                  format="auto"
                />
              </div>
            </div>

            {/* Column 2: Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-orange-600 pl-3">
                Maven Advert
              </h3>
              <ul className="space-y-5 text-zinc-400">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-orange-600 flex-shrink-0" />
                  <span>
                    13a, Kulalar Street, Peelamedu, <br />
                    Coimbatore - 641004
                  </span>
                </li>
                <li className="flex items-center group">
                  <FaPhoneAlt className="mr-3 text-orange-600 group-hover:text-white transition-colors" />
                  <span className="group-hover:text-white transition-colors">
                    Phone : +91 7418418012
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-orange-600 pl-3">
                Explore
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/" label="Home" />
                <FooterLink href="/about" label="About" />
                <FooterLink href="/services" label="Services" />
                <FooterLink href="/casestudies" label="Case Studies" />
              </ul>
            </div>

            {/* Column 4: Services & Admin */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white border-l-4 border-orange-600 pl-3">
                More
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/threed" label="3D" />
                <FooterLink
                  href="/stallfabrication"
                  label="Stall Fabrication"
                />
                <FooterLink href="/contact" label="Contact" />
                <FooterLink href="/admin/login" label="Admin" />
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
            <p>© 2025 Powered by MavenAdvert</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Placeholders for future legal links if needed */}
              <span
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => router.push("/privacy-policy")}
              >
                Privacy Policy
              </span>
              <span
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => router.push("/terms-of-service")}
              >
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for cleaner link styling
const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="group flex items-center text-zinc-400 hover:text-white transition-all duration-300"
    >
      <span className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-orange-600 text-xs">
        <FaChevronRight />
      </span>
      {label}
    </Link>
  </li>
);
