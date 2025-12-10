import Designers from "@/components/3dPages/Designers";
import GridVideos from "@/components/3dPages/GridVideos";
import HeroFourthVideo from "@/components/3dPages/HeroFourthVideo";
import HeroSecondVideo from "@/components/3dPages/HeroSecondVideo";
import HeroThirdVideo from "@/components/3dPages/HeroThirdVideo";
import HeroVideo from "@/components/3dPages/HeroVideo";
import TipsTrick from "@/components/3dPages/TipsTrick";
import WhyItWorks from "@/components/3dPages/WhyItWorks";
import React from "react";

function page() {
  return (
    <>
      <HeroVideo />
      <HeroSecondVideo />
      <TipsTrick />
      <HeroThirdVideo />
      <WhyItWorks />
      <HeroFourthVideo />
      <GridVideos />
      <Designers />
    </>
  );
}

export default page;
