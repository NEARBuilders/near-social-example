/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.near.social'],
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig;