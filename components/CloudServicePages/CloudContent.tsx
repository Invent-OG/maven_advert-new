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

export default function CloudContent() {
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
    <section className="w-full bg-white py-12 px-6 md:px-20">
      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR */}
        <aside className="md:w-1/3 lg:w-1/4 md:sticky top-0 self-start h-fit">
          <div className="flex flex-col gap-8">
            {/* NAVIGATION LINKS */}
            <div className="flex flex-col border-t border-b border-gray-200 divide-y divide-gray-200 bg-gray-50 rounded-lg shadow-sm">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(link.href)}
                  className={`flex items-center justify-between py-4 px-4 font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  <span className="flex items-center gap-2 text-left">
                    {link.name}
                  </span>
                  <span
                    className={`text-xl ${
                      pathname === link.href
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    {link.icon}
                  </span>
                </button>
              ))}
            </div>

            {/* CONTACT BOX */}
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Get in Touch​</h3>
              <p className="text-sm text-gray-300 mb-6">
                We help your brand reach its full potential through innovative
                strategies and creative solutions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-orange-500 px-4 py-3 rounded-md">
                  <FaEnvelope />
                  <span>info@domain.com​</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-orange-500" />
                  <span>+1 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <div className="md:w-2/3 lg:w-3/4 space-y-12">
          {/* TOP SECTION */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Amplified Social Presence​​{" "}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Growing your brand on social media requires creativity,
              consistency, and strategic planning. Every post, campaign, and
              collaboration should drive engagement and strengthen your brand’s
              identity.
            </p>

            {/* BOX SECTION */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Types of Social Media Solutions{" "}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>✔ Content Creation</li>
                  <li>✔ Paid Campaigns</li>
                  <li>✔ Influencer Collaborations​​</li>
                </ul>
              </div>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/digital-marketing-5594712-4676858.png"
                alt="Marketing Illustration"
                className="w-64 h-auto object-contain"
              />
            </div>
          </div>

          {/* STRATEGIES SECTION */}
          <div data-aos="fade-up">
            <h3 className="text-3xl  font-bold text-gray-900 mb-6">
              Engagement Strategies{" "}
            </h3>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h4 className="font-semibold text-xl text-neutral-800 mb-3 underline underline-offset-1">
                  Consistent Content{" "}
                </h4>
                <p className="text-lg">
                  Develop high-quality, relevant content that resonates with
                  your audience and encourages interaction across platforms.​
                </p>
              </div>
              <hr className="text-gray-200" />

              <div>
                <h4 className="font-semibold text-xl text-neutral-800 mb-3 underline underline-offset-1">
                  Targeted Advertising{" "}
                </h4>
                <p className="text-lg">
                  Run paid campaigns and retargeting strategies to reach the
                  right audience and maximize conversions.​
                </p>
              </div>
              <hr className="text-gray-200" />
              <div>
                <h4 className="font-semibold text-xl text-neutral-800 mb-3 underline underline-offset-1">
                  Influencer & Community Growth{" "}
                </h4>
                <p className="text-lg">
                  Partner with influencers and foster online communities to
                  amplify reach, build trust, and drive meaningful engagement.
                </p>
              </div>
            </div>
          </div>

          {/* QUOTE SECTION */}
          <div
            data-aos="fade-right"
            className="bg-yellow-100 border-l-4 border-yellow-400 p-8 rounded-xl"
          >
            <p className="text-lg text-gray-800 italic mb-4">
              “Even when you are marketing to your entire audience or customer
              base, you are still simply speaking to a single human at a time.”
            </p>
            <p className="text-gray-900 font-semibold">
              Jacob Weychert, marketing analyst
            </p>
          </div>

          {/* CONTACT FORM */}
          <div data-aos="fade-down">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get in touch with us
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your name"
                className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Your phone"
                className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="border border-gray-300 rounded-md px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition md:col-span-2 w-fit"
              >
                Send message
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-4 mb-4">
              We are committed to protecting your privacy. We’ll never share
              your email or information with anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
