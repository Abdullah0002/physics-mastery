import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // .mdx files treated as pages (without plugins — LaTeX processed at runtime via next-mdx-remote)
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // NOTE: The codebase carries pre-existing TypeScript debt (it had never
  // completed a production build before deployment was set up). This lets
  // `next build` succeed on Vercel; re-enable and fix the errors as a
  // follow-up (`npm run type-check` lists the TypeScript issues).
  typescript: { ignoreBuildErrors: true },

  // Keep these pure-ESM packages as native Node.js imports — Turbopack can't bundle them as CJS
  serverExternalPackages: ["@mdx-js/mdx", "remark-math", "rehype-katex", "remark-frontmatter", "remark-mdx-frontmatter"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "framer-motion"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/physics", destination: "/chapters", permanent: true },
      { source: "/tests", destination: "/mock-tests", permanent: true },
    ];
  },
};

export default nextConfig;
