// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLaptopCode,
//   FaMobileAlt,
//   FaCloud,
//   FaChartLine,
//   FaHeadset,
//   FaArrowRight,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import { CldImage } from "next-cloudinary";

// function Navbar() {
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

//   const pathname = usePathname();

//   const services = [
//     {
//       icon: <FaLaptopCode className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Digital Sales Infrastructure & Automation",
//       description:
//         "We build landing pages, Integrate CRM, Implement Automation, and set up analytics to streamline your sales process",
//       href: "/services/web-development",
//     },
//     {
//       icon: <FaMobileAlt className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Ecommerce Marketing & Product Promotion",
//       description:
//         "We optimize your presence on Amazon and Flipkart, Run targeted product ads, and boost cross-sales to increase revenue",
//       href: "/services/app-development",
//     },
//     {
//       icon: <FaInstagram className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Social Media Growth & Brand Engagement",
//       description:
//         "We create engaging content, manage campaigns, and collaborate to grow your brand’s reach and engagement",
//       href: "/services/cloud-services",
//     },
//     {
//       icon: <FaChartLine className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Digital Advertising & ROI Campaigns",
//       description:
//         "We design Google Ads, Retargeting Campaigns, and Lead funnels to maximize ROI and drive measurable results",
//       href: "/services/seo-optimization",
//     },
//     {
//       icon: <FaHeadset className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Search & Content Marketing",
//       description:
//         "We leverage SEO, blogs, YouTube, and email/WhatsApp campaigns to enhance visibility and attract your target audience",
//       href: "/services/support",
//     },
//   ];

//   const menuLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Case Studies", href: "/casestudies" },
//     { name: "Contact", href: "/contact" },
//     { name: "Stall Fabrication", href: "/stallfabrication" },
//     { name: "3D Modelling", href: "/threed" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
//         setShowNavbar(false);
//       } else {
//         setShowNavbar(true);
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <nav
//       className={`w-full bg-white fixed top-0 left-0 z-50 transition-transform duration-300 ${
//         showNavbar ? "translate-y-0" : "-translate-y-24"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto pb-4 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between mt-4 items-center ">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/">
//               <CldImage
//                 src="logos_png-01_nllylj"
//                 alt="Logo"
//                 width={180}
//                 height={50}
//                 quality="auto"
//                 format="auto"
//               />
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {menuLinks.map((item) =>
//               item.name === "Services" ? (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => setServicesOpen(true)}
//                   onMouseLeave={() => setServicesOpen(false)}
//                 >
//                   <Link
//                     href={item.href}
//                     className={`flex items-center gap-1 transition duration-300 ${
//                       pathname.startsWith("/services")
//                         ? "text-orange-500 font-semibold"
//                         : "text-gray-700 hover:text-orange-500"
//                     }`}
//                   >
//                     Services ▼
//                   </Link>

//                   {servicesOpen && (
//                     <div className="absolute top-full left-0 mt-2 w-[30rem] bg-white shadow-lg rounded-md p-4 grid grid-cols-1 gap-2 z-50">
//                       {services.map((service, idx) => (
//                         <Link
//                           key={idx}
//                           href={service.href}
//                           className="flex items-center justify-between border-b border-gray-200 p-2 rounded-md hover:bg-gray-100 group transition duration-300"
//                         >
//                           <div>{service.icon}</div>
//                           <div className="flex-1 mx-4">
//                             <h4 className="font-semibold text-gray-800">
//                               {service.title}
//                             </h4>
//                             <p className="text-gray-500 text-sm line-clamp-1">
//                               {service.description}
//                             </p>
//                           </div>
//                           <FaArrowRight className="opacity-0 group-hover:opacity-100 transition duration-300 text-gray-500" />
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`relative transition-all duration-300 ${
//                     pathname === item.href
//                       ? "text-orange-500 font-semibold"
//                       : "text-gray-700 hover:text-orange-500"
//                   } ${
//                     item.name === "Stall Fabrication" ||
//                     item.name === "3D Modelling"
//                       ? "font-bold text-orange-500 [text-shadow:1px_1px_2px_#fff,2px_2px_4px_rgba(255,100,0,0.6),4px_4px_10px_rgba(255,80,0,0.4)] hover:[text-shadow:2px_2px_6px_rgba(255,100,0,0.9)] hover:scale-105"
//                       : ""
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               )
//             )}
//           </div>

//           {/* Desktop Social Icons */}
//           <div className="hidden md:flex space-x-4">
//             <Link href="#" className="text-gray-700 hover:text-blue-600">
//               <FaFacebookF />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-pink-500">
//               <FaInstagram />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-blue-400">
//               <FaTwitter />
//             </Link>
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden flex items-center space-x-4">
//             <Link href="#" className="text-gray-700 hover:text-blue-600">
//               <FaFacebookF />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-pink-500">
//               <FaInstagram />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-blue-400">
//               <FaTwitter />
//             </Link>

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-gray-700 text-2xl"
//             >
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden bg-white shadow-lg px-6 py-4 transition-all duration-500 ${
//           menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         {menuLinks.map((item) =>
//           item.name === "Services" ? (
//             <div key={item.name} className="mb-2">
//               <div className="flex items-center justify-between">
//                 <Link
//                   href={item.href}
//                   className="text-gray-700 hover:text-orange-500"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Services
//                 </Link>
//                 <button
//                   onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
//                   className="text-gray-700"
//                 >
//                   {mobileServicesOpen ? "▲" : "▼"}
//                 </button>
//               </div>

//               {mobileServicesOpen && (
//                 <div className="mt-2 bg-white shadow-inner rounded-md p-4 grid gap-2">
//                   {services.map((service, idx) => (
//                     <Link
//                       key={idx}
//                       href={service.href}
//                       className="flex items-center justify-between border-b border-neutral-400 p-2 rounded-md hover:bg-gray-100 group"
//                       onClick={() => {
//                         setMenuOpen(false);
//                         setMobileServicesOpen(false);
//                       }}
//                     >
//                       <div>{service.icon}</div>

//                       <div className="flex-1 mx-4">
//                         <h4 className="font-semibold text-gray-800">
//                           {service.title}
//                         </h4>

//                         {/* FIX: Single line description on mobile */}
//                         <p className="text-gray-500 text-sm line-clamp-1 leading-tight">
//                           {service.description}
//                         </p>
//                       </div>

//                       <FaArrowRight className="opacity-0 group-hover:opacity-100 text-gray-500" />
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`block py-2 ${
//                 pathname === item.href
//                   ? "text-orange-500 font-semibold"
//                   : "text-gray-700 hover:text-orange-500"
//               }`}
//               onClick={() => setMenuOpen(false)}
//             >
//               {item.name}
//             </Link>
//           )
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaLaptopCode,
//   FaMobileAlt,
//   FaCloud,
//   FaChartLine,
//   FaHeadset,
//   FaArrowRight,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import { CldImage } from "next-cloudinary";
// import { Button } from "./ui/button";

// function Navbar() {
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

//   const pathname = usePathname();

//   const services = [
//     {
//       icon: <FaLaptopCode className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Digital Sales Infrastructure & Automation",
//       description:
//         "We build landing pages, Integrate CRM, Implement Automation, and set up analytics to streamline your sales process",
//       href: "/services/web-development",
//     },
//     {
//       icon: <FaMobileAlt className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Ecommerce Marketing & Product Promotion",
//       description:
//         "We optimize your presence on Amazon and Flipkart, Run targeted product ads, and boost cross-sales to increase revenue",
//       href: "/services/app-development",
//     },
//     {
//       icon: <FaInstagram className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Social Media Growth & Brand Engagement",
//       description:
//         "We create engaging content, manage campaigns, and collaborate to grow your brand’s reach and engagement",
//       href: "/services/cloud-services",
//     },
//     {
//       icon: <FaChartLine className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Digital Advertising & ROI Campaigns",
//       description:
//         "We design Google Ads, Retargeting Campaigns, and Lead funnels to maximize ROI and drive measurable results",
//       href: "/services/seo-optimization",
//     },
//     {
//       icon: <FaHeadset className="w-6 h-6" style={{ color: "#E84E1B" }} />,
//       title: "Search & Content Marketing",
//       description:
//         "We leverage SEO, blogs, YouTube, and email/WhatsApp campaigns to enhance visibility and attract your target audience",
//       href: "/services/support",
//     },
//   ];

//   const menuLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Case Studies", href: "/casestudies" },
//     { name: "Contact", href: "/contact" },

//     // ⭐ UPDATED BUTTON ITEMS
//     { name: "Stall Fabrication", href: "/stallfabrication", isButton: true },
//     { name: "3D Modelling", href: "/threed", isButton: true },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
//         setShowNavbar(false);
//       } else {
//         setShowNavbar(true);
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <nav
//       className={`w-full bg-white fixed top-0 left-0 z-50 transition-transform duration-300 ${
//         showNavbar ? "translate-y-0" : "-translate-y-24"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto pb-4 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between mt-4 items-center ">
//           <div className="flex-shrink-0">
//             <Link href="/">
//               <CldImage
//                 src="logos_png-01_nllylj"
//                 alt="Logo"
//                 width={180}
//                 height={50}
//                 quality="auto"
//                 format="auto"
//               />
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {menuLinks.map((item) =>
//               item.name === "Services" ? (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => setServicesOpen(true)}
//                   onMouseLeave={() => setServicesOpen(false)}
//                 >
//                   <Link
//                     href={item.href}
//                     className={`flex items-center gap-1 transition duration-300 ${
//                       pathname.startsWith("/services")
//                         ? "text-orange-500 font-semibold"
//                         : "text-gray-700 hover:text-orange-500"
//                     }`}
//                   >
//                     Services ▼
//                   </Link>

//                   {servicesOpen && (
//                     <div className="absolute top-full left-0 mt-2 w-[30rem] bg-white shadow-lg rounded-md p-4 grid grid-cols-1 gap-2 z-50">
//                       {services.map((service, idx) => (
//                         <Link
//                           key={idx}
//                           href={service.href}
//                           className="flex items-center justify-between border-b border-gray-200 p-2 rounded-md hover:bg-gray-100 group transition duration-300"
//                         >
//                           <div>{service.icon}</div>
//                           <div className="flex-1 mx-4">
//                             <h4 className="font-semibold text-gray-800">
//                               {service.title}
//                             </h4>
//                             <p className="text-gray-500 text-sm line-clamp-1">
//                               {service.description}
//                             </p>
//                           </div>
//                           <FaArrowRight className="opacity-0 group-hover:opacity-100 transition duration-300 text-gray-500" />
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : item.isButton ? (
//                 // ⭐ BUTTON STYLE DESKTOP
//                 // <Link
//                 //   key={item.name}
//                 //   href={item.href}
//                 //   className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
//                 // >
//                 //   {item.name}
//                 // </Link>
//                 <Button variant="orange">
//                   <Link key={item.name} href={item.href}>
//                     {item.name}
//                   </Link>
//                 </Button>
//               ) : (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`transition-all duration-300 ${
//                     pathname === item.href
//                       ? "text-orange-500 font-semibold"
//                       : "text-gray-700 hover:text-orange-500"
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               )
//             )}
//           </div>

//           {/* Desktop Icons */}
//           <div className="hidden md:flex space-x-4">
//             <Link href="#" className="text-gray-700 hover:text-blue-600">
//               <FaFacebookF />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-pink-500">
//               <FaInstagram />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-blue-400">
//               <FaTwitter />
//             </Link>
//           </div>

//           {/* Mobile */}
//           <div className="md:hidden flex items-center space-x-4">
//             <Link href="#" className="text-gray-700 hover:text-blue-600">
//               <FaFacebookF />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-pink-500">
//               <FaInstagram />
//             </Link>
//             <Link href="#" className="text-gray-700 hover:text-blue-400">
//               <FaTwitter />
//             </Link>

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-gray-700 text-2xl"
//             >
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden bg-white shadow-lg px-6 py-4 transition-all duration-500 ${
//           menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         {menuLinks.map((item) =>
//           item.name === "Services" ? (
//             <div key={item.name} className="mb-2">
//               <div className="flex items-center justify-between">
//                 <Link
//                   href={item.href}
//                   className="text-gray-700 hover:text-orange-500"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Services
//                 </Link>
//                 <button
//                   onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
//                   className="text-gray-700"
//                 >
//                   {mobileServicesOpen ? "▲" : "▼"}
//                 </button>
//               </div>

//               {mobileServicesOpen && (
//                 <div className="mt-2 bg-white shadow-inner rounded-md p-4 grid gap-2">
//                   {services.map((service, idx) => (
//                     <Link
//                       key={idx}
//                       href={service.href}
//                       className="flex items-center justify-between border-b border-neutral-400 p-2 rounded-md hover:bg-gray-100 group"
//                       onClick={() => {
//                         setMenuOpen(false);
//                         setMobileServicesOpen(false);
//                       }}
//                     >
//                       <div>{service.icon}</div>

//                       <div className="flex-1 mx-4">
//                         <h4 className="font-semibold text-gray-800">
//                           {service.title}
//                         </h4>
//                         <p className="text-gray-500 text-sm line-clamp-1 leading-tight">
//                           {service.description}
//                         </p>
//                       </div>

//                       <FaArrowRight className="opacity-0 group-hover:opacity-100 text-gray-500" />
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : item.isButton ? (
//             // ⭐ BUTTON STYLE MOBILE
//             <Button variant="orange">
//               <Link key={item.name} href={item.href}>
//                 {item.name}
//               </Link>
//             </Button>
//           ) : (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`block py-2 ${
//                 pathname === item.href
//                   ? "text-orange-500 font-semibold"
//                   : "text-gray-700 hover:text-orange-500"
//               }`}
//               onClick={() => setMenuOpen(false)}
//             >
//               {item.name}
//             </Link>
//           )
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLaptopCode,
  FaMobileAlt,
  FaChartLine,
  FaHeadset,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pathname = usePathname();

  const services = [
    {
      icon: <FaLaptopCode className="w-5 h-5" />,
      title: "Digital Sales Infrastructure & Automation",
      description:
        "We build landing pages, integrate CRM, implement Automation, and set up analytics to streamline your sales process",
      href: "/services/web-development",
    },
    {
      icon: <FaMobileAlt className="w-5 h-5" />,
      title: "Ecommerce Marketing & Product Promotion",
      description:
        "We optimize your presence on Amazon and Flipkart, Run targeted product ads, and boost cross-sales to increase revenue",
      href: "/services/app-development",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      title: "Social Media Growth & Brand Engagement",
      description:
        "We create engaging content, manage campaigns, and collaborate to grow your brand's reach and success",
      href: "/services/cloud-services",
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      title: "Digital Advertising & ROI Campaigns",
      description:
        "We design Google Ads, Retargeting Campaigns, and Lead funnels to maximize ROI and drive measurable results",
      href: "/services/seo-optimization",
    },
    {
      icon: <FaHeadset className="w-5 h-5" />,
      title: "Search & Content Marketing",
      description:
        "We leverage SEO, blogs, YouTube, and email/WhatsApp campaigns to enhance visibility and attract your target audience",
      href: "/services/support",
    },
  ];

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/casestudies" },
    { name: "Contact", href: "/contact" },
    { name: "Stall Fabrication", href: "/stallfabrication", isButton: true },
    { name: "3D Modelling", href: "/threed", isButton: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide navbar when scrolling down significantly, show immediately when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md fixed top-0 lg:top-0 left-0 z-50 transition-transform duration-300 border-b border-gray-200 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <CldImage
                  src="logos_png-01_nllylj"
                  alt="Logo"
                  width={160}
                  height={45}
                  quality="auto"
                  format="auto"
                  className="w-40 lg:w-48"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {menuLinks.map((item, index) =>
                item.name === "Services" ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        pathname.startsWith("/services")
                          ? "text-orange-500 font-semibold"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      <span>Services</span>
                      <FaChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* Services Dropdown - Compact Grid */}
                    {servicesOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
                        {/* Arrow */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>

                        {/* Services Grid */}
                        <div className="p-3">
                          {services.map((service, idx) => (
                            <Link
                              key={idx}
                              href={service.href}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors duration-200 group"
                              onClick={() => setServicesOpen(false)}
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                                {service.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-orange-600 transition-colors duration-200">
                                  {service.title}
                                </h4>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* View All Link */}
                        <div className="border-t border-gray-200 p-3">
                          <Link
                            href="/services"
                            className="flex items-center justify-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors duration-200"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span>View All Services</span>
                            <FaArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.isButton ? (
                  // Animated Buttons
                  <div key={item.name} className="relative">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0">
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-sm">{item.name}</span>
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                      pathname === item.href
                        ? "text-orange-500 font-semibold"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Social Icons - Mobile */}
              <div className="flex space-x-3">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  <FaFacebookF className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  <FaInstagram className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  <FaTwitter className="w-4 h-4" />
                </Link>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
              >
                {menuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            {menuLinks.map((item) =>
              item.name === "Services" ? (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <Link
                      href={item.href}
                      className="text-gray-700 font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      Services
                    </Link>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="p-1 text-gray-500 hover:text-orange-500 transition-colors duration-200"
                    >
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {mobileServicesOpen && (
                    <div className="ml-4 space-y-2">
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          href={service.href}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileServicesOpen(false);
                          }}
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm">
                              {service.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.isButton ? (
                // Mobile Buttons
                <div key={item.name} className="pt-2">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 border-0">
                    <Link
                      href={item.href}
                      className="flex items-center justify-center space-x-2 w-full"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block p-3 rounded-lg transition-all duration-200 font-medium ${
                    pathname === item.href
                      ? "text-orange-500 font-semibold bg-orange-50"
                      : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}

            {/* Mobile Contact Info */}
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-600 text-sm">
                  <FaPhone className="w-4 h-4 text-orange-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 text-sm">
                  <FaEnvelope className="w-4 h-4 text-orange-500" />
                  <span>info@yourcompany.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
