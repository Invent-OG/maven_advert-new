import React from "react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Maven Advert",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-orange-500 font-bold text-sm tracking-wider uppercase">
          Error 404
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          The page or article you are looking for may have been moved, renamed, or no longer exists.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-full transition-colors shadow-md"
          >
            Back to Home
          </Link>
          <Link
            href="/blogs"
            className="w-full sm:w-auto px-6 py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold text-sm rounded-full transition-colors border border-orange-200"
          >
            Explore Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
