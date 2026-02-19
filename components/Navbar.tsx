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
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaLayerGroup,
  FaTools,
  FaCube,
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
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Services", href: "/services", icon: <FaLayerGroup /> },
    { name: "Case Studies", href: "/casestudies", icon: <FaBriefcase /> },
    { name: "Contact", href: "/contact", icon: <FaEnvelope /> },
    {
      name: "Stall Fabrication",
      href: "/stallfabrication",
      isButton: true,
      icon: <FaTools />,
    },
    { name: "3D Modelling", href: "/threed", isButton: true, icon: <FaCube /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

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
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
        ${showNavbar ? "top-6 opacity-100" : "-top-40 opacity-0"}
        ${
          menuOpen
            ? "w-[95%] sm:w-[90%] rounded-3xl bg-white shadow-2xl"
            : "w-[85%] max-w-[1200px] h-[70px] rounded-[40px] bg-white shadow-xl border border-gray-100"
        }
        `}
      >
        <div className={`px-8 h-full flex flex-col justify-center`}>
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                <CldImage
                  src="logos_png-01_nllylj"
                  alt="Logo"
                  width={180}
                  height={50}
                  quality="auto"
                  format="auto"
                  className="w-40 md:w-48 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu - "Pill Style" Items */}
            <div
              className={`hidden lg:flex items-center justify-center gap-1 h-full ${
                menuOpen ? "hidden" : ""
              }`}
            >
              {menuLinks.map((item) =>
                item.name === "Services" ? (
                  <div
                    key={item.name}
                    className="relative group h-12 flex items-center"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3 xl:px-4 h-full rounded-full transition-all duration-300 font-sans text-[14px] font-medium tracking-wide
                        ${
                          pathname.startsWith("/services")
                            ? "bg-gray-100 text-gray-900 scale-105"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-105"
                        }
                      `}
                    >
                      <span className="text-lg opacity-80">{item.icon}</span>
                      <span>Services</span>
                      <FaChevronDown
                        className={`w-2.5 h-2.5 transition-transform duration-300 opacity-60 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* Desktop Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-96 p-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 transform transition-all duration-300 origin-top
                      ${
                        servicesOpen
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-2 invisible"
                      }
                      `}
                    >
                      {/* Invisible bridge */}
                      <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

                      {/* Arrow Tip */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>

                      <div className="grid gap-1 p-1 bg-white relative z-10 rounded-xl">
                        {services.map((service, idx) => (
                          <Link
                            key={idx}
                            href={service.href}
                            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-orange-50 transition-colors duration-200 group/item"
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover/item:bg-orange-600 group-hover/item:text-white transition-all duration-200">
                              {service.icon}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-800 group-hover/item:text-orange-700">
                                {service.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 px-2 pb-1 relative z-10 bg-white rounded-b-xl">
                        <Link
                          href="/services"
                          className="flex items-center justify-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-600 py-1 uppercase tracking-wide"
                        >
                          View all services <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : item.isButton ? (
                  <div key={item.name} className="pl-1">
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-bold text-[13px] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                      style={{
                        background:
                          "linear-gradient(180deg, #ff914d 0%, #ff5200 100%)", // Orange gradient matching brand
                      }}
                    >
                      {item.name}
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 xl:px-4 h-12 rounded-full transition-all duration-300 font-sans text-[14px] font-medium tracking-wide whitespace-nowrap
                      ${
                        pathname === item.href
                          ? "bg-gray-100 text-gray-900 scale-105"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-105"
                      }
                    `}
                  >
                    <span className="text-lg opacity-80">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ),
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile Socials (Mini) */}
              <div className="hidden sm:flex items-center gap-2">
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  <FaInstagram size={14} />
                </a>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-50 p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Content - Accordion Expansion */}
          {menuOpen && (
            <div
              className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out pb-6`}
            >
              <div className="flex flex-col space-y-2 mt-4 border-t border-gray-100 pt-4">
                {menuLinks.map((item) =>
                  item.name === "Services" ? (
                    <div
                      key="mobile-services"
                      className="rounded-2xl bg-gray-50 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-800"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-orange-500">{item.icon}</span>{" "}
                          Services
                        </span>
                        <FaChevronDown
                          className={`transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          mobileServicesOpen
                            ? "max-h-[600px] opacity-100 pb-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-3 space-y-1">
                          {services.map((service, i) => (
                            <Link
                              key={i}
                              href={service.href}
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white text-gray-600 hover:text-orange-600 hover:shadow-sm transition-all"
                            >
                              <div className="text-orange-500">
                                {service.icon}
                              </div>
                              <span className="text-sm font-medium">
                                {service.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : item.isButton ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
                    >
                      {item.name} <FaArrowRight />
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={
                          pathname === item.href
                            ? "text-orange-500"
                            : "text-gray-400"
                        }
                      >
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  ),
                )}

                {/* Mobile Contact Footer */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3 px-2">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                      <FaPhone size={12} />
                    </div>
                    <span>+91 7418418012</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                      <FaEnvelope size={12} />
                    </div>
                    <span>info@mavenadvert.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
