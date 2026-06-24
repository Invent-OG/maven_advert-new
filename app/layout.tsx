// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Maven Advert",
  description: "Digital Marketing Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleTagManager gtmId="GTM-PXM9CLGB" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}