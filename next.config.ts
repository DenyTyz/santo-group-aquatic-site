import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_PAGES === "true" ? "/santo-group-aquatic-site" : "",
  reactStrictMode: true,
};

export default nextConfig;
