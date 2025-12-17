"use client";

import React, { useEffect, useState } from "react";
import { PortfolioLayouts } from "@/components/Portfolio";
import { Portfolio, PortfolioBlock } from "@/lib/types/portfolios";
import BlockRenderer from "@/components/Portfolio/BlockRenderer";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/portfolio");
        const data: Portfolio[] = await res.json();

        const found = data.find((p) => p.id === id);
        if (!found) {
          console.error("Portfolio not found");
          setLoading(false);
          return;
        }

        let images: string[] = [];
        try {
          images =
            typeof found.images === "string"
              ? JSON.parse(found.images)
              : found.images;
        } catch {
          images = [];
        }

        setPortfolio({
          ...found,
          images,
          layoutId: Number(found.layoutId),
          blocks: typeof found.blocks === 'string' ? JSON.parse(found.blocks) : (found.blocks || []),
        });
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      }

      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!portfolio) return <div className="p-10">Portfolio Not Found</div>;

  // Check for Dynamic Blocks first
  if (portfolio.blocks && portfolio.blocks.length > 0) {
      return (
          <div className="w-full min-h-screen bg-white pb-20">
              <BlockRenderer blocks={portfolio.blocks} />
               {portfolio.websiteUrl && (
                    <a
                    href={portfolio.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-2xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 font-medium"
                    >
                    <span>Visit Site</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                    </a>
                )}
          </div>
      );
  }

  const Layout = PortfolioLayouts[portfolio.layoutId];

  // If no Blocks AND no valid Layout (e.g. layoutId 0 but blocks empty for some reason), show error or fallback
  if (!Layout) {
    return (
      <div className="p-10 text-red-600">
        Empty portfolio or invalid configuration.
      </div>
    );
  }

  return (
    <Layout
      title={portfolio.title}
      description={portfolio.description}
      content={portfolio.content ?? ""}
      images={portfolio.images ?? []}
      websiteUrl={portfolio.websiteUrl}
    />
  );
}
