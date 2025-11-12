import ServicesMainCard from "@/components/ServicesMainPages/ServicesMainCard";
import ServicesMainFeedBack from "@/components/ServicesMainPages/ServicesMainFeedBack";
import ServicesMainGrowth from "@/components/ServicesMainPages/ServicesMainGrowth";
import ServicesMainHero from "@/components/ServicesMainPages/ServicesMainHero";
import ServicesMainPlan from "@/components/ServicesMainPages/ServicesMainPlan";
import ServicesMainSolution from "@/components/ServicesMainPages/ServicesMainSolution";
import React from "react";

function page() {
  return (
    <div>
      <ServicesMainHero />
      <ServicesMainSolution />
      <ServicesMainGrowth />
      <ServicesMainCard />
      <ServicesMainPlan />
      <ServicesMainFeedBack />
    </div>
  );
}

export default page;
