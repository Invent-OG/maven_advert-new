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
import { Inter } from "next/font/google";
import LenisProvider from "./providers/LenisProvider";

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
