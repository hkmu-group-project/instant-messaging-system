import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        unoptimized: true,
    },
    reactCompiler: true,
    reactStrictMode: true,
    turbopack: {
        rules: {
            "*.svg": {
                loaders: [
                    "@svgr/webpack",
                ],
                as: "*.js",
            },
        },
    },
};

export default nextConfig;
