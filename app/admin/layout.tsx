"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
    if (!auth && !isLoginPage) router.push("/admin/login");
  }, [isLoginPage, router]);

  if (isAuthenticated === null && !isLoginPage)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
      </div>
    );

  const isPortfolioEditor =
    pathname.includes("/admin/portfolio/create") ||
    pathname.includes("/admin/portfolio/edit");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-white text-black">
        {!isLoginPage && isAuthenticated && <Sidebar />}
        <main
          className={`flex-1 transition-all duration-300 min-h-screen bg-gray-50 ${
            isPortfolioEditor ? "p-0" : "p-4 md:p-8 lg:p-10"
          }`}
        >
          {children}
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
