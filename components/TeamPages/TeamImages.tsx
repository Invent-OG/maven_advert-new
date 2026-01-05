
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
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_SIva_ezgnah.png",
  },
  {
    name: "Gokul",
    role: "Co-Founder",
    bio: "Recognized for strategic thinking and problem-solving, constantly learning and communicating with clarity to drive smart execution.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Gokul_tunkfx.png",
  },
  {
    name: "Sathiya",
    role: "Digital Marketing Executive",
    bio: "Calm under pressure, handling situations confidently while contributing with passion in teamdriven environments.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722331/Banner_Sathiya_vxkliu.png",
  },
  {
    name: "Subitcha",
    role: "Creative Designer",
    bio: "With a strong eye for visuals, shaping meaningful brand identities through thoughtful and evolving design.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Subi_lkz5rs.png",
  },
  {
    name: "Jeevan",
    role: "Creative Designer",
    bio: "Blending innovation with expression, delivering fresh perspectives, clear goals, and a constant drive to explore new ideas.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Jeevan_sykqgi.png",
  },
  {
    name: "Vignesh",
    role: "Marketing Executive",
    bio: "Focused on growth and outreach, combining strong communication with proactive marketing execution.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722331/Banner_Vignesh_scesxe.png",
  },
];

type MemberType = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const cardHeight = "360px";
const accentColor = "#fb923c";

const TeamCard = ({ member }: { member: MemberType }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    // Desktop GSAP Hover Animation
    if (window.innerWidth > 768) {
      gsap.set(overlay, { y: 140, opacity: 0 });

      card.addEventListener("mouseenter", () => {
        gsap.to(overlay, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(overlay, {
          y: 140,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        });
      });
    } else {
      // Mobile: overlay always visible
      gsap.set(overlay, { y: 0, opacity: 1 });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden shadow-2xl rounded-xl bg-white cursor-pointer group"
      style={{ height: cardHeight }}
    >
      {/* IMAGE */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-top"
      />

      {/* FIXED NAME + ROLE ALWAYS VISIBLE */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/30 p-4">
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-sm font-semibold" style={{ color: accentColor }}>
          {member.role}
        </p>
      </div>

      {/* OVERLAY (hidden until hover on desktop) */}
      <div
        ref={overlayRef}
        className="absolute inset-x-0 bottom-0 bg-black/90 text-white p-5 backdrop-blur-md"
      >
        <p className="text-xs leading-snug text-gray-200 mb-3">{member.bio}</p>
      </div>
    </div>
  );
};

export default function TeamImages() {
  return (
    <section className="w-full bg-white pt-20 pb-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* HEADER */}
        <div className="space-y-3 max-w-3xl text-center mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900">
            Meet the Innovators
          </h2>
          <p className="text-base max-w-sm mx-auto text-neutral-600">
            Meet the full team of 6 experts who drive our success with
            dedication and innovation.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamData.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
