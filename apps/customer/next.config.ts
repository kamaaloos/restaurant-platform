import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@org/shared", "@org/realtime"],
  images: {
    // Menu image URLs are restaurant-configured; skip optimizer domain allowlists.
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
