/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN: "https://next-todolist-kb.vercel.app",
    DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
    DATABASE_USER: process.env.DATABASE_USER || "root",
    DATABASE_DATABASE: process.env.DATABASE_DATABASE || "todolist",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "뉴진스의 하잎보이",
  },
};

module.exports = nextConfig;
