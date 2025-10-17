"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaFacebookF,
  FaDribbble,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { gsap } from "gsap";

const languages = ["Hello", "Hola", "Bonjour", "Ciao"];

export default function GetInTouch() {
  const helloRef = useRef(null);
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out
      gsap.to(helloRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -20,
        duration: 0.5,
        onComplete: () => {
          // Change language
          setLangIndex((prev) => (prev + 1) % languages.length);

          // Animate in
          gsap.fromTo(
            helloRef.current,
            { opacity: 0, scale: 0.5, rotation: 20 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            }
          );
        },
      });
    }, 2500); // Slightly longer interval for better effect

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white min-h-screen flex flex-col py-16 px-6 md:px-20">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row mx-auto gap-12 flex-1">
        {/* Left Side - Contact Info */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <span className="text-sm text-orange-500 font-semibold">
            GET IN TOUCH WITH US
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Do you need help? <br />
            Contact with us now!
          </h2>

          <div className="flex flex-col gap-6 mt-6">
            {/* Coffee */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-full">
                <FaComment className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-xl text-gray-900">
                  Are you ready for coffee?
                </p>
                <p className="text-gray-500 text-lg ">
                  401 Broadway, 24th Floor, <br />
                  Orchard View, London
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-full">
                <FaUser className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-xl text-gray-900">
                  Feel free to get in touch?
                </p>
                <p className="text-gray-500 text-lg">
                  Phone: 1-800-222-000 <br />
                  Fax: 1-800-222-002
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 rounded-full">
                <FaEnvelope className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-xl text-gray-900">
                  How can we help you?
                </p>
                <p className="text-gray-500 text-lg">
                  info@yourdomain.com <br />
                  help@yourdomain.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-8 relative flex flex-col justify-between">
          <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
            Say <span ref={helloRef}>{languages[langIndex]}</span>
          </h2>
          <form className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your name*"
                className="w-full border-b border-gray-300 focus:outline-none py-6 pr-10"
              />
              <FaUser className="absolute right-2 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email*"
                className="w-full border-b border-gray-300 focus:outline-none py-6 pr-10"
              />
              <FaEnvelope className="absolute right-2 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <textarea
                placeholder="Enter your message"
                className="w-full border-b border-gray-300 focus:outline-none py-8 pr-10 resize-none"
              ></textarea>
              <FaComment className="absolute right-2 top-2.5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="mt-4 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              Send message
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">
            I understand that my data will be hold securely in accordance with
            the{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        <span className="font-semibold text-2xl text-gray-900">
          Connect with social media
        </span>
        <div className="w-32 border-t border-gray-300 hidden md:block"></div>
        <div className="flex items-center gap-4">
          {/* Facebook */}
          <div className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all">
            <FaFacebookF className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all"></span>
          </div>

          {/* Dribbble */}
          <div className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all">
            <FaDribbble className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-all"></span>
          </div>

          {/* X (Twitter) */}
          <div className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all">
            <FaXTwitter className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-all"></span>
          </div>

          {/* Instagram */}
          <div className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all">
            <FaInstagram className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all"></span>
          </div>

          {/* LinkedIn */}
          <div className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all">
            <FaLinkedinIn className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-blue-700 opacity-0 group-hover:opacity-100 transition-all"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
