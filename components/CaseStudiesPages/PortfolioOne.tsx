"use client";
import React from "react";
import Image from "next/image";
import { items } from "@/public/data/item"; // assuming items.ts is in /data folder
import Link from "next/link";

function PortfolioOne() {
  // Separate items by section
  const hero = items.find((item) => item.section === "hero");
  const productSection1 = items.filter(
    (item) => item.section === "product-section-1"
  );
  const productSection2 = items.filter(
    (item) => item.section === "product-section-2"
  );
  const productSection3 = items.filter(
    (item) => item.section === "product-section-3"
  );
  const productSection4 = items.filter(
    (item) => item.section === "product-section-4"
  );

  return (
    <div className="w-full bg-white text-gray-900">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold tracking-widest uppercase">
              rgn
            </div>
            <div className="text-3xl font-bold tracking-widest uppercase">
              ovn
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">Renova bottle</h2>
          <p className="text-gray-500 max-w-lg">
            The smart bottle features technology that keeps you connected.
          </p>
          <div className="flex gap-3 mt-2 text-sm text-gray-400">
            <span>SHARE NOW:</span>
            <div className="flex gap-2">
              <Link href="#" className="hover:text-gray-800">
                Fb
              </Link>
              <Link href="#" className="hover:text-gray-800">
                Tw
              </Link>
              <Link href="#" className="hover:text-gray-800">
                Ln
              </Link>
              <Link href="#" className="hover:text-gray-800">
                Pt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      {hero && (
        <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          <h1 className="absolute text-[8vw] font-extrabold tracking-tighter opacity-10 select-none">
            PACKAGING DESIGN
          </h1>
          <div className="relative z-10">
            <Image
              src={hero.image}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center py-10 border-b border-gray-200">
        <div>
          <h3 className="font-semibold">Awards</h3>
          <p className="text-gray-500 text-sm">Best packaging</p>
        </div>
        <div>
          <h3 className="font-semibold">Industry</h3>
          <p className="text-gray-500 text-sm">Lifestyle</p>
        </div>
        <div>
          <h3 className="font-semibold">Services</h3>
          <p className="text-gray-500 text-sm">Product design</p>
        </div>
        <div>
          <h3 className="font-semibold">Country</h3>
          <p className="text-gray-500 text-sm">Indonesia</p>
        </div>
      </section>

      {/* Product Section 1 */}
      {productSection1.length > 0 && (
        <section className="w-full bg-green-100 py-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
            {productSection1.map((item) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="rounded-lg shadow-lg"
              />
            ))}
          </div>
        </section>
      )}

      {/* Product Section 2 */}
      {productSection2.length > 0 && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-20 px-6">
          <div>
            <Image
              src={productSection2[0].image}
              alt={productSection2[0].alt}
              width={productSection2[0].width}
              height={productSection2[0].height}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">LOREM IPSUM</h2>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>◆ Lorem ipsum dolor sit amet, consectetuer</li>
              <li>◆ Lorem ipsum dolor sit amet, consectetuer</li>
              <li>◆ Lorem ipsum dolor sit amet, consectetuer</li>
            </ul>
          </div>
        </section>
      )}

      {/* Product Section 3 */}
      {productSection3.length > 0 && (
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-20 px-6">
          {productSection3.map((item) => (
            <div key={item.id}>
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="rounded-lg shadow-lg"
              />
            </div>
          ))}
        </section>
      )}

      {/* Product Section 4 */}
      {productSection4.length > 0 && (
        <section className="w-full bg-gray-900 py-20 text-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">
            <div className="col-span-1">
              <h2 className="text-2xl font-bold mb-4">LOREM IPSUM</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
            {productSection4.map((item) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="rounded-lg shadow-lg"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default PortfolioOne;
