import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "hxtgxpzuhnhsesburmfl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "crafto.themezaa.com",
        pathname: "/marketing/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/blogs/:slug*",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/casestudies",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/casestudies/:path*",
        permanent: true,
      },
      {
        source: "/case-study",
        destination: "/casestudies",
        permanent: true,
      },
      {
        source: "/case-study/:path*",
        destination: "/casestudies/:path*",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/casestudies",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "/casestudies/:path*",
        permanent: true,
      },
      {
        source: "/3d",
        destination: "/3d-modelling",
        permanent: true,
      },
      {
        source: "/3dmodeling",
        destination: "/3d-modelling",
        permanent: true,
      },
      {
        source: "/3d-modeling",
        destination: "/3d-modelling",
        permanent: true,
      },
      {
        source: "/stall-fabrication",
        destination: "/stallfabrication",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
