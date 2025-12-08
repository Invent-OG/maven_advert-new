"use client";
import React from "react";
import {
  FaUserFriends,
  FaPaperPlane,
  FaBriefcase,
  FaBullhorn,
  FaSearch,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function WebContent() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    {
      name: "Digital Sales Infrastructure & Automation",
      icon: <FaUserFriends />,
      href: "/digital-sales",
    },
    {
      name: "ECommerce Marketing & Product Promotion",
      icon: <FaPaperPlane />,
      href: "/ecommerce-marketing",
    },
    {
      name: "Social Media Growth & Brand Engagement",
      icon: <FaBriefcase />,
      href: "/social-media",
    },
    {
      name: "Digital Advertising & ROI Campaigns",
      icon: <FaBullhorn />,
      href: "/digital-advertising",
    },
    {
      name: "Search & Content Marketing",
      icon: <FaSearch />,
      href: "/search-content",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="w-full bg-white py-8 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR */}
        <aside className="lg:w-1/3 xl:w-1/4 lg:sticky lg:top-8 self-start h-fit">
          <div className="flex flex-col gap-6 md:gap-8">
            {/* NAVIGATION LINKS */}
            <div className="flex flex-col border border-gray-200 divide-y divide-gray-200 bg-gray-50 rounded-lg shadow-sm overflow-hidden">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(link.href)}
                  className={`flex items-center justify-between py-4 px-4 font-medium transition-all duration-300 hover:bg-white ${
                    pathname === link.href
                      ? "text-orange-500 font-semibold bg-white"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  <span className="flex items-center gap-3 text-left text-sm md:text-base">
                    <span className="text-orange-500 text-lg">{link.icon}</span>
                    {link.name}
                  </span>
                </button>
              ))}
            </div>

            {/* CONTACT BOX */}
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Get in Touch​</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                We help your brand reach its full potential through innovative
                strategies and creative solutions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-orange-500 px-4 py-3 rounded-md transition hover:bg-orange-600">
                  <FaEnvelope className="text-white" />
                  <span className="text-sm md:text-base">info@domain.com​</span>
                </div>
                <div className="flex items-center gap-3 px-1">
                  <FaPhone className="text-orange-500" />
                  <span className="text-sm md:text-base">+1 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <div className="lg:w-2/3 xl:w-3/4 space-y-10 md:space-y-12">
          {/* TOP SECTION */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
              Optimized Digital Sales​
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Building an effective sales system doesn&apos;t have to be
              complicated. Laying the groundwork for your processes is just as
              important as implementing the tools that capture leads, track
              customers, and streamline conversions.
            </p>

            {/* BOX SECTION */}
            <div className=" p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border border-gray-200">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                  Types of Sales Solutions
                </h3>
                <ul className="space-y-3 md:space-y-4 text-gray-700 text-base md:text-lg">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✔</span>
                    CRM Setup
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✔</span>
                    Lead Capture Funnels
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✔</span>
                    Analytics & Reporting
                  </li>
                </ul>
              </div>
              <div className="flex-1  flex justify-center">
                {/* <img
                  src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763647219/vectors-06_lj16av.jpg"
                  alt="Marketing Illustration"
                  className="w-full max-w-xs md:max-w-sm h-auto object-contain"
                /> */}
                <Image
                  src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763647219/vectors-06_lj16av.jpg"
                  alt="Marketing Illustration"
                  width={500}
                  height={500}
                  className="w-full max-w-xs md:max-w-sm h-[auto] object-contain"
                />
              </div>
            </div>
          </div>

          {/* STRATEGIES SECTION */}
          <div data-aos="fade-up" className="space-y-6">
            <h3 className="text-2xl md:text-4xl font-bold text-neutral-800">
              Automation Strategies
            </h3>

            <div className="space-y-6 md:space-y-8 text-gray-600 leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-semibold text-xl md:text-xl text-neutral-800 underline underline-offset-6 decoration-orange-500">
                  Streamline Workflows
                </h4>
                <p className="text-base md:text-md">
                  Automate repetitive tasks, manage leads efficiently, and
                  reduce manual effort, allowing your team to focus on
                  high-value activities that drive business growth.
                </p>
              </div>

              <hr className="border-gray-300" />

              <div className="space-y-3">
                <h4 className="font-semibold text-xl md:text-xl text-neutral-800 underline underline-offset-6 decoration-orange-500">
                  Tool Integration
                </h4>
                <p className="text-base md:text-md">
                  Seamlessly connect CRM, landing pages, chatbots, and analytics
                  to ensure smooth operations, consistent data flow, and
                  actionable insights for better decision-making.
                </p>
              </div>

              <hr className="border-gray-300" />

              <div className="space-y-3">
                <h4 className="font-semibold text-xl md:text-xl text-neutral-800 underline underline-offset-6 decoration-orange-500">
                  Continuous Optimization
                </h4>
                <p className="text-base md:text-md">
                  Regularly monitor and analyze performance metrics to refine
                  campaigns, enhance conversion rates, and maximize ROI across
                  all digital sales channels.
                </p>
              </div>
            </div>
          </div>

          {/* QUOTE SECTION */}
          <div
            data-aos="fade-right"
            className="bg-yellow-50 border-l-4 border-yellow-400 p-6 md:p-8 rounded-xl shadow-sm"
          >
            <p className="text-lg md:text-base text-gray-800 italic mb-4 leading-relaxed">
              &quot;Even when you are marketing to your entire audience or
              customer base, you are still simply speaking to a single human at
              a time.&quot;
            </p>
            <p className="text-gray-900 font-semibold text-base md:text-base">
              Jacob Weychert, marketing analyst
            </p>
          </div>

          {/* CONTACT FORM */}
          <div data-aos="fade-up" className="space-y-6">
            <h3 className="text-2xl md:text-4xl font-bold text-neutral-900">
              Get in touch with us
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Your phone"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <textarea
                  placeholder="Your message"
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-vertical"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                {/* <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold text-base md:text-lg shadow-md hover:shadow-lg"
                >
                  Send message
                </button> */}
                <LiquidButton type="submit" size="lg" radius="md">
                  Contact now
                </LiquidButton>
              </div>
            </form>

            <p className="text-gray-500 text-sm mt-4 mb-12 ">
              We are committed to protecting your privacy. We&apos;ll never
              share your email or information with anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
