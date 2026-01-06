// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
// import { toast } from "sonner";

// import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   ClientPortfolio,
//   useDeletePortfolio,
//   useGetPortfolios,
// } from "@/lib/queries/portfolio";
// import { cn } from "@/lib/utils";

// const PortfolioSkeleton = () => (
//   <Card className="overflow-hidden">
//     <div className="h-48 bg-muted animate-pulse" />
//     <CardHeader className="space-y-3">
//       <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
//       <div className="h-4 w-full bg-muted animate-pulse rounded" />
//       <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
//     </CardHeader>
//     <CardFooter className="justify-between">
//       <div className="h-10 w-20 bg-muted animate-pulse rounded" />
//       <div className="h-10 w-20 bg-muted animate-pulse rounded" />
//     </CardFooter>
//   </Card>
// );

// const EmptyState = () => (
//   <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 bg-white">
//     <p className="text-lg font-medium text-muted-foreground">
//       You haven&apos;t created any portfolio entries yet.
//     </p>
//     <p className="text-sm text-muted-foreground mt-2">
//       Showcase your case studies, layouts, and imagery for the portfolio page.
//     </p>
//     <Link
//       href="/admin/portfolio/create"
//       className={cn(buttonVariants(), "mt-6")}
//     >
//       Create your first portfolio
//     </Link>
//   </div>
// );

// type PortfolioCardProps = {
//   portfolio: ClientPortfolio;
//   onDelete: (portfolio: ClientPortfolio) => void;
//   deletingId: string | null;
// };

// const PortfolioCard = ({
//   portfolio,
//   onDelete,
//   deletingId,
// }: PortfolioCardProps) => {
//   const heroImage = portfolio.images[0] ?? "/placeholder.svg";
//   const formattedDate = portfolio.createdAt
//     ? new Date(portfolio.createdAt).toLocaleDateString()
//     : "—";
//   const isDeleting = deletingId === portfolio.id;

//   return (
//     <Card className="overflow-hidden flex flex-col">
//       <div className="relative h-48 w-full bg-muted">
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img
//           src={heroImage}
//           alt={portfolio.title}
//           className="h-full w-full object-cover"
//         />
//         <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
//           Layout {portfolio.layoutId}
//         </span>
//       </div>
//       <CardHeader className="space-y-2">
//         <CardTitle className="text-xl">{portfolio.title}</CardTitle>
//         <CardDescription className="line-clamp-3">
//           {portfolio.description}
//         </CardDescription>
//         <p className="text-xs text-muted-foreground">Updated {formattedDate}</p>
//       </CardHeader>
//       <CardContent className="pt-0 text-sm text-muted-foreground space-y-2">
//         <p>
//           Images:{" "}
//           <span className="font-medium text-foreground">
//             {portfolio.images.length}
//           </span>
//         </p>
//         {portfolio.content && (
//           <p className="line-clamp-2 text-xs">{portfolio.content}</p>
//         )}
//       </CardContent>
//       <CardFooter className="justify-between gap-2 mt-auto flex-wrap">
//         <Link
//           href={`/casestudies/${portfolio.id}`}
//           className={cn(
//             buttonVariants({ variant: "secondary", size: "sm" }),
//             "flex gap-1.5"
//           )}
//         >
//           <Eye className="h-4 w-4" />
//           View live
//         </Link>
//         <Link
//           href={`/admin/portfolio/edit/${portfolio.id}`}
//           className={cn(
//             buttonVariants({ variant: "outline", size: "sm" }),
//             "flex gap-1.5"
//           )}
//         >
//           <Pencil className="h-4 w-4" />
//           Edit
//         </Link>
//         <Button
//           variant="destructive"
//           size="sm"
//           className="flex items-center gap-1.5"
//           disabled={isDeleting}
//           onClick={() => onDelete(portfolio)}
//         >
//           {isDeleting ? (
//             <>
//               <Loader2 className="h-4 w-4 animate-spin" />
//               Deleting
//             </>
//           ) : (
//             <>
//               <Trash2 className="h-4 w-4" />
//               Delete
//             </>
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default function PortfolioListPage() {
//   const { data, isLoading, isError, refetch } = useGetPortfolios();
//   const deleteMutation = useDeletePortfolio();
//   const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

//   const portfolios = useMemo(() => data ?? [], [data]);

//   const handleDelete = (portfolio: ClientPortfolio) => {
//     if (!portfolio.id) return;
//     const confirmed = window.confirm(
//       `Delete "${portfolio.title}"? This cannot be undone.`
//     );
//     if (!confirmed) return;

//     setPendingDeleteId(portfolio.id);
//     deleteMutation.mutate(portfolio.id, {
//       onSuccess: () => {
//         toast.success(`Deleted "${portfolio.title}"`);
//       },
//       onError: (error) => {
//         toast.error(
//           error instanceof Error
//             ? error.message
//             : "Failed to delete portfolio entry."
//         );
//       },
//       onSettled: () => {
//         setPendingDeleteId(null);
//       },
//     });
//   };

//   return (
//     <div className="p-8 space-y-6">
//       <header className="flex flex-wrap items-center justify-between gap-4">
//         <div>
//           <p className="text-sm uppercase tracking-wide text-muted-foreground">
//             Admin / Portfolio
//           </p>
//           <h1 className="text-3xl font-bold">Portfolio Library</h1>
//           <p className="text-muted-foreground">
//             Manage the case studies and layouts that power the public site.
//           </p>
//         </div>
//         <Link
//           href="/admin/portfolio/create"
//           className={buttonVariants({ variant: "orange" })}
//         >
//           + New Portfolio
//         </Link>
//       </header>

//       {isLoading ? (
//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {Array.from({ length: 6 }).map((_, idx) => (
//             <PortfolioSkeleton key={idx} />
//           ))}
//         </div>
//       ) : isError ? (
//         <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-destructive">
//           <p className="font-semibold">Failed to load portfolios.</p>
//           <p className="text-sm mt-1">
//             Please check your connection and try again.
//           </p>
//           <Button className="mt-4" variant="outline" onClick={() => refetch()}>
//             Retry
//           </Button>
//         </div>
//       ) : portfolios.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {portfolios.map((portfolio) => (
//             <PortfolioCard
//               key={portfolio.id}
//               portfolio={portfolio}
//               onDelete={handleDelete}
//               deletingId={pendingDeleteId}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Eye,
  Loader2,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Calendar,
  Image,
  Layout,
} from "lucide-react";
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
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200" />
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 w-1/2 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
      <div className="h-4 w-full bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-2/3 bg-gray-200 rounded-lg mb-6" />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-gray-200 rounded-lg" />
          <div className="h-9 w-20 bg-gray-200 rounded-lg" />
          <div className="h-9 w-20 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white py-20 px-6 text-center">
    <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-6">
      <Plus className="h-10 w-10 text-blue-500" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      No Portfolio Entries Yet
    </h3>
    <p className="text-gray-600 max-w-md mb-2">
      Start building your portfolio to showcase your amazing work and case
      studies.
    </p>
    <p className="text-sm text-gray-500 mb-8">
      Create beautiful layouts that will impress your audience.
    </p>
    <Link
      href="/admin/portfolio/create"
      className={cn(
        buttonVariants({ size: "lg" }),
        "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
      )}
    >
      <Plus className="h-5 w-5 mr-2" />
      Create First Portfolio
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
  /* Logic to find the first valid image from blocks if portfolio.images is empty */
  let heroImage = portfolio.images[0];
  let isFromBlocks = false;

  if (!heroImage && portfolio.blocks && Array.isArray(portfolio.blocks)) {
    // 1. Try to find a HERO block image
    const heroBlock = portfolio.blocks.find(
      (b) => b.type === "hero" && b.content?.image
    );
    if (heroBlock) {
      heroImage = heroBlock.content.image;
      isFromBlocks = true;
    }

    // 2. If no Hero, try Image Full, split, or text split
    if (!heroImage) {
      const singleImgBlock = portfolio.blocks.find(
        (b) =>
          (b.type === "image_full" ||
            b.type === "image_with_text" ||
            b.type === "image_text_split") &&
          b.content?.image
      );
      if (singleImgBlock) {
        heroImage = singleImgBlock.content.image;
        isFromBlocks = true;
      }
    }

    // 3. If still nothing, try Gallery/Grid
    if (!heroImage) {
      const galleryBlock = portfolio.blocks.find(
        (b) =>
          (b.type === "gallery" ||
            b.type === "image_grid" ||
            b.type === "gallery_text_split") &&
          Array.isArray(b.content?.images) &&
          b.content.images.length > 0
      );
      if (galleryBlock) {
        heroImage = galleryBlock.content.images[0];
        isFromBlocks = true;
      }
    }
  }

  // Fallback if truly nothing found
  heroImage = heroImage ?? "/placeholder.svg";

  // Resolve Cloudinary URL if needed (simple helper inline)
  const resolveImageSrc = (value: string) => {
    if (!value) return "/placeholder.svg";
    if (value.startsWith("http") || value.startsWith("/")) return value;
    const cloudName = "dr9gcshs6"; // Hardcoded from observed logs, ideally env var
    return `https://res.cloudinary.com/${cloudName}/image/upload/${value}`;
  };

  const displayImage = resolveImageSrc(heroImage);

  const formattedDate = portfolio.createdAt
    ? new Date(portfolio.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const isDeleting = deletingId === portfolio.id;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-blue-100">
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={displayImage}
          alt={portfolio.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-900 shadow-sm border border-gray-200">
            Layout {portfolio.layoutId}
          </span>
        </div>

        {/* Image Count Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200">
          <Image className="h-3 w-3" />
          <span>
            {isFromBlocks ? "Block Content" : `${portfolio.images.length} images`}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {portfolio.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created {formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Layout className="h-4 w-4" />
              <span>Layout {portfolio.layoutId}</span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 leading-relaxed">
            {portfolio.description}
          </p>
        </div>

        {/* Content Preview */}
        {portfolio.content && (
          <div className="mb-6">
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="line-clamp-2">
                {portfolio.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 flex-1">
            <Link
              href={`/casestudies/${portfolio.id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "flex-1 gap-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-200"
              )}
            >
              <Eye className="h-4 w-4" />
              View
            </Link>
            <Link
              href={`/admin/portfolio/edit/${portfolio.id}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "flex-1 gap-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:text-green-700 transition-all duration-200"
              )}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </div>

          <Button
            variant="destructive"
            size="sm"
            className="gap-2 transition-all duration-200 hover:shadow-md"
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
        </div>
      </div>
    </div>
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
      `Are you sure you want to delete "${portfolio.title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setPendingDeleteId(portfolio.id);
    deleteMutation.mutate(portfolio.id, {
      onSuccess: () => {
        toast.success(`"${portfolio.title}" has been deleted successfully`);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete portfolio entry. Please try again."
        );
      },
      onSettled: () => {
        setPendingDeleteId(null);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                <p className="text-sm uppercase tracking-wider font-semibold text-gray-500">
                  Admin Portal / Portfolio Management
                </p>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Portfolio Library
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage and showcase your case studies, creative layouts, and
                portfolio entries that power your public website.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => refetch()}
                disabled={isLoading}
                className="gap-2 border-gray-300 hover:border-gray-400 text-gray-700 bg-white/80 backdrop-blur-sm"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Link
                href="/admin/portfolio/create"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2 shadow-lg hover:shadow-xl transition-all"
                )}
              >
                <Plus className="h-5 w-5" />
                New Portfolio
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total Portfolios
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {portfolios.length}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Active Layouts
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(portfolios.map((p) => p.layoutId)).size}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Total Images
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {portfolios.reduce((acc, p) => acc + p.images.length, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <PortfolioSkeleton key={idx} />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/80 backdrop-blur-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Failed to Load Portfolios
            </h3>
            <p className="text-red-600 mb-6 max-w-md mx-auto">
              We encountered an issue while loading your portfolio entries.
              Please check your connection and try again.
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Loading
            </Button>
          </div>
        ) : portfolios.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {portfolios.length}
                </span>{" "}
                portfolio entries
              </p>
            </div>

            {/* Portfolio Grid */}
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
          </>
        )}
      </div>
    </div>
  );
}
