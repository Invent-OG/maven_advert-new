// "use client";

// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import LenisProvider from "./providers/LenisProvider";
// import { usePathname } from "next/navigation";
// import { Toaster } from "react-hot-toast";
// import QueryProvider from "./providers/QueryProvider";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isAdminRoute = pathname.startsWith("/admin");

//   return (
//     <html lang="en">
//       <body className="antialiased" suppressHydrationWarning={true}>
//         <QueryProvider>
//           {isAdminRoute ? (
//             <main>{children}</main>
//           ) : (
//             <LenisProvider>
//               {!isAdminRoute && <Navbar />}
//               <main>{children}</main>
//               {!isAdminRoute && <Footer />}
//               {/* ✅ Toast Provider */}
//               <Toaster
//                 position="top-center"
//                 containerStyle={{ zIndex: 9999 }}
//                 toastOptions={{
//                   duration: 4000,
//                   style: {
//                     borderRadius: "10px",
//                     background: "#333",
//                     color: "#fff",
//                   },
//                   success: {
//                     iconTheme: { primary: "#22c55e", secondary: "#fff" },
//                   },
//                   error: {
//                     iconTheme: { primary: "#ef4444", secondary: "#fff" },
//                   },
//                 }}
//               />
//             </LenisProvider>
//           )}
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }
"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./providers/QueryProvider";
import localFont from "next/font/local";
import LenisProvider from "./providers/LenisProvider";

const resistSans = localFont({
  src: [
    {
      path: "../public/fonts/fonnts.com-resisttext-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-thinoblique.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-lightoblique.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-regularoblique.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-mediumoblique.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-boldoblique.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-extraboldoblique.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-resisttext-blackoblique.otf",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-resist-sans",
});

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
        className={`${resistSans.className} antialiased`}
        suppressHydrationWarning={true}
      >
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
      </body>
    </html>
  );
}
