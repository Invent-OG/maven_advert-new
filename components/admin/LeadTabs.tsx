// "use client";
// import { z } from "zod";

// type Lead = z.infer<typeof leadSchema>;

// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { Pagination } from "@/components/ui/pagination";
// import { DeleteConfirmation } from "./DeleteConfirmation";
// import { useLeads, useDeleteLead } from "@/lib/queries/leads";
// import { toast } from "sonner";

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { format } from "date-fns";
// import { Skeleton } from "../ui/skeleton";
// import { leadSchema } from "@/lib/types/leads";

// export default function LeadTabs() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [localSearchTerm, setLocalSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   const { data, isLoading, error } = useLeads(
//     currentPage,
//     itemsPerPage,
//     debouncedSearch,
//     selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
//   );

//   const deleteMutation = useDeleteLead();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedSearch(localSearchTerm);
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, [localSearchTerm]);

//   const handleDelete = async (id: Lead["id"]) => {
//     if (!id) return;
//     try {
//       await deleteMutation.mutateAsync(id);
//       toast.success("Lead deleted", {
//         description: "The lead has been successfully deleted.",
//       });
//       setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
//     } catch {
//       toast.error("Failed to delete lead", {
//         description: "Please try again.",
//       });
//     }
//   };

//   const handleSelectAll = (leads: Lead[]) => {
//     const allIds = leads
//       .map((lead) => lead.id)
//       .filter((id): id is string => !!id);
//     setSelectedIds((prev) => (prev.length === leads.length ? [] : allIds));
//   };

//   const handleSelectOne = (id: Lead["id"]) => {
//     if (!id) return;
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(
//         selectedIds.map((id) => deleteMutation.mutateAsync(id))
//       );
//       toast.success("Selected leads deleted");
//       setSelectedIds([]);
//     } catch {
//       toast.error("Failed to delete selected leads");
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setSelectedIds([]);
//   };

//   const handleDateReset = () => {
//     setSelectedDate(null);
//   };

//   const handleExport = (): void => {
//     const leadsToExport = data?.leads || [];

//     const headers = ["Name", "WhatsApp Number", "email", "message"];

//     const csv = [
//       headers,
//       ...leadsToExport.map((lead) => [
//         lead.name,
//         lead.whatsappNumber,
//         lead.email,
//         lead.message,
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `leads.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//     toast.success(`Leads exported successfully!`);
//   };

//   if (isLoading) {
//     return (
//       <div className="rounded-md border overflow-hidden">
//         <div className="p-4 border-b bg-muted">
//           <Skeleton className="h-6 w-1/3" />
//         </div>
//         <table className="w-full table-auto">
//           <thead>
//             <tr className="border-b">
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-4" />
//               </th>
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-24" />
//               </th>
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-32" />
//               </th>
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-20" />
//               </th>
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-20" />
//               </th>
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-24" />
//               </th>
//               <th className="p-4 text-left">
//                 <Skeleton className="h-4 w-20" />
//               </th>
//               <th className="p-4 text-right">
//                 <Skeleton className="h-4 w-16" />
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...Array(5)].map((_, idx) => (
//               <tr key={idx} className="border-b">
//                 {[...Array(8)].map((__, tdIdx) => (
//                   <td
//                     key={tdIdx}
//                     className={`p-4 ${tdIdx === 7 ? "text-right" : ""}`}
//                   >
//                     <Skeleton className="h-4 w-full" />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center text-red-500">
//         Error loading leads: {(error as Error).message}
//       </div>
//     );
//   }

//   const leads: Lead[] = data?.leads ?? [];
//   const totalPages = data?.totalPages ?? 1;
//   const totalCount = data?.totalCount ?? 0;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <div className="relative w-64">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
//           <Input
//             placeholder="Search leads..."
//             value={localSearchTerm}
//             onChange={(e) => setLocalSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>
//                 <Checkbox
//                   checked={
//                     selectedIds.length === leads.length && leads.length > 0
//                   }
//                   onCheckedChange={() => handleSelectAll(leads)}
//                 />
//               </TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Number</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Message</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {leads.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-6">
//                   No leads found.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               leads
//                 .filter((lead): lead is Lead & { id: string } => !!lead.id)
//                 .map((lead) => (
//                   <TableRow key={lead.id}>
//                     <TableCell>
//                       <Checkbox
//                         checked={selectedIds.includes(lead.id)}
//                         onCheckedChange={() => handleSelectOne(lead.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{lead.name}</TableCell>
//                     <TableCell>{lead.whatsappNumber}</TableCell>
//                     <TableCell>{lead.email}</TableCell>
//                     <TableCell>{lead.message}</TableCell>
//                     {/* <TableCell>
//                       {new Date(lead.createdAt).toLocaleDateString()}
//                     </TableCell> */}
//                     {/* <TableCell>{lead.type}</TableCell> */}
//                     <TableCell className="text-right">
//                       <DeleteConfirmation
//                         onDelete={() => handleDelete(lead.id)}
//                         title="Delete Lead"
//                         description="Are you sure you want to delete this lead? This action cannot be undone."
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {leads.length > 0 && totalPages > 1 && (
//         <div className="mt-4 flex items-center justify-between">
//           <div className="text-sm text-muted-foreground">
//             Showing {leads.length} of {totalCount} leads
//           </div>
//           <div className="flex items-center gap-4">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//             <Select
//               value={itemsPerPage.toString()}
//               onValueChange={(value: string) => {
//                 setItemsPerPage(Number(value));
//                 setCurrentPage(1);
//               }}
//             >
//               <SelectTrigger className="w-[120px]">
//                 {itemsPerPage} / page
//               </SelectTrigger>
//               <SelectContent>
//                 {[5, 10, 20, 50].map((num) => (
//                   <SelectItem key={num} value={num.toString()}>
//                     {num}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Trash2, Mail, Phone } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useLeads, useDeleteLead } from "@/lib/queries/leads";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { leadSchema } from "@/lib/types/leads";

type Lead = z.infer<typeof leadSchema>;

export default function LeadTabs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const { data, isLoading, error } = useLeads(
    currentPage,
    itemsPerPage,
    debouncedSearch,
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
  );

  const deleteMutation = useDeleteLead();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(localSearchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localSearchTerm]);

  const handleDelete = async (id: Lead["id"]) => {
    if (!id) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Lead deleted", {
        description: "The lead has been successfully deleted.",
      });
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    } catch {
      toast.error("Failed to delete lead", {
        description: "Please try again.",
      });
    }
  };

  const handleSelectAll = (leads: Lead[]) => {
    const allIds = leads
      .map((lead) => lead.id)
      .filter((id): id is string => !!id);
    setSelectedIds((prev) => (prev.length === leads.length ? [] : allIds));
  };

  const handleSelectOne = (id: Lead["id"]) => {
    if (!id) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      await Promise.all(
        selectedIds.map((id) => deleteMutation.mutateAsync(id))
      );
      toast.success("Selected leads deleted", {
        description: `${selectedIds.length} leads have been deleted.`,
      });
      setSelectedIds([]);
    } catch {
      toast.error("Failed to delete selected leads");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  const handleExport = (): void => {
    const leadsToExport = data?.leads || [];

    const headers = [
      "Name",
      "WhatsApp Number",
      "Email",
      "Message",
      "Created At",
    ];

    const csv = [
      headers,
      ...leadsToExport.map((lead) => [
        lead.name,
        lead.whatsappNumber,
        lead.email,
        lead.message,
        lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success(`Leads exported successfully!`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-8 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-red-200 rounded-lg bg-red-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <p className="font-semibold text-red-700">Error loading leads</p>
          <p className="text-sm text-red-600">{(error as Error).message}</p>
          <Button
            variant="outline"
            className="mt-2 border-red-200 text-red-700 hover:bg-red-100"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const leads: Lead[] = data?.leads ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Lead Management
          </h1>
          <p className="text-gray-500 mt-1">
            {totalCount} {totalCount === 1 ? "lead" : "leads"} collected
            {debouncedSearch && " · Filtered results"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex border rounded-lg p-1 bg-gray-50">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={`px-3 ${viewMode === "table" ? "shadow-sm" : ""}`}
            >
              Table
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`px-3 ${viewMode === "grid" ? "shadow-sm" : ""}`}
            >
              Grid
            </Button>
          </div>

          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={deleteMutation.isPending}
              className="shadow-sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedIds.length})
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleExport}
            disabled={leads.length === 0}
            className="bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search leads by name, email, phone, or message..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value: string) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[160px] border-gray-300">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        /* Table View */
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedIds.length === leads.length && leads.length > 0
                    }
                    onCheckedChange={() => handleSelectAll(leads)}
                  />
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Contact
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Phone
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Message
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="font-semibold text-gray-600">
                        No leads found
                      </p>
                      <p className="text-sm text-gray-500 max-w-sm">
                        {debouncedSearch
                          ? "No leads match your search criteria. Try different keywords."
                          : "Start collecting leads to see them appear here."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                leads
                  .filter((lead): lead is Lead & { id: string } => !!lead.id)
                  .map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="hover:bg-gray-50/50 border-b last:border-b-0"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(lead.id)}
                          onCheckedChange={() => handleSelectOne(lead.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {lead.name}
                          </span>
                          <div className="flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {lead.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="font-mono text-sm text-gray-700">
                            {lead.whatsappNumber}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[240px]">
                          <span className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {lead.message || (
                              <span className="text-gray-400 italic">
                                No message provided
                              </span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full border border-blue-100">
                          <span className="text-xs font-medium text-blue-700">
                            {lead.createdAt
                              ? format(new Date(lead.createdAt), "MMM dd, yyyy")
                              : "Unknown"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DeleteConfirmation
                          onDelete={() => handleDelete(lead.id)}
                          title="Delete Lead"
                          description="Are you sure you want to delete this lead? This action cannot be undone."
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leads.length === 0 ? (
            <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-600">No leads found</p>
                <p className="text-sm text-gray-500">
                  {debouncedSearch
                    ? "Try adjusting your search terms"
                    : "No leads available"}
                </p>
              </div>
            </div>
          ) : (
            leads
              .filter((lead): lead is Lead & { id: string } => !!lead.id)
              .map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedIds.includes(lead.id)}
                        onCheckedChange={() => handleSelectOne(lead.id)}
                      />
                      <h3 className="font-semibold text-gray-900 truncate">
                        {lead.name}
                      </h3>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-lg border border-green-100">
                      <span className="text-xs font-medium text-green-700">
                        {lead.createdAt
                          ? format(new Date(lead.createdAt), "MMM dd")
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 truncate">
                        {lead.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-mono text-gray-700">
                        {lead.whatsappNumber}
                      </span>
                    </div>

                    {lead.message && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {lead.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <DeleteConfirmation
                      onDelete={() => handleDelete(lead.id)}
                      title="Delete Lead"
                      description="Are you sure you want to delete this lead? This action cannot be undone."
                    />
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* Pagination */}
      {leads.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(currentPage * itemsPerPage, totalCount)}
            </span>{" "}
            of <span className="font-semibold">{totalCount}</span> leads
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}