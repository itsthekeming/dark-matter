module.exports = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/compendium',
        destination: '/compendium/all',
        permanent: true,
      },
    ]
  },
}
