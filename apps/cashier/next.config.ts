import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@org/shared", "@org/realtime"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
