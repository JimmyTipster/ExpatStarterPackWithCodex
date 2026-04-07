import type { NextConfig } from "next";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

const nextConfig: NextConfig = {
  ...(isMobile ? { output: "export" as const } : {}),
  images: {
    unoptimized: isMobile,
  },
};

export default nextConfig;
