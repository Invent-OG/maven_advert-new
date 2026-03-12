import CloudContent from "@/components/CloudServicePages/CloudContent";
import CloudHero from "@/components/CloudServicePages/CloudHero";
import React from "react";
export const metadata = {
  title: "Social Media Growth & Brand Engagement Strategies",
  description:
    " Expand your social presence with creative content, paid ads, and influencer collaborations that boost engagement, brand awareness, and community trust.",
};

function page() {
  return (
    <>
      <CloudHero />
      <CloudContent />
    </>
  );
}

export default page;
