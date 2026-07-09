/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
    unoptimized: true, // Disable Vercel image optimization to save resources - use TMDB's CDN instead
    // formats: ['image/avif', 'image/webp'], // Disabled to save Vercel resources
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Disabled to save Vercel resources
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Disabled to save Vercel resources
  },
  swcMinify: true,
  reactStrictMode: true,
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  generateEtags: true, // Enable ETag for caching
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
