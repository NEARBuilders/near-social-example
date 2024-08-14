/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: '/near-social-example',
  distDir: 'build',
  reactStrictMode: true,
}

module.exports = nextConfig;