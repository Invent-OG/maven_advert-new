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
  FaCloud,
  FaChartLine,
  FaHeadset,
  FaArrowRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pathname = usePathname();

  const services = [
    {
      icon: <FaLaptopCode className="text-blue-500 w-6 h-6" />,
      title: "Digital Sales Infrastructure & Automation",
      description:
        "We build landing pages, Integrate CRM, Implement Automation, and set up analytics to streamline your sales process",
      href: "/services/web-development",
    },
    {
      icon: <FaMobileAlt className="text-green-500 w-6 h-6" />,
      title: "Ecommerce Marketing & Product Promotion",
      description:
        "We optimize your presence on Amazon and Flipkart, Run targeted product ads, and boost cross-sales to increase revenue",
      href: "/services/app-development",
    },
    {
      icon: <FaCloud className="text-purple-500 w-6 h-6" />,
      title: "Social Media Growth & Brand Engagement",
      description:
        "We create engaging content, manage campaigns, and collaborate to grow your brand’s reach and engagement",
      href: "/services/cloud-services",
    },
    {
      icon: <FaChartLine className="text-yellow-500 w-6 h-6" />,
      title: "Digital Advertising & ROI Campaigns:",
      description:
        "We design Google Ads, Retargeting Campaigns, and Lead funnels to maximize ROI and drive measurable results",
      href: "/services/seo-optimization",
    },
    {
      icon: <FaHeadset className="text-red-500 w-6 h-6" />,
      title: "Search & Content Marketing:",
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
    { name: "Stall Fabrication", href: "/stallfabrication" },
    { name: "3D Modelling", href: "/threed" },
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
      className={`w-full bg-white fixed top-0 left-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      <div className="max-w-7xl mx-auto pb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between mt-4 items-center ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-logo-black.svg"
                alt="Logo"
                width={150}
                height={50}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center  space-x-8">
            {menuLinks.map((item) =>
              item.name === "SERVICES" ? (
                // parent handles hover/focus to open dropdown
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                  onBlur={() => setServicesOpen(false)}
                >
                  {/* Clicking this Link navigates to /services */}
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 transition duration-300 ${
                      pathname.startsWith("/services")
                        ? "text-orange-500 font-semibold"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    tabIndex={0}
                  >
                    Services ▼
                  </Link>

                  {/* Dropdown shown on hover/focus */}
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[30rem] bg-white shadow-lg rounded-md p-4 grid grid-cols-1 gap-2 z-50">
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          href={service.href}
                          className="flex items-center justify-between border-b border-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300 group"
                        >
                          <div className="flex-shrink-0">{service.icon}</div>
                          <div className="flex-1 mx-4">
                            <h4 className="font-semibold text-gray-800">
                              {service.title}
                            </h4>
                            {/* truncate; you can replace 'line-clamp-1' with desired truncation */}
                            <p className="text-gray-500 line-clamp-1 text-sm">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-gray-500 opacity-0 group-hover:opacity-100 transition duration-300">
                            <FaArrowRight />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative transition-all duration-300 ${
                    pathname === item.href
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  } ${
                    item.name === "Stall Fabrication" ||
                    item.name === "3D modelling"
                      ? "font-bold text-orange-500 [text-shadow:1px_1px_2px_#fff,2px_2px_4px_rgba(255,100,0,0.6),4px_4px_10px_rgba(255,80,0,0.4)] hover:[text-shadow:2px_2px_6px_rgba(255,100,0,0.9)] transform hover:scale-105 transition-all duration-300"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop Social Icons */}
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

          {/* Mobile Right Side */}
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
              className="text-gray-700 text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <FaTimes className="transition-transform duration-300 rotate-180" />
              ) : (
                <FaBars className="transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg px-6 py-4 transition-all duration-500 ease-in-out ${
          menuOpen
            ? "max-h-[1000px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        {menuLinks.map((item) =>
          item.name === "SERVICES" ? (
            <div key={item.name} className="mb-2">
              {/* Row: left -> link navigates, right -> toggle chevron */}
              <div className="flex items-center justify-between">
                {/* Clicking this Link will navigate to /services */}
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500 transition duration-300 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Services
                </Link>

                {/* Chevron toggles the mobile sub-menu */}
                <button
                  onClick={() => setMobileServicesOpen((s) => !s)}
                  aria-expanded={mobileServicesOpen}
                  aria-label="Toggle services submenu"
                  className="text-gray-700"
                >
                  {/* simple chevron text; you can replace with an icon */}
                  {mobileServicesOpen ? "▲" : "▼"}
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="mt-2 w-full bg-white shadow-inner rounded-md p-4 grid grid-cols-1 gap-2">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="flex items-center justify-between border-b border-neutral-400 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300 group"
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileServicesOpen(false);
                      }}
                    >
                      <div className="flex-shrink-0">{service.icon}</div>
                      <div className="flex-1 mx-4">
                        <h4 className="font-semibold text-gray-800">
                          {service.title}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-gray-500 opacity-0 group-hover:opacity-100 transition duration-300">
                        <FaArrowRight />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2 transition duration-300 ${
                pathname === item.href
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              } ${
                item.name === "Stall Fabrication" ||
                item.name === "3D modelling"
                  ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                  : ""
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
