/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  trailingSlash: true,
  assetPrefix: isProd ? process.env.WEBSITE_URL : "http://localhost:3000",
  images: {
    deviceSizes: [350, 480, 640, 768, 960, 1250, 2048],
    loader: "custom",
    loaderFile: "./src/lib/imgLoader.js",
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
