const path = require('node:path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  webpack: function (config, options) {    
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './src/'),
        '@modules': path.resolve(__dirname, './src/server/modules/'),
        '@client': path.resolve(__dirname, './src/client/'),
        '@shared': path.resolve(__dirname, './src/shared/'),
        '@public': path.resolve(__dirname, './src/public/'),
        //'@assets': path.resolve(__dirname, './src/assets/'),
        //'@components': path.resolve(__dirname, './src/components/'),
        //'@services': path.resolve(__dirname, './src/services/'),
        //'@models': path.resolve(__dirname, './src/models/'),
        //'@utilities': path.resolve(__dirname, './src/utilities/'),
        //'@hooks': path.resolve(__dirname, './src/hooks/'),
        //'@public': path.resolve(__dirname, './public/')
      }
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/design-system',
        destination: '/design-system/summary', 
        permanent: true,
      },
    ]
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: '**',
  //       port: '',
  //       pathname: '**',
  //     },
  //   ],
  // },
  // experimental: {
  //   swcPlugins: [['typewind/swc', {}]],
  // },
}

module.exports = nextConfig