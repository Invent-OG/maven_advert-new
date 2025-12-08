import Designers from "@/components/3dPages/Designers";
import Gallery from "@/components/3dPages/Gallery";
import Hero3D from "@/components/3dPages/Hero3D";
import HeroFourthVideo from "@/components/3dPages/HeroFourthVideo";
import HeroSecondVideo from "@/components/3dPages/HeroSecondVideo";
import HeroThirdVideo from "@/components/3dPages/HeroThirdVideo";
import HeroVideo from "@/components/3dPages/HeroVideo";
import MeetGang from "@/components/3dPages/MeetGang";
import TipsTrick from "@/components/3dPages/TipsTrick";
import Video from "@/components/3dPages/Video";
import WhyItWorks from "@/components/3dPages/WhyItWorks";
import ZoomImg from "@/components/3dPages/ZoomImg";
import ZoomImgOne from "@/components/3dPages/ZoomImgOne";
// import TeamHero from "@/components/TeamPages/TeamHero";
// import TeamImages from "@/components/TeamPages/TeamImages";
// import TeamResult from "@/components/TeamPages/TeamResult";
import React from "react";

function page() {
  return (
    <>
      {/* <TeamHero />
      <TeamResult />
      <TeamImages /> */}
      <HeroVideo />
      <HeroSecondVideo />
      {/* <Hero3D /> */}
      {/* <Video /> */}
      {/* <MeetGang /> */}
      <TipsTrick />
      <HeroThirdVideo />
      {/* <ZoomImg /> */}
      <WhyItWorks />
      {/* <ZoomImgOne /> */}
      <HeroFourthVideo />
      <Gallery />
      <Designers />
    </>
  );
}

export default page;
