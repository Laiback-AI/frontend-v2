/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fixes for pdfjs-dist
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
