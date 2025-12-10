import { CldImage } from "next-cloudinary";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative">
      {/* Floating Card */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-11/12 md:w-10/12 bg-orange-600 shadow-xl rounded-lg flex flex-col md:flex-row justify-between items-center p-6 md:p-8 z-10">
        {/* Left Side */}
        <div className="text-white text-lg md:text-4xl font-bold mb-4 md:mb-0">
          Let&apos;s talk about how we can <br /> transform your business!
        </div>

        {/* Right Side */}
        <a
          href="mailto:Info@mavenadvert.com"
          className="flex items-center bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          <FaEnvelope className="mr-2" /> Info@mavenadvert.com
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white px-6 md:px-20 pt-32 pb-24 relative z-0">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo */}
          <div className="flex flex-col items-start">
            <CldImage
              src="maven_white_logo-03_zhtjwf"
              alt="Maven Logo"
              width={144}
              height={144}
              className="w-36 mb-4"
              quality="auto"
              format="auto"
            />
          </div>

          {/* Column 2: Marketo - London */}
          <div>
            <h3 className="font-semibold mb-2">Maven Advert</h3>
            <p className="text-gray-400 mb-2">
              13a, Kulalar Street, Peelamedu, Coimbatore - 641004
            </p>
            <p className="text-gray-400">Free: 1234567890</p>
          </div>

          {/* Column 3: Marketo - France */}
          <div>
            <h3 className="font-semibold mb-2">Marketo - France</h3>
            <p className="text-gray-400 mb-2">
              27 Eden Walk Eden Centre, Orchard View, Paris, France
            </p>
            <p className="text-gray-400">123 456 7890</p>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Subscribe our newsletter</h3>
            <form className="flex mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l bg-gray-800 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-600 px-4 py-2 rounded-r font-semibold hover:bg-orange-500"
              >
                Submit
              </button>
            </form>
            <p className="text-gray-400 text-sm">Protecting your privacy</p>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          {/* Left side: Navbar tabs */}
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="/casestudies"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Case studies
            </Link>
            <Link
              href="/threed"
              className="text-gray-400 hover:text-white transition-colors"
            >
              3D
            </Link>
            <Link
              href="/stallfabrication"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Stall Fabrication
            </Link>

            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Right side: Copyright */}
          <div className="text-gray-500 text-sm">
            © 2025 Deiago is Powered by MavenAdvert
          </div>
        </div>
      </footer>
    </div>
  );
}
