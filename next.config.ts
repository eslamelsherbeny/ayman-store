import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // السماح لصور Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // السماح لصور Pexels (عشان الصور الافتراضية)
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
