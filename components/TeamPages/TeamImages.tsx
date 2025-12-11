// "use client";
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function TeamImages() {
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     cardsRef.current.forEach((card) => {
//       if (!card) return;
//       const img = card.querySelector("img");
//       const socials = card.querySelector(".socials");

//       if (!img || !socials) return;

//       // Hover In Animation
//       card.addEventListener("mouseenter", () => {
//         gsap.to(img, {
//           y: -20,
//           duration: 0.5,
//           ease: "power2.out",
//         });
//         gsap.to(socials, {
//           opacity: 1,
//           y: 0,
//           duration: 0.5,
//           ease: "power2.out",
//           delay: 0.1,
//         });
//       });

//       // Hover Out Animation
//       card.addEventListener("mouseleave", () => {
//         gsap.to(img, {
//           y: 0,
//           duration: 0.3,
//           ease: "power2.out",
//         });
//         gsap.to(socials, {
//           opacity: 0,
//           y: 10,
//           duration: 0.4,
//           ease: "power2.in",
//         });
//       });
//     });
//   }, []);

//   const teamMembers = [
//     {
//       name: "Jeremy dupont",
//       role: "Executive officer",
//       image:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "Jessica dover",
//       role: "Vice president",
//       image:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "Matthew taylor",
//       role: "Financial officer",
//       image:
//         "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "Daniel james",
//       role: "People officer",
//       image:
//         "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "Sophia lewis",
//       role: "Creative head",
//       image:
//         "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "James anderson",
//       role: "Marketing strategist",
//       image:
//         "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "Emma watson",
//       role: "Design officer",
//       image:
//         "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//     {
//       name: "Michael lee",
//       role: "Brand manager",
//       image:
//         "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
//       socials: ["Fb.", "In.", "Tw.", "Dr."],
//     },
//   ];

//   return (
//     <section className="w-full bg-white py-20 px-6 md:px-20">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//         {teamMembers.map((member, i) => (
//           <div
//             key={i}
//             ref={(el) => {
//               cardsRef.current[i] = el;
//             }}
//             className="bg-white shadow-lg rounded-none overflow-hidden text-center transition-all duration-500"
//           >
//             <div className="overflow-hidden">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-[300px] object-cover rounded-t-xl"
//               />
//             </div>
//             <div className="p-6 relative">
//               <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
//               <p className="text-sm text-gray-500 mt-1">{member.role}</p>

//               {/* Hidden Socials - Appear on Hover */}
//               <div className="socials flex justify-center gap-3 mt-4 text-gray-800 font-medium opacity-0 translate-y-3">
//                 {member.socials.map((s, j) => (
//                   <span
//                     key={j}
//                     className="hover:text-[#f15d2a] cursor-pointer transition-colors duration-200"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

// TEAM DATA
const teamData = [
  {
    name: "Kaniska",
    role: "Chief Strategy Officer",
    bio: "Oversees strategic direction and ensures alignment across all departments, focusing on sustainable growth and market penetration.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722332/Banner_Kaniska_hs9ij7.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Sathiya",
    role: "Lead Development Architect",
    bio: "Leads operational excellence and manages key client relationships, driving high performance and exceptional service delivery.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722331/Banner_Sathiya_vxkliu.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Vignesh",
    role: "Senior Marketing Manager",
    bio: "Manages all financial planning, reporting, and analysis, safeguarding the company's fiscal health and maximizing investment returns.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722331/Banner_Vignesh_scesxe.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Jeevan",
    role: "Creative Director",
    bio: "Fosters a positive and inclusive work culture, developing talent management strategies that empower our team to succeed.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Jeevan_sykqgi.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Siva",
    role: "Brand & Communication Head",
    bio: "Directs all creative initiatives, ensuring brand consistency and pushing boundaries with innovative design and visual storytelling.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_SIva_ezgnah.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Gokul",
    role: "Technical Team Lead",
    bio: "Develops and executes data-driven marketing campaigns, achieving measurable growth and expanding brand presence globally.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Gokul_tunkfx.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Subi",
    role: "UI/UX Specialist",
    bio: "Specializes in UX/UI design, creating intuitive, beautiful digital products that enhance user satisfaction and conversion.",
    image:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763722330/Banner_Subi_lkz5rs.png",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
];

type MemberType = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  email: string;
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

        <div className="flex gap-5">
          <a href={member.linkedin} className="text-gray-300 hover:text-white">
            <FaLinkedinIn size={16} />
          </a>
          <a href={member.twitter} className="text-gray-300 hover:text-white">
            <FaTwitter size={16} />
          </a>
          <a href={member.email} className="text-gray-300 hover:text-white">
            <FaEnvelope size={16} />
          </a>
        </div>
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
            Meet the full team of 7 experts who drive our success with
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
