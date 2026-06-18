import type { NextConfig } from "next"
import path from "path"
import { validateEnv } from "./lib/env"

validateEnv()

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.77.105"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    optimizeServerReact: true,
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        source: "/:path((?!_next/).*)\\.(svg|png|jpg|jpeg|webp|avif|ico|woff2)$",
        locale: false,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },
}

export default async function () {
  if (process.env.ANALYZE === "true") {
    const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
      enabled: true,
    })
    return withBundleAnalyzer(nextConfig)
  }
  return nextConfig
}
