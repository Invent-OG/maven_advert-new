"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// TEAM DATA
const teamData = [
  {
    name: "Siva",
    role: "Co-Founder",
    bio: "Driven by ambition and creativity, bringing a strong vision and passion for transforming ideas into impactful brand growth.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1767706796/siva_azqmta.webp",
  },
  {
    name: "Gokul",
    role: "Co-Founder",
    bio: "Recognized for strategic thinking and problem-solving, constantly learning and communicating with clarity to drive smart execution.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1767706796/gokul_dlziz7.webp",
  },
  {
    name: "Sathiya",
    role: "Digital Marketing Executive",
    bio: "Calm under pressure, handling situations confidently while contributing with passion in team-driven environments.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1767706796/sathiya_kamao7.webp",
  },
  {
    name: "Subitcha",
    role: "Creative Designer",
    bio: "With a strong eye for visuals, shaping meaningful brand identities through thoughtful and evolving design.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1767706796/subi_njp43a.webp",
  },
  {
    name: "Jeevan",
    role: "Creative Designer",
    bio: "Blending innovation with expression, delivering fresh perspectives, clear goals, and a constant drive to explore new ideas.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1767706796/jeevan_aaky3p.webp",
  },
  {
    name: "Vignesh",
    role: "Marketing Executive",
    bio: "Focused on growth and outreach, combining strong communication with proactive marketing execution.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1767706796/vignesh_vli9op.webp",
  },
];

type MemberType = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const accentColor = "#fb923c";

const TeamCard = ({ member }: { member: MemberType }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    const onMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(overlay, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.35,
        ease: "power2.in",
      });

      gsap.to(overlay, {
        y: 160,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    };

    if (window.innerWidth > 768) {
      gsap.set(overlay, { y: 160, opacity: 0 });

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);
    } else {
      gsap.set(overlay, { y: 0, opacity: 1 });
    }

    return () => {
      if (card) {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl  hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-[380px] object-cover"
      />

      {/* NAME + ROLE (Glass Gradient Footer) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {member.name}
          </h3>

          <div className="flex items-center gap-3">
            <span
              className="h-[3px] w-8 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <p className="text-xs uppercase tracking-widest font-medium text-gray-200">
              {member.role}
            </p>
          </div>
        </div>
      </div>

      {/* OVERLAY BIO */}
      <div
        ref={overlayRef}
        className="absolute inset-x-0 bottom-0 bg-black/95 text-white p-6 backdrop-blur-lg"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              {member.role}
            </p>
          </div>
          <div
            className="h-[3px] w-10 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <p className="text-sm leading-relaxed text-gray-300">{member.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default function TeamImages() {
  return (
    <section className="w-full bg-white pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="space-y-4 max-w-2xl text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 tracking-tight">
            Meet the Innovators
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            Meet the team of 6 experts who drive our success with creativity,
            strategy, and execution excellence.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamData.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
