import SeoContent from "@/components/SeoPages/SeoContent";
import SeoHero from "@/components/SeoPages/SeoHero";
import React from "react";
export const metadata = {
  title: "High-ROI Digital Advertising & Smart Campaigns | Maven Advert",
  description:
    "Maximize your brand impact with precision-targeted ads, optimized funnels, and performance-driven campaigns that deliver measurable ROI.",
  alternates: {
    canonical: "/services/digital-advertising",
  },
};

function page() {
  return (
    <>
      <SeoHero />
      <SeoContent />
    </>
  );
}

export default page;
