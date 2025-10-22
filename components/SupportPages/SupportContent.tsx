"use client";
import React from "react";
import {
  FaUserFriends,
  FaPaperPlane,
  FaBriefcase,
  FaCube,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function CloudContent() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20">
      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <aside className="md:w-1/3 lg:w-1/4 sticky top-24 self-start h-fit">
          <div className="flex flex-col gap-8">
            {/* Navigation Links */}
            <div className="flex flex-col border-t border-b border-gray-200 divide-y divide-gray-200 bg-gray-50 rounded-lg shadow-sm">
              <button className="flex items-center justify-between py-4 px-4 text-gray-700 font-medium hover:text-orange-500 transition">
                <span className="flex items-center gap-2">
                  <FaUserFriends /> Engaging audiences
                </span>
              </button>

              <button className="flex items-center justify-between py-4 px-4 text-gray-700 font-medium hover:text-orange-500 transition">
                <span className="flex items-center gap-2">
                  <FaPaperPlane /> Marketing research
                </span>
              </button>

              <button className="flex items-center justify-between py-4 px-4 text-gray-700 font-medium hover:text-orange-500 transition">
                <span className="flex items-center gap-2">
                  <FaBriefcase /> Sales development
                </span>
              </button>

              <button className="flex items-center justify-between py-4 px-4 text-orange-500 font-semibold">
                <span className="flex items-center gap-2">
                  <FaCube /> Marketing campaigns
                </span>
              </button>
            </div>

            {/* Contact Box */}
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Have questions?</h3>
              <p className="text-sm text-gray-300 mb-6">
                We unleash your business potential by maximizing innovation.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-orange-500 px-4 py-3 rounded-md">
                  <FaEnvelope />
                  <span>info@domain.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-orange-500" />
                  <span>+1 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <div className="md:w-2/3 lg:w-3/4 space-y-12">
          {/* Top Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Successful marketing campaign
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Creating an entire campaign is a big task, but the process is
              pretty straightforward. Planning your campaign is just as
              important as designing the creative advertisements and conversion
              assets, so take the time to do this important step.
            </p>

            {/* Box Section */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Types of marketing campaigns
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>✔ Product marketing campaign</li>
                  <li>✔ Brand development campaign</li>
                  <li>✔ Email marketing campaign</li>
                  <li>✔ Content marketing campaign</li>
                </ul>
              </div>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/digital-marketing-5594712-4676858.png"
                alt="Marketing Illustration"
                className="w-64 h-auto object-contain"
              />
            </div>
          </div>

          {/* Strategies Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Strategies for marketing campaign
            </h3>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 underline-offset-1 underline">
                  Develop your market’s understanding ;
                </h4>
                <p>
                  A business’s target market refers to the audience that the
                  company aims to attract and sell its products or services to.
                  A marketing campaign must focus on understanding customer
                  behavior and motivations before launching ads.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-1 underline-offset-1 underline">
                  Coordinate with other campaigns;
                </h4>
                <p>
                  A marketing plan might include multiple campaigns that
                  reinforce one another. Aligning your campaign message with
                  other ongoing promotions ensures consistency and brand
                  recognition across all platforms.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-1 underline-offset-1 underline">
                  Follow timelines and key milestones;
                </h4>
                <p>
                  A well-structured timeline allows marketers to track progress,
                  maintain deadlines, and adjust strategies when needed.
                  Organize your campaign calendar to ensure smooth execution
                  across channels.
                </p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-8 rounded-xl">
            <p className="text-lg text-gray-800 italic mb-4">
              “Even when you are marketing to your entire audience or customer
              base, you are still simply speaking to a single human at a time.”
            </p>
            <p className="text-gray-900 font-semibold">
              Jacob Weychert, marketing analyst
            </p>
          </div>

          {/* Contact Form */}
          <div>
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

            <p className="text-gray-500 text-sm mt-4 mb-4 ">
              We are committed to protecting your privacy. We’ll never share
              your email or information with anyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
