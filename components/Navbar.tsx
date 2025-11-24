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
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pathname = usePathname();

  const services = [
    {
      icon: <FaLaptopCode className="w-6 h-6" style={{ color: "#E84E1B" }} />,
      title: "Digital Sales Infrastructure & Automation",
      description:
        "We build landing pages, Integrate CRM, Implement Automation, and set up analytics to streamline your sales process",
      href: "/services/web-development",
    },
    {
      icon: <FaMobileAlt className="w-6 h-6" style={{ color: "#E84E1B" }} />,
      title: "Ecommerce Marketing & Product Promotion",
      description:
        "We optimize your presence on Amazon and Flipkart, Run targeted product ads, and boost cross-sales to increase revenue",
      href: "/services/app-development",
    },
    {
      icon: <FaInstagram className="w-6 h-6" style={{ color: "#E84E1B" }} />,
      title: "Social Media Growth & Brand Engagement",
      description:
        "We create engaging content, manage campaigns, and collaborate to grow your brand’s reach and engagement",
      href: "/services/cloud-services",
    },
    {
      icon: <FaChartLine className="w-6 h-6" style={{ color: "#E84E1B" }} />,
      title: "Digital Advertising & ROI Campaigns",
      description:
        "We design Google Ads, Retargeting Campaigns, and Lead funnels to maximize ROI and drive measurable results",
      href: "/services/seo-optimization",
    },
    {
      icon: <FaHeadset className="w-6 h-6" style={{ color: "#E84E1B" }} />,
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
    { name: "3D Modelling", href: "/threed" }, // replaced below
    { name: "Stall Fabrication", href: "/stallfabrication" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full bg-white rounded-full fixed top-0 left-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div className="max-w-7xl mx-auto pb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between mt-4 items-center ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <CldImage
                src="logos_png-01_nllylj"
                alt="Logo"
                width={180}
                height={50}
                quality="auto"
                format="auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuLinks.map((item) =>
              item.name === "Services" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 transition duration-300 ${
                      pathname.startsWith("/services")
                        ? "text-orange-500 font-semibold"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    Services ▼
                  </Link>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[30rem] bg-white shadow-lg rounded-md p-4 grid grid-cols-1 gap-2 z-50">
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          href={service.href}
                          className="flex items-center justify-between border-b border-gray-200 p-2 rounded-md hover:bg-gray-100 group transition duration-300"
                        >
                          <div>{service.icon}</div>
                          <div className="flex-1 mx-4">
                            <h4 className="font-semibold text-gray-800">
                              {service.title}
                            </h4>
                            <p className="text-gray-500 text-sm line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                          <FaArrowRight className="opacity-0 group-hover:opacity-100 transition duration-300 text-gray-500" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.name === "3D Modelling" ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center transition-all duration-300 ${
                    pathname === item.href
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  <img
                    src="https://www.svgrepo.com/show/41736/3d-symbol.svg"
                    alt="3D Icon"
                    className="w-9 h-9 premium-3d-icon"
                  />
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative transition-all duration-300 ${
                    pathname === item.href
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  } ${
                    item.name === "Stall Fabrication"
                      ? "font-bold text-orange-500 [text-shadow:1px_1px_2px_#fff,2px_2px_4px_rgba(255,100,0,0.6),4px_4px_10px_rgba(255,80,0,0.4)] hover:[text-shadow:2px_2px_6px_rgba(255,100,0,0.9)] hover:scale-105"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex space-x-4">
            <Link href="#" className="text-gray-700 hover:text-blue-600">
              <FaFacebookF />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-pink-500">
              <FaInstagram />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-400">
              <FaTwitter />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="#" className="text-gray-700 hover:text-blue-600">
              <FaFacebookF />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-pink-500">
              <FaInstagram />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-400">
              <FaTwitter />
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 text-2xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white shadow-lg px-6 py-4 transition-all duration-500 ${
          menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {menuLinks.map((item) =>
          item.name === "Services" ? (
            <div key={item.name} className="mb-2">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </Link>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="text-gray-700"
                >
                  {mobileServicesOpen ? "▲" : "▼"}
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="mt-2 bg-white shadow-inner rounded-md p-4 grid gap-2">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="flex items-center justify-between border-b border-neutral-400 p-2 rounded-md hover:bg-gray-100 group"
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileServicesOpen(false);
                      }}
                    >
                      <div>{service.icon}</div>

                      <div className="flex-1 mx-4">
                        <h4 className="font-semibold text-gray-800">
                          {service.title}
                        </h4>

                        <p className="text-gray-500 text-sm line-clamp-1 leading-tight">
                          {service.description}
                        </p>
                      </div>

                      <FaArrowRight className="opacity-0 group-hover:opacity-100 text-gray-500" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : item.name === "3D Modelling" ? (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center py-2"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src="https://www.svgrepo.com/show/41736/3d-symbol.svg"
                alt="3D Icon"
                className="w-9 h-9 premium-3d-icon"
              />
            </Link>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2 ${
                pathname === item.href
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
