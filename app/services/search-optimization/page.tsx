import SupportContent from "@/components/SupportPages/SupportContent";
import SupportHero from "@/components/SupportPages/SupportHero";
import React from "react";
export const metadata = {
  title: "Search Optimization & Authority-Driven Content",
  description:
    "Boost visibility with strategic SEO, blogs, videos, and campaigns that build brand authority, engage audiences, and drive organic growth.",
};

function page() {
  return (
    <>
      <SupportHero />
      <SupportContent />
    </>
  );
}

export default page;
