// app/layout.tsx
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Maven Advert",
  description: "Digital Marketing Agency",
  verification: {
    google: "SuR_RBkV1GgB0p9V1Rli7bwzvlrpwwikTdYfTAZuCEk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleTagManager gtmId="GTM-PXM9CLGB" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}