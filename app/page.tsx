import StickyShowcase from "@/components/HomePages/StickyShowcase";
import StickyShowCaseThree from "@/components/HomePages/StickyShowCaseThree";
import StickyShowCaseTwo from "@/components/HomePages/StickyShowCaseTwo";
import Video from "@/components/HomePages/Video";
import EverythingYouNeed from "@/components/HomePages/Card";
import FeatureOn from "@/components/HomePages/FeatureOn";
import MemberShip from "@/components/HomePages/MemberShip";
import Partner from "@/components/HomePages/Partner";
import PersonalBrand from "@/components/HomePages/PersonalBrand";
import Said from "@/components/HomePages/Said";
import SaidThree from "@/components/HomePages/SaidThree";
import SaidTwo from "@/components/HomePages/SaidTwo";
import ServiceVideo from "@/components/HomePages/ServiceVideo";
import CinematicVideo from "@/components/HomePages/CinematicVideo";

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
      {/* Your Original Components (NO CHANGE) */}
      <StickyShowcase />
      <Partner />
      <StickyShowCaseTwo />
      <FeatureOn />

      <EverythingYouNeed />
      <Said />
      <Video />
      {/* <DynamicTestimonials /> */}
      <StickyShowCaseThree />
      <PersonalBrand />
      <ServiceVideo />
      <CinematicVideo />

      <SaidTwo />
      <MemberShip />
      {/* <SaidThree /> */}
    </>
  );
}

export default page;
