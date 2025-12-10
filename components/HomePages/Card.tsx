"use client";
import React from "react";
import Image from "next/image";
import "aos/dist/aos.css";

// Card Component
type CardProps = {
  image: string;
  title: string;
  description: string;
};

function Card({ image, title, description }: CardProps) {
  // AOS initialized globally
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center h-[360px] w-[340px] hover:-translate-y-1">
      {/* Image Section */}
      <div
        data-aos="fade-down"
        className="w-[300px] h-[220px] rounded-2xl overflow-hidden border-2 border-gray-200 shadow-inner relative transition-transform duration-300 hover:scale-105"
      >
        {/* <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        /> */}
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Title + Description */}
      <h3 className="text-base font-semibold text-black mt-5 mb-1 text-start w-full">
        {title}
      </h3>
      <p className="text-sm text-start text-gray-700 leading-relaxed w-full">
        {description}
      </p>
    </div>
  );
}

// Main Component
export default function EverythingYouNeed() {
  const cards = [
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646973/Assets-02_y4x2uf.jpg",
      title: "Strategic Digital Architecture",
      description:
        "Build your brand’s online journey with data-driven insights and cohesive digital strategies.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646971/Assets-01_aw3d3u.jpg",
      title: "Interactive Web Experiences",
      description:
        "Develop websites that engage, convert, and reflect your brand’s identity seamlessly.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646968/Assets-09_dhtjek.jpg",
      title: "Brand Identity Crafting",
      description:
        "Transform any digital visual into a cohesive brand language that resonates",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646966/Assets-04_howr7p.jpg",
      title: "Targeted Growth Campaigns",
      description:
        "ROI-focused advertising across Google, social, and display networks to maximize impact.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646964/Assets-07_hglckz.jpg",
      title: "Content Marketing for Authority",
      description:
        "SEO, blogs, and multimedia content designed to build credibility and organic reach.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646962/Assets-05_ud3c7i.jpg",
      title: "eCommerce Growth Engine",
      description:
        "Optimize marketplaces and product listings to drive traffic, conversions, and repeat sales.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646959/Assets-08_vyeouj.jpg",
      title: "Automated Sales Systems",
      description:
        "CRM, Chatbots, Landing pages, and analytics engineered to streamline and boost sales.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646957/Assets-06_rxotfq.jpg",
      title: "Social Amplification & Engagement",
      description:
        "Grow audience, Enhance Brand Visibility, and foster meaningful social connections.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646956/Assets-03_ov31ny.jpg",
      title: "Visual Storytelling & Production",
      description:
        "Corporate films, Brand shoots, and Photography that capture your brand essence.",
    },
    {
      image:
        "https://framerusercontent.com/images/87bY5xcFN4asDCaH1lXq6XTdjCo.jpg?scale-down-to=512",
      title: "Experiential Spaces & Installations",
      description:
        "Trade show stalls, Exhibitions, and brand environments designed to leave lasting impressions.",
    },
    {
      image:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646964/Assets-07_hglckz.jpg",
      title: "Performance Intelligence & Insights",
      description:
        "Advanced analytics and optimization to continuously refine campaigns and strategy outcomes.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="md:text-7xl text-4xl  text-neutral-900 mb-3">
          Everything Your <br /> Brand Needs
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto text-sm md:text-sm leading-relaxed">
          A blend of creativity, technology and strategy designed to build
          brands and drive growth.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto justify-items-center">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}
