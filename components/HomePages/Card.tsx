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
      title: "Forms",
      description:
        "Capture inquiries with customizable forms to grow your business.",
    },
    {
      image:
        "https://framerusercontent.com/images/7dO8cZCgml9VNEVN3iHoGpId9Dw.jpg?scale-down-to=512",
      title: "Showcase",
      description:
        "Show the world your visual work and earn add-ons to boost engagement.",
    },
    {
      image:
        "https://framerusercontent.com/images/00EUntV8RMJM5PyskAclGChN9s8.jpg?scale-down-to=512",
      title: "Services",
      description:
        "Clearly display your services, pricing, and descriptions to attract more clients.",
    },
    {
      image:
        "https://framerusercontent.com/images/oMdcviojJa9zK00dtdpSR7ffq6E.jpg?scale-down-to=512",
      title: "Testimonials",
      description:
        "Build trust by showcasing real customer feedback and success stories.",
    },
    {
      image:
        "https://framerusercontent.com/images/FslHXXxXCDOMyOJzYO89SJJlvXA.jpg?scale-down-to=512",
      title: "Videos",
      description:
        "Feature one or more videos to engage visitors and increase conversions.",
    },
    {
      image:
        "https://framerusercontent.com/images/Qr7KMQJHcfeNk4LSsnK1id52E7g.jpg?scale-down-to=512",
      title: "Socials",
      description:
        "Link everything in one place so visitors easily connect with your platforms.",
    },
    {
      image:
        "https://framerusercontent.com/images/U7ONvjSO4tFRexJCBv69x0O7I.jpg?scale-down-to=512",
      title: "Resume",
      description:
        "Highlight your experience and expertise to win clients and job opportunities.",
    },
    {
      image:
        "https://framerusercontent.com/images/XkBqyfrXhJSH88VAqh1qdsHGJ44.jpg?scale-down-to=512",
      title: "Stats",
      description:
        "Display key business metrics to establish credibility and showcase success.",
    },
    {
      image:
        "https://framerusercontent.com/images/AG4NbEc1vlVyLZtonCBmltk2jM.jpg?scale-down-to=512",
      title: "Tech Stack",
      description:
        "Showcase the tools and tech you’ve mastered and attract opportunities.",
    },
    {
      image:
        "https://framerusercontent.com/images/87bY5xcFN4asDCaH1lXq6XTdjCo.jpg?scale-down-to=512",
      title: "Tech Stack",
      description:
        "Showcase the tools and tech you’ve mastered and attract opportunities.",
    },
    {
      image:
        "https://framerusercontent.com/images/h4NtlJI69nsUCTgJMqCfcddzC0.jpg?scale-down-to=512",
      title: "Tech Stack",
      description:
        "Showcase the tools and tech you’ve mastered and attract opportunities.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-7xl font-bold text-black mb-3">
          Everything you need
        </h2>
        <p className="text-gray-500 text-base ">
          Prebuilt, powerful sections designed to showcase your <br /> personal
          brand and drive growth.
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
