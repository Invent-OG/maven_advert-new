import React from "react";
import { CheckCircle, Zap, User, Globe } from "lucide-react";

function PersonalBrand() {
  const features = [
    {
      icon: <CheckCircle size={24} className="text-black" />,
      title: "Easy Setup",
      description: "Get started quickly with pre-made templates.",
    },
    {
      icon: <Zap size={24} className="text-black" />,
      title: "Fast Performance",
      description: "Your site loads lightning fast for all visitors.",
    },
    {
      icon: <User size={24} className="text-black" />,
      title: "Custom Branding",
      description: "Add your logo, colors, and style effortlessly.",
    },
    {
      icon: <Globe size={24} className="text-black" />,
      title: "Global Reach",
      description: "Share your personal brand with the world.",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 md:px-12 lg:px-20 py-16">
      {/* Heading */}
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-6 leading-tight">
          Launch your personal brand today
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          Pick a template, edit a few sections, and share. No design skills
          needed— <br className="hidden md:block" />
          just a fast, effortless way to build your brand.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 sm:p-8 border border-neutral-200 rounded-xl hover:shadow-lg transition-shadow"
          >
            {/* Icon with gray border */}
            <div className="w-16 h-16 flex justify-center items-center mb-4 rounded-full border-2 border-gray-300">
              {feature.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PersonalBrand;
