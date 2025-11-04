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

  // ✅ Each service now includes a route
  const services = [
    {
      icon: <FaLaptopCode className="text-blue-500 w-6 h-6" />,
      title: "Web Development",
      description: "Build responsive and modern websites",
      href: "/services/web-development",
    },
    {
      icon: <FaMobileAlt className="text-green-500 w-6 h-6" />,
      title: "App Development",
      description: "iOS and Android apps",
      href: "/services/app-development",
    },
    {
      icon: <FaCloud className="text-purple-500 w-6 h-6" />,
      title: "Cloud Services",
      description: "Scalable cloud solutions",
      href: "/services/cloud-services",
    },
    {
      icon: <FaChartLine className="text-yellow-500 w-6 h-6" />,
      title: "SEO Optimization",
      description: "Boost your website ranking",
      href: "/services/seo-optimization",
    },
    {
      icon: <FaHeadset className="text-red-500 w-6 h-6" />,
      title: "Support",
      description: "24/7 customer support",
      href: "/services/support",
    },
  ];

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/casestudies" },
    { name: "Stall Fabrication", href: "/stallfabrication" },
    { name: "3D", href: "/threed" },
    { name: "Contact", href: "/contact" },
  ];

  // Hide navbar on scroll down
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:flex items-center space-x-8">
            {menuLinks.map((item) =>
              item.name === "Services" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 transition duration-300 ${
                      pathname.startsWith("/services")
                        ? "text-orange-500 font-semibold"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    Services ▼
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white shadow-lg rounded-md p-4 grid grid-cols-1 gap-2 z-50">
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          href={service.href}
                          className="flex items-center justify-between border-b border-neutral-400 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300 group"
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
                  className={`text-gray-700 transition duration-300 ${
                    pathname === item.href
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
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
          item.name === "Services" ? (
            <div key={item.name}>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full text-left flex justify-between items-center text-gray-700 hover:text-orange-500 transition duration-300"
              >
                Services ▼
              </button>
              {mobileServicesOpen && (
                <div className="mt-2 w-full bg-white shadow-inner rounded-md p-4 grid grid-cols-1 gap-2">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="flex items-center justify-between border-b border-neutral-400 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300 group"
                      onClick={() => setMenuOpen(false)}
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
