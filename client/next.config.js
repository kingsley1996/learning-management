/** @type {import('next').NextConfig}  */
const nextConfig = {
  images: {
    domains: ['d26sniwowg0n19.cloudfront.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
