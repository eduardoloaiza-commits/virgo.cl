/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingIncludes: {
    "/api/admin/migrate": ["./drizzle/**/*.sql"],
  },
};

export default nextConfig;
