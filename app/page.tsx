import Hero3D from "@/components/3dPages/Hero3D";
import DynamicTestimonials from "@/components/DynamicTestimonial/DynamicTestimonials";
import EverythingYouNeed from "@/components/HomePages/Card";
import FeatureOn from "@/components/HomePages/FeatureOn";
import MemberShip from "@/components/HomePages/MemberShip";
import MovingCard from "@/components/HomePages/MovingCard";
import PersonalBrand from "@/components/HomePages/PersonalBrand";
import Said from "@/components/HomePages/Said";
import SaidThree from "@/components/HomePages/SaidThree";
import SaidTwo from "@/components/HomePages/SaidTwo";
import ServiceVideo from "@/components/HomePages/ServiceVideo";
import StickyShowcase from "@/components/HomePages/StickyShowcase";
import StickyShowCaseThree from "@/components/HomePages/StickyShowCaseThree";
import StickyShowCaseTwo from "@/components/HomePages/StickyShowCaseTwo";
import Video from "@/components/HomePages/Video";
import React from "react";

function page() {
  return (
    <>
      {/* <Hero3D /> */}
      <StickyShowcase />
      <StickyShowCaseTwo />
      <EverythingYouNeed />
      <Said />
      <Video />
      <MovingCard />
      <StickyShowCaseThree />
      <PersonalBrand />
      <ServiceVideo />
      <SaidTwo />
      <MemberShip />
      <FeatureOn />
      <SaidThree />
      <DynamicTestimonials />
    </>
  );
}

export default page;
