/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        pathname: '**',
      },
      {
        protocol: 'https', 
        hostname: 'images.pexels.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
