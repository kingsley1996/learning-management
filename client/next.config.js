/** @type {import('next').NextConfig}  */
const nextConfig = {
  images: {
    domains: ['d26sniwowg0n19.cloudfront.net', 'img.vietqr.io', 'media2.dev.to',
      'dev-to-uploads.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Tối ưu hóa cho landing page
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', '@clerk/nextjs'],
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
