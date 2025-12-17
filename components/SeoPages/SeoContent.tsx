"use client";
import React, { useEffect } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";
import { LiquidButton } from "../ui/liquid-glass-button";

export default function SeoContent() {
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
            {/* NAVIGATION LINKS — Updated to same design */}
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

            {/* CONTACT BOX (same design) */}
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Get in Touch​</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                We help your brand reach its full potential through innovative
                strategies and creative solutions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-orange-500 px-4 py-3 rounded-md transition hover:bg-orange-600">
                  <FaEnvelope className="text-white" />
                  <span className="text-sm md:text-base">info@mavenadvert.com​</span>
                </div>
                <div className="flex items-center gap-3 px-1">
                  <FaPhone className="text-orange-500" />
                  <span className="text-sm md:text-base">+1 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="lg:w-2/3 xl:w-3/4 space-y-10 md:space-y-12">
          {/* TOP SECTION */}
          <div data-aos="fade-up" className="space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Maximized Digital Impact​​​
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Running effective digital advertising campaigns requires precise
              targeting, creativity, and constant optimization. Every ad should
              contribute to measurable results and a positive return on
              investment.
            </p>

            {/* BOX SECTION (matched to design — gradient + border + spacing) */}
            <div className=" p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border border-gray-200">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                  Types of Advertising Solutions
                </h3>

                <ul className="space-y-3 md:space-y-4 text-gray-700 text-base md:text-lg">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✔</span>
                    Google & Display Ads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✔</span>
                    Retargeting Campaigns
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 text-lg">✔</span>
                    Lead Funnel Optimization
                  </li>
                </ul>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763647210/vectors-01_rj9ia3.jpg"
                  alt="Marketing Illustration"
                  className="w-full max-w-xs md:max-w-sm h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* STRATEGIES SECTION */}
          <div data-aos="fade-up" className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Campaign Strategies
            </h3>

            <div className="space-y-6 md:space-y-8 text-gray-600 leading-relaxed">
              <div className="space-y-3">
                <h4 className="font-semibold text-xl md:text-2xl text-neutral-800 underline underline-offset-4 decoration-orange-500">
                  Precision Targeting
                </h4>
                <p className="text-base md:text-lg">
                  Identify and reach the right audience through data-driven
                  targeting to increase relevance and engagement.
                </p>
              </div>

              <hr className="border-gray-300" />

              <div className="space-y-3">
                <h4 className="font-semibold text-xl md:text-2xl text-neutral-800 underline underline-offset-4 decoration-orange-500">
                  Optimized Ad Funnels
                </h4>
                <p className="text-base md:text-lg">
                  Design and refine lead funnels that guide prospects from
                  awareness to conversion efficiently.
                </p>
              </div>

              <hr className="border-gray-300" />

              <div className="space-y-3">
                <h4 className="font-semibold text-xl md:text-2xl text-neutral-800 underline underline-offset-4 decoration-orange-500">
                  Performance Monitoring
                </h4>
                <p className="text-base md:text-lg">
                  Continuously track campaign metrics, adjust strategies, and
                  optimize budgets to maximize ROI and business growth.
                </p>
              </div>
            </div>
          </div>

          {/* QUOTE BOX */}
          <div
            data-aos="fade-right"
            className="bg-yellow-50 border-l-4 border-yellow-400 p-6 md:p-8 rounded-xl shadow-sm"
          >
            <p className="text-lg md:text-xl text-gray-800 italic mb-4 leading-relaxed">
              “Even when you are marketing to your entire audience or customer
              base, you are still simply speaking to a single human at a time.”
            </p>

            <p className="text-gray-900 font-semibold text-base md:text-lg">
              Jacob Weychert, marketing analyst
            </p>
          </div>

          {/* CONTACT FORM */}
          <div data-aos="fade-up" className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Get in touch with us
            </h3>

            <ContactForm />

            <p className="text-gray-500 text-sm mt-4 mb-12">
              We are committed to protecting your privacy. We’ll never share
              your information with anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsappNumber: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Thanks! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Something went wrong: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your email address"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Your phone"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        placeholder="Your message"
        required
        className="w-full md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      ></textarea>

      <div className="md:col-span-2">
        <LiquidButton type="submit" size="lg">
          <span className="flex items-center gap-2">
            {isSubmitting ? "Sending..." : "Contact now"}{" "}
            {!isSubmitting && <FaPaperPlane />}
          </span>
        </LiquidButton>
      </div>
    </form>
  );
}
