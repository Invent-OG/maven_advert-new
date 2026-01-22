"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./providers/QueryProvider";
import { Inter } from "next/font/google";
import LenisProvider from "./providers/LenisProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PXM9CLGB');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXM9CLGB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
        {/* Zoho SalesIQ Script */}
        <Script id="zoho-init" strategy="afterInteractive">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siqbac25e2bbb21c1d7cefbf92a45f8cfd1d3b35275b8d31a353b41cd92aa91a996"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
