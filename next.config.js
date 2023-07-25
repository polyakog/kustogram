/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js"); // настройка для работы библиотеки по смене языка
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        port: "",
        pathname: "/**"
      }
    ]
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
