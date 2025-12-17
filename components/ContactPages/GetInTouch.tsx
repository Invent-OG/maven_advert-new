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
  FaPhoneAlt,
  FaPaperPlane,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { gsap } from "gsap";
import toast from "react-hot-toast"; // ✅ import toast
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedButton from "../ui/AnimatedButton";
import Link from "next/link";
import { LiquidButton } from "../ui/liquid-glass-button";

const languages = ["Hello", "Hola", "Bonjour", "Ciao"];

export default function GetInTouch() {
  const helloRef = useRef(null);
  const [langIndex, setLangIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // GSAP animation for "Hello" text
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(helloRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -20,
        duration: 0.5,
        onComplete: () => {
          setLangIndex((prev) => (prev + 1) % languages.length);
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
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const whatsappNumber = formData.get("whatsappNumber");
    const message = formData.get("message");

    // Show loading toast
    const toastId = toast.loading("Sending your message...", {
      position: "top-right",
    });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsappNumber, message }),
      });

      const result = await res.json();
      toast.dismiss(toastId);
      setLoading(false);

      if (result.success) {
        toast.success("🎉 Message sent successfully! Check your email soon.", {
          position: "top-right",
        });
        form.reset();
      } else {
        toast.error("❌ Failed to send message. Please try again later.", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.dismiss(toastId);
      toast.error("⚠️ Something went wrong. Try again later.", {
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white min-h-screen flex flex-col py-16 px-6 md:px-20">
      <div className="flex flex-col md:flex-row mx-auto gap-12 flex-1">
        {/* Left Side */}
        <div
          data-aos="fade-down"
          className="flex-1 flex flex-col justify-center gap-4"
        >
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
                  13a, Kulalar Street, Peelamedu,<br />
                  Coimbatore - 641004
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
                  Phone: +91 7418418012

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
                  info@mavenadvert.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div
          data-aos="fade-down"
          className="flex-1 bg-white shadow-lg rounded-lg p-8 relative flex flex-col justify-between"
        >
          <h2 className="text-6xl font-extrabold text-gray-900 mb-6">
            Say <span ref={helloRef}>{languages[langIndex]}</span>
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                name="name"
                type="text"
                placeholder="Enter your name*"
                required
                className="w-full border-b border-gray-300 focus:outline-none py-6 pr-10"
              />
              <FaUser className="absolute right-2 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Enter your email*"
                required
                className="w-full border-b border-gray-300 focus:outline-none py-6 pr-10"
              />
              <FaEnvelope className="absolute right-2 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                name="whatsappNumber"
                type="text"
                placeholder="Enter your number*"
                required
                className="w-full border-b border-gray-300 focus:outline-none py-6 pr-10"
              />
              <FaPhoneAlt className="absolute right-2 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <textarea
                name="message"
                placeholder="Enter your message*"
                required
                className="w-full border-b border-gray-300 focus:outline-none py-8 pr-10 resize-none"
              ></textarea>
              <FaComment className="absolute right-2 top-9.5 text-gray-400" />
            </div>
            {/* <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send message"}
            </button> */}
            {/* <AnimatedButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </AnimatedButton> */}
            <LiquidButton
              type="submit"
              disabled={loading}
              className="mt-6"
              size="xl"
            >
              {loading ? (
                <>
                  {/* Optional: Add a spinner icon if you have one imported, e.g., FaSpinner */}
                  Sending...
                </>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {/* Relatable Send Icon */}
                  Send message <FaPaperPlane className="w-4 h-4" />{" "}
                </span>
              )}
            </LiquidButton>
          </form>

          <p className="text-xs text-gray-400 mt-2">
            I understand that my data will be held securely in accordance with
            the{" "}
            <Link href="#" className="underline">
              privacy policy
            </Link>
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
          <a
            href="https://www.facebook.com/mavenadvert/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all"
          >
            <FaFacebookF className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all"></span>
          </a>
          <a
            href="https://www.mavenadvert.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all"
          >
            <FaGlobe className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-all"></span>
          </a>
          <a
            href="https://www.instagram.com/maven_advert/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all"
          >
            <FaInstagram className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all"></span>
          </a>
          <a
            href="https://www.linkedin.com/company/maven-advert/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-12 h-12 flex items-center justify-center rounded-full transition-all"
          >
            <FaLinkedinIn className="text-gray-900 transition-all group-hover:text-white z-10" />
            <span className="absolute inset-0 rounded-full bg-blue-700 opacity-0 group-hover:opacity-100 transition-all"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
