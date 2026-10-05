import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { portfolios } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validate as isUuid } from "uuid";
import { PortfolioLayouts } from "@/components/Portfolio";
import { Portfolio, PortfolioBlock } from "@/lib/types/portfolios";
import BlockRenderer from "@/components/Portfolio/BlockRenderer";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const allPortfolios = await db.select({ id: portfolios.id }).from(portfolios);
    return allPortfolios.map((p) => ({
      id: p.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params for casestudies:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (!isUuid(id)) {
    return {
      title: "Case Study Not Found | Maven Advert",
      robots: { index: false, follow: false },
    };
  }

  try {
    const [found] = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, id));

    if (!found) {
      return {
        title: "Case Study Not Found | Maven Advert",
        robots: { index: false, follow: false },
      };
    }

    let images: string[] = [];
    try {
      images =
        typeof found.images === "string" ? JSON.parse(found.images) : found.images;
    } catch {
      images = [];
    }

    const title = `${found.title} | Case Study | Maven Advert`;
    const description =
      found.description ||
      "Explore this client success story and creative case study by Maven Advert.";

    return {
      title,
      description,
      alternates: {
        canonical: `/casestudies/${found.id}`,
      },
      openGraph: {
        title,
        description,
        url: `/casestudies/${found.id}`,
        type: "article",
        images: images.length > 0 ? [{ url: images[0] }] : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for casestudy:", error);
    return {
      title: "Case Study | Maven Advert",
      robots: { index: false, follow: false },
    };
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isUuid(id)) {
    notFound();
  }

  let found: typeof portfolios.$inferSelect | undefined;
  try {
    const [result] = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.id, id));
    found = result;
  } catch (error) {
    console.error("Error fetching portfolio from DB:", error);
  }

  if (!found) {
    notFound();
  }

  let images: string[] = [];
  try {
    images =
      typeof found.images === "string" ? JSON.parse(found.images) : found.images;
  } catch {
    images = [];
  }

  let blocks: PortfolioBlock[] = [];
  try {
    blocks =
      typeof found.blocks === "string"
        ? JSON.parse(found.blocks)
        : found.blocks || [];
  } catch {
    blocks = [];
  }

  const portfolio: Portfolio = {
    ...found,
    images,
    layoutId: Number(found.layoutId),
    blocks,
  };

  // Check for Dynamic Blocks first
  if (portfolio.blocks && portfolio.blocks.length > 0) {
    return (
      <div
        className="w-full min-h-screen pb-20 transition-colors duration-300"
        style={{
          background: (() => {
            try {
              if (portfolio.content && portfolio.content.startsWith("{")) {
                const settings = JSON.parse(portfolio.content);
                return (
                  settings.gradient || settings.backgroundColor || "#ffffff"
                );
              }
            } catch {}
            return "#ffffff";
          })(),
        }}
      >
        <BlockRenderer blocks={portfolio.blocks} />
        {portfolio.websiteUrl && (
          <a
            href={portfolio.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-2xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 font-medium"
          >
            <span>Visit Site</span>
            <FaExternalLinkAlt className="w-3 h-3" />
          </a>
        )}
      </div>
    );
  }

  const Layout = PortfolioLayouts[portfolio.layoutId];

  if (!Layout) {
    notFound();
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
