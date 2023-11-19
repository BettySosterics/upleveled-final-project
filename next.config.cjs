/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    // serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  // Add the domain for videos
  // video: {
  //   domains: ['res.cloudinary.com'],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
