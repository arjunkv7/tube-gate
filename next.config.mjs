/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com', // Google's image URL host
          },
        ],
      },
    webpack: (config) => {
        // Example: Adding a loader for SVG files
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
    
        // You can add more rules for different file types
        return config;
      },
};

export default nextConfig;
