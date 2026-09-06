import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: "/our-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
