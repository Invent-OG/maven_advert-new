import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Lead } from "@/lib/types/leads"; // ✅ use this instead of your manual interface

// API Functions
const fetchLeads = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  date?: string,
  type?: string
): Promise<{ leads: Lead[]; totalCount: number; totalPages: number }> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append("search", search);
  if (date) params.append("date", date);
  if (type) params.append("type", type);

  const response = await fetch(`/api/leads?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch leads");
  return response.json();
};

const createLead = async (
  data: Omit<Lead, "id" | "createdAt">
): Promise<Lead> => {
  // Validate the lead before sending
  // (optional but great for catching invalid form data)
  // leadSchema.parse(data);

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create lead in Supabase");
  return response.json();
};

const deleteLead = async (id: string): Promise<void> => {
  const response = await fetch(`/api/leads?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete lead");
};

// Hooks
export function useLeads(
  page: number = 1,
  limit: number = 10,
  search: string = "",
  date?: string,
  type?: string
) {
  return useQuery({
    queryKey: ["leads", page, limit, search, date, type],
    queryFn: () => fetchLeads(page, limit, search, date, type),
    refetchInterval: 60000,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
