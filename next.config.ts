import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  turbopack: {
    root: path.resolve("."),
  },
};

export default nextConfig;
