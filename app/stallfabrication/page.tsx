import Blogs from "@/components/Blogs";
import BlogsCard from "@/components/BlogsPages/BlogsCard";
import Architectura from "@/components/stallfabrication/Architectura";
import Offering from "@/components/stallfabrication/Offering";
import StallGallery from "@/components/stallfabrication/StallGallery";
import StallHero from "@/components/stallfabrication/StallHero";
import Testimonial from "@/components/stallfabrication/Testimonial";
import WeProvide from "@/components/stallfabrication/WeProvide";
import React from "react";
export const metadata = {
  title: "Innovative Stall Fabrication in South India",
  description:
    "Build immersive brand spaces with custom stall fabrication for expos, trade shows, and corporate events across Tamil Nadu and South India.",
};

function page() {
  return (
    <>
      <StallHero />
      <WeProvide />
      <Architectura />
      <Offering />
      <StallGallery />
      {/* <Testimonial /> */}
      {/* <Blogs /> */}
      {/* <BlogsCard /> */}
    </>
  );
}

export default page;
