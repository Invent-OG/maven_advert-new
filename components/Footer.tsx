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

export default function Footer() {
  return (
    <div className="relative font-sans">
      {/* ========================================
        FLOATING CARD (Original Design Kept)
        ========================================
      */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-11/12 md:w-10/12 bg-orange-600 shadow-xl rounded-lg flex flex-col md:flex-row justify-between items-center p-6 md:p-8 z-10">
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
      <footer className="bg-neutral-950 text-white pt-40 pb-12 relative z-0">
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
                    Free: 1234567890
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
            <p>© 2025 Deiago is Powered by MavenAdvert</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Placeholders for future legal links if needed */}
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
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
// "use client";

// import { CldImage } from "next-cloudinary";
// import React from "react";
// import {
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaArrowRight,
// } from "react-icons/fa";
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <div className="relative font-sans text-slate-200">
//       {/* ========================================
//           1. FLOATING CARD
//           (Kept exactly as requested, positioned to overlap)
//          ======================================== */}
//       <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-11/12 md:w-10/12 bg-orange-600 shadow-2xl rounded-xl flex flex-col md:flex-row justify-between items-center p-8 z-20 overflow-hidden">
//         {/* Decorative Circle Background for Card */}
//         <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-orange-500 rounded-full opacity-30 pointer-events-none"></div>

//         {/* Left Side */}
//         <div className="text-white text-xl md:text-3xl font-extrabold mb-6 md:mb-0 relative z-10 leading-tight">
//           Let&apos;s talk about how we can <br />
//           <span className="text-orange-100">transform your business!</span>
//         </div>

//         {/* Right Side */}
//         <a
//           href="mailto:Info@mavenadvert.com"
//           className="relative z-10 flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-bold shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
//         >
//           <FaEnvelope className="mr-2" /> Info@mavenadvert.com
//         </a>
//       </div>

//       {/* ========================================
//           2. MAIN FOOTER AREA
//          ======================================== */}
//       <footer className="bg-[#050505] pt-48 pb-10 relative z-0 overflow-hidden">
//         {/* Background Texture (Subtle Grid) */}
//         <div
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
//             backgroundSize: "30px 30px",
//           }}
//         ></div>

//         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
//           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
//             {/* LEFT SECTION: Brand & Contact Info (40% width) */}
//             <div className="lg:w-5/12 space-y-8">
//               {/* Logo */}
//               <div>
//                 <CldImage
//                   src="maven_white_logo-03_zhtjwf"
//                   alt="Maven Logo"
//                   width={160}
//                   height={160}
//                   className="w-40 mb-6"
//                   quality="auto"
//                   format="auto"
//                 />
//               </div>

//               {/* Contact Box Design */}
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
//                 <h3 className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4">
//                   Headquarters
//                 </h3>
//                 <div className="flex items-start mb-4">
//                   <FaMapMarkerAlt className="mt-1 mr-4 text-white text-lg shrink-0" />
//                   <p className="text-zinc-400 text-sm leading-relaxed">
//                     13a, Kulalar Street, Peelamedu,
//                     <br />
//                     Coimbatore - 641004
//                   </p>
//                 </div>
//                 <div className="flex items-center pt-4 border-t border-white/10">
//                   <FaPhoneAlt className="mr-4 text-white text-lg" />
//                   <p className="text-zinc-400 text-sm font-medium">
//                     Free: <span className="text-white">1234567890</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SECTION: Navigation Links (60% width) */}
//             <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-10">
//               {/* Navigation Group 1 */}
//               <div>
//                 <h3 className="text-white font-bold text-xl mb-6 flex items-center">
//                   <span className="w-8 h-1 bg-orange-600 mr-3 rounded-full"></span>
//                   Company
//                 </h3>
//                 <ul className="space-y-4">
//                   <ModernLink href="/" label="Home" />
//                   <ModernLink href="/about" label="About Us" />
//                   <ModernLink href="/services" label="Our Services" />
//                   <ModernLink href="/casestudies" label="Case Studies" />
//                 </ul>
//               </div>

//               {/* Navigation Group 2 */}
//               <div>
//                 <h3 className="text-white font-bold text-xl mb-6 flex items-center">
//                   <span className="w-8 h-1 bg-orange-600 mr-3 rounded-full"></span>
//                   Services & Support
//                 </h3>
//                 <ul className="space-y-4">
//                   <ModernLink href="/threed" label="3D Modeling" />
//                   <ModernLink
//                     href="/stallfabrication"
//                     label="Stall Fabrication"
//                   />
//                   <ModernLink href="/contact" label="Contact Us" />
//                   <ModernLink href="/admin/login" label="Admin Portal" />
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* ========================================
//               3. COPYRIGHT ROW
//              ======================================== */}
//           <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
//             <p>
//               © 2025 Deiago. Powered by{" "}
//               <span className="text-zinc-300">MavenAdvert</span>.
//             </p>
//             <div className="flex gap-6 mt-4 md:mt-0">
//               <Link
//                 href="#"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 href="#"
//                 className="hover:text-orange-500 transition-colors"
//               >
//                 Terms & Conditions
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // Helper Component for the new link style
// const ModernLink = ({ href, label }: { href: string; label: string }) => (
//   <li className="group">
//     <Link
//       href={href}
//       className="flex items-center text-zinc-400 hover:text-white transition-all duration-300"
//     >
//       <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-orange-600 transition-colors duration-300">
//         <FaArrowRight className="text-[10px] text-zinc-500 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
//       </span>
//       <span className="text-sm font-medium tracking-wide">{label}</span>
//     </Link>
//   </li>
// );
