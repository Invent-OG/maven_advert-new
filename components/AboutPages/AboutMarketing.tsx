"use client";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LiquidButton } from "../ui/liquid-glass-button";
import { useRouter } from "next/navigation";

function AboutMarketing() {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const bgImage =
    "url('https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651201/logos_png-02_ykasmr.png')";

  return (
    <section className="w-full bg-[#f8fafc] py-20 overflow-hidden">
      {/* FIX */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          data-aos="fade-right"
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
        >
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              Committed staff are <br /> ready to help you.
            </h2>
          </div>

          <div
            data-aos="fade-left"
            className="md:w-1/2 mt-6 md:mt-0 text-left md:pl-16"
          >
            <p className="text-gray-500 leading-relaxed text-[17px]">
              We curate an excellent quality hand-crafted email template designs
              that enhance readability of users with possibility.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col justify-center items-center gap-8">
          {/* Card 1 */}
          {/* <div
            data-aos="fade-up"
            className="relative bg-white p-12 overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all"
          >
            <div
              className="absolute bottom-4 -right-72 sm:-right-24 lg:-right-86 w-[620px] sm:w-[600px] lg:w-[880px] h-[180px] opacity-40 bg-no-repeat bg-contain pointer-events-none"
              style={{
                backgroundImage: bgImage,
                backgroundPosition: "right bottom",
              }}
            ></div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6 leading-snug">
              Build a greatest career <br /> with crafto marketing.
            </h3>
            <LiquidButton
              onClick={() => router.push("/contact")}
              size="lg"
              radius="md"
            >
              Join with us
            </LiquidButton>
          </div> */}

          {/* Card 2 */}
          <div
            data-aos="fade-left"
            className="relative bg-white overflow-hidden p-12 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div
              className="absolute bottom-4 -right-72 sm:-right-24 lg:-right-86 w-[620px] sm:w-[600px] lg:w-[880px] h-[180px] opacity-40 bg-no-repeat bg-contain pointer-events-none"
              style={{
                backgroundImage: bgImage,
                backgroundPosition: "right bottom",
              }}
            ></div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6 leading-snug">
              Ready to work together <br /> for better solutions.
            </h3>
            <LiquidButton
              onClick={() => router.push("/contact")}
              size="lg"
              radius="md"
            >
              Contact us
            </LiquidButton>
          </div>

          {/* Card 3 */}
          {/* <div
            data-aos="fade-down"
            className="relative bg-white p-12 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div
              className="absolute bottom-4 -right-72 sm:-right-24 lg:-right-86 w-[620px] sm:w-[600px] lg:w-[880px] h-[180px] opacity-40 bg-no-repeat bg-contain pointer-events-none"
              style={{
                backgroundImage: bgImage,
                backgroundPosition: "right bottom",
              }}
            ></div>

            <h3 className="text-xl font-bold text-neutral-800 mb-6 leading-snug">
              I only intended to be a <br /> freelancer marketing.
            </h3>
            <LiquidButton
              onClick={() => router.push("/contact")}
              size="lg"
              radius="md"
            >
              Contact now
            </LiquidButton>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default AboutMarketing;
