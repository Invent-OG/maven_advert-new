"use client";
import React from "react";

// Card Component
type CardProps = {
  image: string;
  title: string;
  description: string;
};

function Card({ image, title, description }: CardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center h-[360px] w-[340px] hover:-translate-y-1">
      {/* Image Section */}
      <div className="w-[300px] h-[220px] rounded-2xl overflow-hidden border-2 border-gray-200 shadow-inner relative transition-transform duration-300 hover:scale-105">
        <img
          src={image}
          alt={title}
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
        "https://framerusercontent.com/images/7dO8cZCgml9VNEVN3iHoGpId9Dw.jpg?scale-down-to=512",
      title: "Strategic Digital Architecture",
      description:
        "Build your brand’s online journey with data-driven insights and cohesive digital strategies.",
    },
    {
      image:
        "https://framerusercontent.com/images/7dO8cZCgml9VNEVN3iHoGpId9Dw.jpg?scale-down-to=512",
      title: "Interactive Web Experiences",
      description:
        "Develop websites that engage, convert, and reflect your brand’s identity seamlessly.",
    },
    {
      image:
        "https://framerusercontent.com/images/00EUntV8RMJM5PyskAclGChN9s8.jpg?scale-down-to=512",
      title: "Brand Identity Crafting",
      description:
        "Transform any digital visual into a cohesive brand language that resonates",
    },
    {
      image:
        "https://framerusercontent.com/images/oMdcviojJa9zK00dtdpSR7ffq6E.jpg?scale-down-to=512",
      title: "Targeted Growth Campaigns",
      description:
        "ROI-focused advertising across Google, social, and display networks to maximize impact.",
    },
    {
      image:
        "https://framerusercontent.com/images/FslHXXxXCDOMyOJzYO89SJJlvXA.jpg?scale-down-to=512",
      title: "Content Marketing for Authority",
      description:
        "SEO, blogs, and multimedia content designed to build credibility and organic reach.",
    },
    {
      image:
        "https://framerusercontent.com/images/Qr7KMQJHcfeNk4LSsnK1id52E7g.jpg?scale-down-to=512",
      title: "eCommerce Growth Engine",
      description:
        "Optimize marketplaces and product listings to drive traffic, conversions, and repeat sales.",
    },
    {
      image:
        "https://framerusercontent.com/images/U7ONvjSO4tFRexJCBv69x0O7I.jpg?scale-down-to=512",
      title: "Automated Sales Systems",
      description:
        "CRM, Chatbots, Landing pages, and analytics engineered to streamline and boost sales.",
    },
    {
      image:
        "https://framerusercontent.com/images/XkBqyfrXhJSH88VAqh1qdsHGJ44.jpg?scale-down-to=512",
      title: "Social Amplification & Engagement",
      description:
        "Grow audience, Enhance Brand Visibility, and foster meaningful social connections.",
    },
    {
      image:
        "https://framerusercontent.com/images/AG4NbEc1vlVyLZtonCBmltk2jM.jpg?scale-down-to=512",
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
        "https://framerusercontent.com/images/h4NtlJI69nsUCTgJMqCfcddzC0.jpg?scale-down-to=512",
      title: "Performance Intelligence & Insights",
      description:
        "Advanced analytics and optimization to continuously refine campaigns and strategy outcomes.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-7xl font-bold text-black mb-3">
          Everything Your <br /> Brand Needs
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto text-base ">
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
