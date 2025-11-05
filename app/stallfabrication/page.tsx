import Blogs from "@/components/Blogs";
import BlogsCard from "@/components/BlogsPages/BlogsCard";
import Architectura from "@/components/stallfabrication/Architectura";
import Offering from "@/components/stallfabrication/Offering";
import StallGallery from "@/components/stallfabrication/StallGallery";
import StallHero from "@/components/stallfabrication/StallHero";
import Testimonial from "@/components/stallfabrication/Testimonial";
import WeProvide from "@/components/stallfabrication/WeProvide";
import React from "react";

function page() {
  return (
    <>
      <StallHero />
      <WeProvide />
      <Architectura />
      <Offering />
      <StallGallery />
      <Testimonial />
      {/* <Blogs /> */}
      <BlogsCard />
    </>
  );
}

export default page;
