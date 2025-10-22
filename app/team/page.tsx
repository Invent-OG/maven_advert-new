import TeamHero from "@/components/TeamPages/TeamHero";
import TeamImages from "@/components/TeamPages/TeamImages";
import TeamResult from "@/components/TeamPages/TeamResult";
import React from "react";

function page() {
  return (
    <>
      <TeamHero />
      <TeamResult />
      <TeamImages />
    </>
  );
}

export default page;
