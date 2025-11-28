import CaseCards from "@/components/CaseStudiesPages/CaseCards";
import CaseHero from "@/components/CaseStudiesPages/CaseHero";
import LayerOne from "@/components/Portfolio/Layouts/LayerOne";
import LayerTwo from "@/components/Portfolio/Layouts/LayerTwo";
import React from "react";
export const metadata = {
  title: "Explore Our Case Studies | Growth in Action",
  description:
    " Explore real success stories. Discover how strategic creativity and data-driven campaigns helped brands grow, engage, and achieve measurable results.",
};

function page() {
  return (
    <>
      <CaseHero />
      <CaseCards />
    </>
  );
}

export default page;
