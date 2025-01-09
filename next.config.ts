import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol
        hostname: 'easygrocery-server.onrender.com', // Specify the hostname
        pathname: '/**', // Allow all paths (or specify a specific path pattern)
      },
    ],
  },
};

export default nextConfig;

