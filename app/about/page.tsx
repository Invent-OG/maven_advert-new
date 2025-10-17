import AboutAward from "@/components/AboutPages/AboutAward";
import AboutCompany from "@/components/AboutPages/AboutCompany";
import AboutCompanyMarquee from "@/components/AboutPages/AboutCompanyMarquee";
import AboutHero from "@/components/AboutPages/AboutHero";
import AboutMarketing from "@/components/AboutPages/AboutMarketing";
import AboutMarquee from "@/components/AboutPages/AboutMarquee";
import MarketingAgency from "@/components/AboutPages/MarketingAgency";
import React from "react";

function page() {
  return (
    <>
      <AboutHero />
      <MarketingAgency />
      <AboutCompany />
      <AboutAward />
      <AboutMarquee />
      <AboutMarketing />
      <AboutCompanyMarquee />
    </>
  );
}

export default page;
