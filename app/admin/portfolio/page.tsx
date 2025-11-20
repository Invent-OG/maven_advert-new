"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ClientPortfolio,
  useDeletePortfolio,
  useGetPortfolios,
} from "@/lib/queries/portfolio";
import { cn } from "@/lib/utils";

const PortfolioSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="h-48 bg-muted animate-pulse" />
    <CardHeader className="space-y-3">
      <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
      <div className="h-4 w-full bg-muted animate-pulse rounded" />
      <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
    </CardHeader>
    <CardFooter className="justify-between">
      <div className="h-10 w-20 bg-muted animate-pulse rounded" />
      <div className="h-10 w-20 bg-muted animate-pulse rounded" />
    </CardFooter>
  </Card>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 bg-white">
    <p className="text-lg font-medium text-muted-foreground">
      You haven&apos;t created any portfolio entries yet.
    </p>
    <p className="text-sm text-muted-foreground mt-2">
      Showcase your case studies, layouts, and imagery for the portfolio page.
    </p>
    <Link
      href="/admin/portfolio/create"
      className={cn(buttonVariants(), "mt-6")}
    >
      Create your first portfolio
    </Link>
  </div>
);

type PortfolioCardProps = {
  portfolio: ClientPortfolio;
  onDelete: (portfolio: ClientPortfolio) => void;
  deletingId: string | null;
};

const PortfolioCard = ({
  portfolio,
  onDelete,
  deletingId,
}: PortfolioCardProps) => {
  const heroImage = portfolio.images[0] ?? "/placeholder.svg";
  const formattedDate = portfolio.createdAt
    ? new Date(portfolio.createdAt).toLocaleDateString()
    : "—";
  const isDeleting = deletingId === portfolio.id;

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48 w-full bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={portfolio.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
          Layout {portfolio.layoutId}
        </span>
      </div>
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{portfolio.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {portfolio.description}
        </CardDescription>
        <p className="text-xs text-muted-foreground">Updated {formattedDate}</p>
      </CardHeader>
      <CardContent className="pt-0 text-sm text-muted-foreground space-y-2">
        <p>
          Images:{" "}
          <span className="font-medium text-foreground">
            {portfolio.images.length}
          </span>
        </p>
        {portfolio.content && (
          <p className="line-clamp-2 text-xs">{portfolio.content}</p>
        )}
      </CardContent>
      <CardFooter className="justify-between gap-2 mt-auto flex-wrap">
        <Link
          href={`/casestudies/${portfolio.id}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "flex gap-1.5"
          )}
        >
          <Eye className="h-4 w-4" />
          View live
        </Link>
        <Link
          href={`/admin/portfolio/edit/${portfolio.id}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex gap-1.5"
          )}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1.5"
          disabled={isDeleting}
          onClick={() => onDelete(portfolio)}
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Deleting
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              Delete
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function PortfolioListPage() {
  const { data, isLoading, isError, refetch } = useGetPortfolios();
  const deleteMutation = useDeletePortfolio();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const portfolios = useMemo(() => data ?? [], [data]);

  const handleDelete = (portfolio: ClientPortfolio) => {
    if (!portfolio.id) return;
    const confirmed = window.confirm(
      `Delete "${portfolio.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setPendingDeleteId(portfolio.id);
    deleteMutation.mutate(portfolio.id, {
      onSuccess: () => {
        toast.success(`Deleted "${portfolio.title}"`);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete portfolio entry."
        );
      },
      onSettled: () => {
        setPendingDeleteId(null);
      },
    });
  };

  return (
    <div className="p-8 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Admin / Portfolio
          </p>
          <h1 className="text-3xl font-bold">Portfolio Library</h1>
          <p className="text-muted-foreground">
            Manage the case studies and layouts that power the public site.
          </p>
        </div>
        <Link
          href="/admin/portfolio/create"
          className={buttonVariants({ variant: "orange" })}
        >
          + New Portfolio
        </Link>
      </header>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <PortfolioSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-destructive">
          <p className="font-semibold">Failed to load portfolios.</p>
          <p className="text-sm mt-1">
            Please check your connection and try again.
          </p>
          <Button className="mt-4" variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : portfolios.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onDelete={handleDelete}
              deletingId={pendingDeleteId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
