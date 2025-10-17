import React from "react";
import {
  FaThumbsUp,
  FaMousePointer,
  FaBullhorn,
  FaQuestion,
} from "react-icons/fa";

function MarketingAgency() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 min-h-screen">
      {/* Top Badge */}
      <div className="mb-4">
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
          WELCOME TO MARKETING AGENCY
        </span>
      </div>

      {/* Header and Description */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 gap-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 md:w-1/2">
          Guiding your business to achieve success.
        </h2>
        <p className="text-gray-500 text-lg md:w-1/2">
          We curate an excellent quality hand-crafted email template designs
          that enhance readability of users with possibility. We believe in
          maintaining long-term relationship.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:mt-24 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaThumbsUp className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">
            Trusted company
          </h4>
          <p className="text-gray-500 text-base">
            Digital marketing that helps you to promote the world.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaMousePointer className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg mb-2">
            Professional work
          </h4>
          <p className="text-gray-500 text-base">
            We never fail for support for your business anywhere.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaBullhorn className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg  mb-2">
            Award winning
          </h4>
          <p className="text-gray-500 text-base">
            Digital marketing that helps you to promote the world.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <div className="bg-orange-50 p-4 rounded-full mb-4">
            <FaQuestion className="text-6xl text-gray-900" />
          </div>
          <h4 className="font-bold text-gray-900 text-lg  mb-2">
            Help any time
          </h4>
          <p className="text-gray-500 text-base">
            We never fail for support for your business anywhere.
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-12 flex items-center justify-center gap-2 text-gray-600 font-semibold">
        <span className="font-serif text-md">
          We provide <strong>quality marketing</strong> services to customers.
        </span>
      </div>
    </section>
  );
}

export default MarketingAgency;
