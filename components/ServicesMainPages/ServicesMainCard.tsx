"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    title: "Digital Sales Infrastructure & Automation",
    description:
      "We build landing pages, integrate CRM, implement chatbots, and set up analytics to streamline your sales process",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/app-development",
  },
  {
    title: "ECommerce Marketing & Product Promotion",
    description:
      "We optimize your presence on Amazon and Flipkart, run targeted product ads, and boost cross-sales to increase revenue",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/app-development",
  },
  {
    title: "Social Media Growth & Brand Engagement:",
    description:
      "We create engaging content, manage campaigns, and collaborate with influencers to grow your brand’s reach and engagement.",
    image:
      "https://images.pexels.com/photos/3182770/pexels-photo-3182770.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/app-development",
  },
  {
    title: "Digital Advertising & ROI Campaigns",
    description:
      "We design Google Ads, retargeting campaigns, and lead funnels to maximize ROI and drive measurable results",
    image:
      "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/app-development",
  },
  {
    title: "Search & Content Marketing",
    description:
      "We leverage SEO, blogs, YouTube, and email/WhatsApp campaigns to enhance visibility and attract your target audience",
    image:
      "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/app-development",
  },
  {
    title: "Social Media Growth & Brand Engagement:",
    description:
      "We create engaging content, manage campaigns, and collaborate with influencers to grow your brand’s reach and engagement.",
    image:
      "https://images.pexels.com/photos/3182770/pexels-photo-3182770.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/services/app-development",
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
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div data-aos="fade-down" className="bg-white py-16 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <p className="text-xs text-center mb-6 sm:text-sm md:text-xl font-medium text-orange-500 md:text-orange-500">
        Driving Brand Growth{" "}
      </p>
      <h2 className="text-3xl md:text-6xl font-extrabold text-center text-gray-900 mb-12 leading-none">
        Empowering your business with <br /> impactful digital solutions
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
            <div className="p-4 text-start">
              <h3 className="font-semibold text-lg text-gray-900 ">
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
