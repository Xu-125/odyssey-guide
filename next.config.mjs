/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/odyssey-guide",
  assetPrefix: "/odyssey-guide/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
