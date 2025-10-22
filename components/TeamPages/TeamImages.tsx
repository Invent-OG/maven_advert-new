"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TeamImages() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const img = card.querySelector("img");
      const socials = card.querySelector(".socials");

      if (!img || !socials) return;

      // Hover In Animation
      card.addEventListener("mouseenter", () => {
        gsap.to(img, {
          y: -20,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(socials, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1,
        });
      });

      // Hover Out Animation
      card.addEventListener("mouseleave", () => {
        gsap.to(img, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(socials, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power2.in",
        });
      });
    });
  }, []);

  const teamMembers = [
    {
      name: "Jeremy dupont",
      role: "Executive officer",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "Jessica dover",
      role: "Vice president",
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "Matthew taylor",
      role: "Financial officer",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "Daniel james",
      role: "People officer",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "Sophia lewis",
      role: "Creative head",
      image:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "James anderson",
      role: "Marketing strategist",
      image:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "Emma watson",
      role: "Design officer",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
    {
      name: "Michael lee",
      role: "Brand manager",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      socials: ["Fb.", "In.", "Tw.", "Dr."],
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="bg-white shadow-lg rounded-none overflow-hidden text-center transition-all duration-500"
          >
            <div className="overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[300px] object-cover rounded-t-xl"
              />
            </div>
            <div className="p-6 relative">
              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>

              {/* Hidden Socials - Appear on Hover */}
              <div className="socials flex justify-center gap-3 mt-4 text-gray-800 font-medium opacity-0 translate-y-3">
                {member.socials.map((s, j) => (
                  <span
                    key={j}
                    className="hover:text-[#f15d2a] cursor-pointer transition-colors duration-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
