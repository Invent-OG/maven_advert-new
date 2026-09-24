import ContactHero from "@/components/ContactPages/ContactHero";
import GetInTouch from "@/components/ContactPages/GetInTouch";
import React from "react";
export const metadata = {
  title: "Let’s Build Something Exceptional Together | Contact Maven Advert",
  description:
    "Ready to grow your brand? Connect with our team for tailored strategies, creative solutions, and digital experiences that drive measurable success.",
  alternates: {
    canonical: "/contact",
  },
};

function page() {
  return (
    <div>
      <ContactHero />
      <GetInTouch />
    </div>
  );
}

export default page;
