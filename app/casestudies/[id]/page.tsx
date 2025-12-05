"use client";

import React, { useEffect, useState } from "react";
import { PortfolioLayouts } from "@/components/Portfolio";
import { Portfolio } from "@/lib/types/portfolios";

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

  const Layout = PortfolioLayouts[portfolio.layoutId];

  if (!Layout) {
    return (
      <div className="p-10 text-red-600">
        Invalid layout selected for this portfolio.
      </div>
    );
  }

  return (
    <Layout
      title={portfolio.title}
      description={portfolio.description}
      content={portfolio.content ?? ""}
      images={portfolio.images ?? []}
    />
  );
}
