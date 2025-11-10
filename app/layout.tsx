// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import LenisProvider from "./providers/LenisProvider";

// export const metadata = {
//   title: "Marketo",
//   description: "Marketing website",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="antialiased">
//         <LenisProvider>
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//         </LenisProvider>
//       </body>
//     </html>
//   );
// }
"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "./providers/LenisProvider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // detect admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="antialiased">
        <LenisProvider>
          {/* hide Navbar + Footer inside /admin */}
          {!isAdminRoute && <Navbar />}
          <main>{children}</main>
          {!isAdminRoute && <Footer />}
        </LenisProvider>
      </body>
    </html>
  );
}
