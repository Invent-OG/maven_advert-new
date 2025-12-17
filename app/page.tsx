// import StickyShowcase from "@/components/HomePages/StickyShowcase";
// import StickyShowCaseThree from "@/components/HomePages/StickyShowCaseThree";
// import StickyShowCaseTwo from "@/components/HomePages/StickyShowCaseTwo";
// import Video from "@/components/HomePages/Video";
// import DynamicTestimonials from "@/components/DynamicTestimonial/DynamicTestimonials";
// import EverythingYouNeed from "@/components/HomePages/Card";
// import FeatureOn from "@/components/HomePages/FeatureOn";
// import MemberShip from "@/components/HomePages/MemberShip";
// import Partner from "@/components/HomePages/Partner";
// import PersonalBrand from "@/components/HomePages/PersonalBrand";
// import Said from "@/components/HomePages/Said";
// import SaidThree from "@/components/HomePages/SaidThree";
// import SaidTwo from "@/components/HomePages/SaidTwo";
// import ServiceVideo from "@/components/HomePages/ServiceVideo";
// import React from "react";

// export const metadata = {
//   title: "Elevate Your Brand with Maven Advert | Digital Growth",
//   description:
//     ": Design. Launch. Grow. Maven Advert merges creativity, technology, and strategy to build remarkable brands and elevate every digital move with purpose.",
// };
// function page() {
//   return (
//     <>
//       <StickyShowcase />
//       <Partner />
//       <StickyShowCaseTwo />
//       <EverythingYouNeed />
//       <Said />
//       <Video />
//       <DynamicTestimonials />
//       <StickyShowCaseThree />
//       <PersonalBrand />
//       <ServiceVideo />
//       <SaidTwo />
//       <MemberShip />
//       <FeatureOn />
//       <SaidThree />
//     </>
//   );
// }

// export default page;
import StickyShowcase from "@/components/HomePages/StickyShowcase";
import StickyShowCaseThree from "@/components/HomePages/StickyShowCaseThree";
import StickyShowCaseTwo from "@/components/HomePages/StickyShowCaseTwo";
import Video from "@/components/HomePages/Video";
import DynamicTestimonials from "@/components/DynamicTestimonial/DynamicTestimonials";
import EverythingYouNeed from "@/components/HomePages/Card";
import FeatureOn from "@/components/HomePages/FeatureOn";
import MemberShip from "@/components/HomePages/MemberShip";
import Partner from "@/components/HomePages/Partner";
import PersonalBrand from "@/components/HomePages/PersonalBrand";
import Said from "@/components/HomePages/Said";
import SaidThree from "@/components/HomePages/SaidThree";
import SaidTwo from "@/components/HomePages/SaidTwo";
import ServiceVideo from "@/components/HomePages/ServiceVideo";
import React from "react";
import Script from "next/script";

export const metadata = {
  title: "Elevate Your Brand with Maven Advert | Digital Growth",
  description:
    ": Design. Launch. Grow. Maven Advert merges creativity, technology, and strategy to build remarkable brands and elevate every digital move with purpose.",
  openGraph: {
    title: "Elevate Your Brand with Maven Advert | Digital Growth",
    description:
      ": Design. Launch. Grow. Maven Advert merges creativity, technology, and strategy to build remarkable brands and elevate every digital move with purpose.",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Maven Advert Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevate Your Brand with Maven Advert | Digital Growth",
    description:
      ": Design. Launch. Grow. Maven Advert merges creativity, technology, and strategy to build remarkable brands and elevate every digital move with purpose.",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

function page() {
  return (
    <>
      {/* Zoho SalesIQ Script */}
      <Script id="zoho-salesiq-init">
        {`
          window.$zoho = window.$zoho || {};
          $zoho.salesiq = $zoho.salesiq || { ready: function() {} };
        `}
      </Script>

      <Script
        id="zoho-salesiq-widget"
        src="https://salesiq.zohopublic.in/widget?wc=siqbac25e2bbb21c1d7cefbf92a45f8cfd1d3b35275b8d31a353b41cd92aa91a996"
        defer
      />

      {/* Your Original Components (NO CHANGE) */}
      <StickyShowcase />
      <Partner />
      <StickyShowCaseTwo />
      <EverythingYouNeed />
      <Said />
      <Video />
      {/* <DynamicTestimonials /> */}
      <StickyShowCaseThree />
      <PersonalBrand />
      <ServiceVideo />
      <SaidTwo />
      <MemberShip />
      <FeatureOn />
      <SaidThree />
    </>
  );
}

export default page;
