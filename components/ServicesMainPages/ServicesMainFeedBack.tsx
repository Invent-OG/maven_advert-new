"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const feedbacks = [
  {
    id: 1,
    rating: 4.8,
    reviews: 2488,
    clientName: "Alexander Harvard",
    avatar:
      "https://images.pexels.com/photos/7776184/pexels-photo-7776184.jpeg",
    feedback:
      "Love the theme, really neat and super easy to use. But the customer support is what makes this an even greater theme! ThemeZaa solved all the problems I had with my custom settings.",
  },
  {
    id: 2,
    rating: 5.0,
    reviews: 3120,
    clientName: "Leonel Mooney",
    avatar:
      "https://images.pexels.com/photos/3761264/pexels-photo-3761264.jpeg",
    feedback:
      "The theme is very valid and offers many possibilities of customization to adapt to your needs, but the thing I got the most out of it was the relationship with the support team.",
  },
  {
    id: 3,
    rating: 4.9,
    reviews: 1980,
    clientName: "Sophie Carter",
    avatar:
      "https://images.pexels.com/photos/8638618/pexels-photo-8638618.jpeg",
    feedback:
      "An excellent design with great flexibility and support. I’m impressed by how well the structure works across devices and how friendly their support team is.",
  },
];

function ServicesMainFeedBack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextFeedback();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate feedback change
  useEffect(() => {
    if (feedbackRef.current) {
      gsap.fromTo(
        feedbackRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex]);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const nextFeedback = () => {
    setActiveIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setActiveIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const activeFeedback = feedbacks[activeIndex];

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-16">
      {/* LEFT STATIC IMAGE SECTION */}
      <div
        data-aos="fade-up"
        className="relative w-full md:w-1/2 flex justify-center items-center"
      >
        {/* Static Short Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.pexels.com/photos/9951800/pexels-photo-9951800.jpeg"
            alt="Feedback Visual"
            width={480}
            height={400}
            className="object-cover w-full h-[400px]"
          />
        </div>

        {/* Trustpilot Badge - static */}
        <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center w-[160px] text-center">
          <Image
            src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-services-03.png.webp"
            alt="Trustpilot Logo"
            width={60}
            height={30}
            className="object-contain mb-2"
          />
          <h4 className="text-3xl font-bold text-gray-900">4.9</h4>
          <div className="text-yellow-400 text-lg mb-1">★★★★★</div>
          <p className="text-gray-500 text-xs">3,500+ Reviews</p>
          <span className="mt-2 text-green-600 text-[11px] font-medium bg-green-100 px-3 py-1 rounded-full">
            EXCELLENT SCORE
          </span>
        </div>
      </div>

      {/* RIGHT DYNAMIC FEEDBACK SECTION */}
      <div
        ref={feedbackRef}
        className="w-full md:w-1/2 transition-all duration-700"
      >
        <p className="text-orange-500 uppercase font-semibold tracking-widest mb-3">
          Clients Feedback
        </p>

        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          Here is what our <br /> clients say!
        </h2>

        <p className="text-gray-600 text-base mb-10 leading-relaxed">
          {activeFeedback.feedback}
        </p>

        {/* Client Info */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={activeFeedback.avatar}
            alt={activeFeedback.clientName}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div>
            <h4 className="text-gray-900 font-semibold">
              {activeFeedback.clientName}
            </h4>
            <div className="text-yellow-400 text-sm">★★★★★</div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={prevFeedback}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            ←
          </button>
          <button
            onClick={nextFeedback}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServicesMainFeedBack;
