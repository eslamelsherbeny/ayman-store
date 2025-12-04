/** @type {import('next').NextConfig} */
const nextConfig = {
  // إضافة إعدادات الصور هنا
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // السماح بنطاق صور Pexels
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // السماح بنطاق صور Unsplash
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
