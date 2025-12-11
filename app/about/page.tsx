import AboutAward from "@/components/AboutPages/AboutAward";
import AboutCompany from "@/components/AboutPages/AboutCompany";
import AboutCompanyMarquee from "@/components/AboutPages/AboutCompanyMarquee";
import AboutHero from "@/components/AboutPages/AboutHero";
import AboutMarketing from "@/components/AboutPages/AboutMarketing";
import AboutMarquee from "@/components/AboutPages/AboutMarquee";
import MarketingAgency from "@/components/AboutPages/MarketingAgency";
import TeamImages from "@/components/TeamPages/TeamImages";
import React from "react";
export const metadata = {
  title: "Maven Advert | Strategy, Creativity & Digital Growth",
  description:
    "We craft data-driven strategies and creative experiences that build trust, spark engagement, and drive measurable growth for visionary brands.",
};
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
      <TeamImages />
    </>
  );
}

export default page;
