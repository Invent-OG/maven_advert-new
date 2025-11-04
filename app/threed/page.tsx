import Designers from "@/components/3dPages/Designers";
import Gallery from "@/components/3dPages/Gallery";
import Hero3D from "@/components/3dPages/Hero3D";
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
      <Hero3D />
      <Video />
      <MeetGang />
      <TipsTrick />
      <ZoomImg />
      <WhyItWorks />
      <ZoomImgOne />
      <Gallery />
      <Designers />
    </>
  );
}

export default page;
