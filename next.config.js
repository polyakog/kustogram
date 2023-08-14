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
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "avatars.dzeninfra.ru",
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
