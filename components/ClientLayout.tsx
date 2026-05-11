"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AOSInit from "./AOSInit";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../app/providers/QueryProvider";
import LenisProvider from "../app/providers/LenisProvider";
import Script from "next/script";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <Script
        src="https://cdn-in.pagesense.io/js/mavenadvert/da6dbad7d7624e8db32cbed1b852ee0c.js"
        strategy="afterInteractive"
      />
      <LenisProvider>
        <QueryProvider>
          {isAdminRoute ? (
            <main>{children}</main>
          ) : (
            <>
              <AOSInit />
              {!isAdminRoute && <Navbar />}
              <main>{children}</main>
              {!isAdminRoute && <Footer />}
              <Toaster
                position="top-center"
                containerStyle={{ zIndex: 9999 }}
                toastOptions={{
                  duration: 4000,
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                  success: {
                    iconTheme: { primary: "#22c55e", secondary: "#fff" },
                  },
                  error: {
                    iconTheme: { primary: "#ef4444", secondary: "#fff" },
                  },
                }}
              />
            </>
          )}
        </QueryProvider>
      </LenisProvider>
      {/* Zoho SalesIQ Script - Only load on non-admin pages */}
      {!isAdminRoute && (
        <>
          <Script id="zoho-init" strategy="afterInteractive">
            {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
          </Script>
          <Script
            id="zsiqscript"
            src="https://salesiq.zohopublic.in/widget?wc=siqbac25e2bbb21c1d7cefbf92a45f8cfd1d3b35275b8d31a353b41cd92aa91a996"
            strategy="lazyOnload"
          />
        </>
      )}
    </>
  );
}
