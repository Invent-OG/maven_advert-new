"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Sales development",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/sales-development",
  },
  {
    title: "Social media analysis",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/social-media-analysis",
  },
  {
    title: "Marketing campaigns",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3182770/pexels-photo-3182770.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/marketing-campaigns",
  },
  {
    title: "Marketing research",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/marketing-research",
  },
  {
    title: "Engaging audiences",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/engaging-audiences",
  },
  {
    title: "Business growth",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/business-growth",
  },
  {
    title: "Customer insights",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184637/pexels-photo-3184637.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/customer-insights",
  },
  {
    title: "Brand strategy",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/brand-strategy",
  },
  {
    title: "Digital advertising",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/digital-advertising",
  },
  {
    title: "Data-driven marketing",
    description: "Lorem ipsum simply dummy text printing the and typesetting.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/data-driven-marketing",
  },
];

function ServicesMainCard() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll every 3 seconds
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 350;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
        }

        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white py-16 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <h2 className="text-3xl md:text-6xl font-extrabold text-center text-gray-900 mb-12 leading-none">
        Guiding your business to <br /> achieve online success
      </h2>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="min-w-[260px] mb-10 bg-white shadow-md rounded-2xl overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg group relative"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Orange circle with link */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <Link
                  href={service.link}
                  className="bg-orange-500 text-white text-sm font-semibold rounded-full w-24 h-24 flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  START NOW
                </Link>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 p-2 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar CSS */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default ServicesMainCard;
