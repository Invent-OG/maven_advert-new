"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Portfolio } from "@/lib/types/portfolios";

export default function PortfolioListPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/portfolio");
        const data: Portfolio[] = await res.json();

        // parse images if stringified
        const parsed = data.map((item) => ({
          ...item,
          images:
            typeof item.images === "string"
              ? JSON.parse(item.images)
              : item.images,
        }));

        setPortfolios(parsed);
      } catch (e) {
        console.error("Failed to load portfolios:", e);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-10 text-lg">Loading portfolios...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Portfolios</h1>

        <Link
          href="/admin/portfolio/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Portfolio
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <div className="p-6 text-gray-600 border rounded-lg bg-white">
          No portfolios created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg bg-white shadow hover:shadow-lg transition p-4"
            >
              <div className="h-40 w-full rounded overflow-hidden bg-gray-100">
                {p.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
              <p className="text-gray-600 mt-1">{p.description}</p>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/casestudies/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <Link
                  href={`/admin/portfolio/edit/${p.id}`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
