/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["plus.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**", // 允許該域名的所有路徑
      },
    ],
  },
};

export default nextConfig;
