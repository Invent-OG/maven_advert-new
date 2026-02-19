"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ClientPortfolio,
  useDeletePortfolio,
  useGetPortfolios,
} from "@/lib/queries/portfolio";
import { cn } from "@/lib/utils";
import PortfolioTable from "@/components/admin/PortfolioTable";

export default function PortfolioListPage() {
  const { data, isLoading, isError, refetch } = useGetPortfolios();
  const deleteMutation = useDeletePortfolio();

  const portfolios = useMemo(() => data ?? [], [data]);

  const handleDelete = (portfolio: ClientPortfolio) => {
    if (!portfolio.id) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${portfolio.title}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    deleteMutation.mutate(portfolio.id, {
      onSuccess: () => toast.success(`"${portfolio.title}" deleted`),
      onError: () => toast.error("Failed to delete portfolio"),
    });
  };

  const handleBulkDelete = (ids: string[]) => {
    if (!confirm(`Delete ${ids.length} portfolios?`)) return;

    // Naive implementation: delete one by one or add bulk delete endpoint
    // For now, let's just loop mutations or use a Promise.all if we had a bulk endpoint
    // Since we don't have a bulk endpoint in useDeletePortfolio, we might need to iterate
    // But let's verify if the user wants strictly bulk endpoint or just the UI.
    // I will iterate for now as a quick solution, or just show a toast "Not implemented" if too complex
    // actually BlogTable iterated.

    let completed = 0;
    let errors = 0;

    ids.forEach((id) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          completed++;
          if (completed + errors === ids.length) {
            toast.success(`Deleted ${completed} portfolios`);
          }
        },
        onError: () => {
          errors++;
        },
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Portfolio Library
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Manage and showcase your case studies
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/portfolio/create"
              className={cn(
                buttonVariants(),
                "bg-orange-600 hover:bg-orange-700 text-white gap-2 shadow-md",
              )}
            >
              <Plus className="h-4 w-4" />
              New Portfolio
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-red-600 bg-red-50 rounded-xl">
            Failed to load data
          </div>
        ) : (
          <PortfolioTable
            portfolios={portfolios}
            onDelete={handleDelete}
            onBulkDelete={handleBulkDelete}
          />
        )}
      </div>
    </div>
  );
}
