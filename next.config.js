/** @type string */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
`

const securityHeaders = [
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
]

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: process.env.NODE_ENV !== 'development',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack(config) {
    config.experiments = { asyncWebAssembly: true }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
}
