"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

function ServicesMainGrowth() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const numbers = numbersRef.current;

    if (section && numbers.length > 0) {
      const ctx = gsap.context(() => {
        // Animate numbers counting up
        numbers.forEach((num) => {
          const targetValue = Number(num.dataset.value);
          gsap.fromTo(
            num,
            { innerText: 0 },
            {
              innerText: targetValue,
              duration: 2,
              ease: "power1.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                // Format number with commas while counting
                num.innerText = Math.floor(
                  Number(num.innerText)
                ).toLocaleString();
              },
              onComplete: function () {
                // Add "+" at the end once animation completes
                num.innerText = `${targetValue.toLocaleString()}+`;
              },
            }
          );
        });

        // Fade + rise animation for each stat
        gsap.from(section.querySelectorAll(".stat-item"), {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });

      return () => ctx.revert();
    }
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const stats = [
    { value: 1200, label: "Content Assets" },
    { value: 5000, label: "Leads Generated" },
    { value: 600, label: "Social Engagements" },
    { value: 1000, label: "Digital Assets" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 md:py-28 flex justify-center"
    >
      <div
        data-aos="fade-up"
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center px-6 md:px-12"
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="stat-item flex flex-col items-center justify-center"
          >
            {/* Number + Arrow container */}
            <div className="relative inline-flex items-start justify-center mb-1">
              <FaArrowUp className="growth-arrow text-green-500 text-2xl absolute -top-3 -left-6 md:-left-7" />
              <h3
                ref={(el) => {
                  if (el) numbersRef.current[idx] = el;
                }}
                data-value={item.value}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-none"
              >
                0+
              </h3>
            </div>

            {/* Label */}
            <p className="text-gray-500 text-sm mt-1 font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesMainGrowth;
