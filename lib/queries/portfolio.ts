import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Portfolio,
  PortfolioSchema,
  CreatePortfolioInput,
  CreatePortfolioSchema,
  UpdatePortfolioInput,
  UpdatePortfolioSchema,
} from "@/lib/types/portfolios";

// ---------------------
// Fetch All Portfolios
// ---------------------
export const useGetPortfolios = () => {
  return useQuery({
    queryKey: ["portfolios"],
    queryFn: async (): Promise<Portfolio[]> => {
      const res = await fetch("/api/portfolio");
      const data = await res.json();

      const parsed = PortfolioSchema.array().safeParse(data);
      if (!parsed.success) {
        console.error("Zod validation error:", parsed.error);
        throw new Error("Invalid portfolio data received from server");
      }

      return parsed.data;
    },
  });
};

// ---------------------
// Create Portfolio
// ---------------------
export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePortfolioInput) => {
      const parsed = CreatePortfolioSchema.safeParse({
        ...input,
        layoutId: Number(input.layoutId),
      });

      if (!parsed.success) {
        throw new Error(parsed.error.errors[0]?.message || "Invalid input");
      }

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error("Failed to create portfolio");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

// ---------------------
// Update Portfolio
// ---------------------
export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePortfolioInput) => {
      const parsed = UpdatePortfolioSchema.safeParse({
        ...input,
        layoutId:
          input.layoutId !== undefined ? Number(input.layoutId) : undefined,
      });

      if (!parsed.success) {
        throw new Error(
          parsed.error.errors[0]?.message || "Invalid update input"
        );
      }

      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error("Failed to update portfolio");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

// ---------------------
// Delete Portfolio
// ---------------------
export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("ID is required");

      const res = await fetch("/api/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete portfolio");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};
