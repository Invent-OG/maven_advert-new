import React from "react";
import {
  FaUserFriends,
  FaPaperPlane,
  FaBriefcase,
  FaCube,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function WebContent() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20">
      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <aside className="md:w-1/3 lg:w-1/4 sticky top-24 self-start">
          <div className="flex flex-col gap-6">
            {/* Navigation Links */}
            <div className="flex flex-col border-t border-b border-gray-200 divide-y divide-gray-200">
              <button className="flex items-center justify-between py-4 text-gray-700 font-medium hover:text-orange-500 transition">
                <span className="flex items-center gap-2">
                  <FaUserFriends /> Engaging audiences
                </span>
              </button>

              <button className="flex items-center justify-between py-4 text-gray-700 font-medium hover:text-orange-500 transition">
                <span className="flex items-center gap-2">
                  <FaPaperPlane /> Marketing research
                </span>
              </button>

              <button className="flex items-center justify-between py-4 text-gray-700 font-medium hover:text-orange-500 transition">
                <span className="flex items-center gap-2">
                  <FaBriefcase /> Sales development
                </span>
              </button>

              <button className="flex items-center justify-between py-4 text-orange-500 font-semibold">
                <span className="flex items-center gap-2">
                  <FaCube /> Marketing campaigns
                </span>
              </button>
            </div>

            {/* Contact Box */}
            <div className="bg-gray-900 text-white p-6 rounded-lg">
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
        <div className="md:w-2/3 lg:w-3/4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Successful marketing campaign
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Creating an entire campaign is a big task, but the process is pretty
            straightforward. Planning your campaign is just as important as
            designing the fun stuff, such as the creative advertisements and
            conversion assets, so take the time to do this important step.
          </p>

          {/* Box Section */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
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

          {/* Additional Content */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Strategies for marketing campaign
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            To make your campaign truly successful, you need to identify your
            target audience, define clear goals, and craft a message that
            resonates. Combine traditional and digital approaches for maximum
            impact.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Effective campaign strategies involve storytelling, audience
            segmentation, and consistent follow-ups through multiple channels.
            Data-driven insights ensure that every campaign is optimized for the
            best results.
          </p>
        </div>
      </div>
    </section>
  );
}
