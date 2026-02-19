"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Edit2,
  Trash2,
  Calendar,
  Search,
  Filter,
  Eye,
  Layout,
  User,
  LogOut,
} from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ClientPortfolio } from "@/lib/queries/portfolio";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/admin/DeleteConfirmation";

interface PortfolioTableProps {
  portfolios: ClientPortfolio[];
  onDelete: (portfolio: ClientPortfolio) => void;
  onBulkDelete: (ids: string[]) => void;
}

export default function PortfolioTable({
  portfolios,
  onDelete,
  onBulkDelete,
}: PortfolioTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string>("all");
  const [view, setView] = useState<"table" | "grid">("table");

  // --- Filtering & Searching Logic ---
  const filteredPortfolios = portfolios.filter((portfolio) => {
    // Search
    const matchesSearch =
      portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Layout Filter
    const matchesLayout =
      selectedLayout === "all" ||
      portfolio.layoutId.toString() === selectedLayout;

    // Date Filter
    const matchesDate =
      !selectedDate ||
      (portfolio.createdAt &&
        new Date(portfolio.createdAt).toDateString() ===
          selectedDate.toDateString());

    return matchesSearch && matchesLayout && matchesDate;
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const paginatedPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // --- Selection handlers ---
  const handleSelectAll = () => {
    if (selectedPortfolios.length === paginatedPortfolios.length) {
      setSelectedPortfolios([]);
    } else {
      setSelectedPortfolios(paginatedPortfolios.map((p) => p.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedPortfolios((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id],
    );
  };

  const handleDateReset = () => setSelectedDate(null);

  const resolveImage = (portfolio: ClientPortfolio) => {
    let img = portfolio.images?.[0];
    if (!img && portfolio.blocks) {
      const hero = portfolio.blocks.find(
        (b) => b.type === "hero" && b.content?.image,
      );
      if (hero) img = hero.content.image;
    }
    if (!img) return "/placeholder.svg";
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `https://res.cloudinary.com/dr9gcshs6/image/upload/${img}`;
  };

  // --- Unique Layouts for filter ---
  const layouts = [...new Set(portfolios.map((p) => p.layoutId))].sort(
    (a, b) => a - b,
  );

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedPortfolios.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedPortfolios.length} portfolio
                  {selectedPortfolios.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-sm text-gray-600">Ready for bulk action</p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => onBulkDelete(selectedPortfolios)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Content Rendering */}
      {view === "table" ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200/60 hover:bg-transparent">
                <TableHead className="w-12 py-4 pl-6">
                  <Checkbox
                    checked={
                      paginatedPortfolios.length > 0 &&
                      selectedPortfolios.length === paginatedPortfolios.length
                    }
                    onCheckedChange={handleSelectAll}
                    className="border-gray-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                  />
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-900">
                  Portfolio
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-900">
                  Layout
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-900">
                  Created By
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-900">
                  Date
                </TableHead>
                <TableHead className="py-4 font-semibold text-gray-900 text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedPortfolios.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No portfolios found
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      {searchTerm
                        ? "No portfolios match your search criteria."
                        : "Get started by creating your first portfolio."}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPortfolios.map((portfolio) => (
                  <TableRow
                    key={portfolio.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150"
                  >
                    <TableCell className="py-4 pl-6">
                      <Checkbox
                        checked={selectedPortfolios.includes(portfolio.id)}
                        onCheckedChange={() => handleSelect(portfolio.id)}
                        className="border-gray-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                          <Image
                            src={resolveImage(portfolio)}
                            alt={portfolio.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 max-w-md">
                          <Link
                            href={`/admin/portfolio/edit/${portfolio.id}`}
                            className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1 hover:text-orange-600 transition-colors"
                          >
                            {portfolio.title}
                          </Link>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {portfolio.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                        <Layout className="h-3 w-3 mr-1" />
                        Layout {portfolio.layoutId}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-3 w-3 text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {portfolio.createdBy || "Admin"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-gray-600">
                      {portfolio.createdAt
                        ? new Date(portfolio.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "—"}
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/casestudies/${portfolio.id}`}
                          target="_blank"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Link href={`/admin/portfolio/edit/${portfolio.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-100"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>

                        <DeleteConfirmation
                          onDelete={() => onDelete(portfolio)}
                          title="Delete Portfolio?"
                          description={`Are you sure you want to delete "${portfolio.title}"? This action cannot be undone.`}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPortfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={resolveImage(portfolio)}
                  alt={portfolio.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900 shadow-sm">
                    <Layout className="h-3 w-3 mr-1" />L{portfolio.layoutId}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-1">
                    {portfolio.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 h-10">
                    {portfolio.description || "No description provided"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                      {portfolio.createdAt
                        ? format(new Date(portfolio.createdAt), "MMM dd, yyyy")
                        : "No Date"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Link href={`/casestudies/${portfolio.id}`} target="_blank">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                    </Link>
                    <Link href={`/admin/portfolio/edit/${portfolio.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4 text-blue-600" />
                      </Button>
                    </Link>
                    <DeleteConfirmation
                      onDelete={() => onDelete(portfolio)}
                      title="Delete Portfolio?"
                      description="Irreversible action."
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredPortfolios.length)} of{" "}
            {filteredPortfolios.length} entries
          </div>
          <div className="flex items-center gap-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value: string) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
