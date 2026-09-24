import AppContent from "@/components/AppDevelopmentPages/AppContent";
import AppHero from "@/components/AppDevelopmentPages/AppHero";
import React from "react";
export const metadata = {
  title: "ECommerce Marketing & Product Promotion Solutions | Maven Advert",
  description:
    "Boost your online sales with expert eCommerce marketing, product ads, and marketplace optimization designed to maximize visibility, traffic, and ROI.",
  alternates: {
    canonical: "/services/ecommerce-marketing",
  },
};

function page() {
  return (
    <>
      <AppHero />
      <AppContent />
    </>
  );
}

export default page;
