import WebContent from "@/components/WebDevelopmentPages/WebContent";
import WebHero from "@/components/WebDevelopmentPages/WebHero";
import React from "react";
export const metadata = {
  title: "Digital Sales Infrastructure & Automation Solutions",
  description:
    "We design connected sales ecosystems—integrating CRM, chatbots, and analytics to automate growth, improve conversions, and drive lasting impact.",
};

function page() {
  return (
    <>
      <WebHero />
      <WebContent />
    </>
  );
}

export default page;
