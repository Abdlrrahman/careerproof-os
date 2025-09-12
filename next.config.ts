import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/careerproof-os',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
