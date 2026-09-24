import BlogsArchive from "@/components/BlogsPages/BlogsArchive";
import React from "react";

export const metadata = {
  title: "Blogs & Insights | Maven Advert",
  description:
    "Explore our latest articles, insights, and expert strategies on digital marketing, SEO, web design, and branding.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs & Insights | Maven Advert",
    description:
      "Explore our latest articles, insights, and expert strategies on digital marketing, SEO, web design, and branding.",
    url: "/blogs",
  },
};

function page() {
  return (
    <>
      <BlogsArchive />
    </>
  );
}

export default page;
