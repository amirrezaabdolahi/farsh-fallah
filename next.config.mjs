/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",

    images: {
        domains: ["194.60.230.52", "127.0.0.1"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8080",
                pathname: "/media/**",
            },
            {
                protocol: "http",
                hostname: "194.60.230.52",
                port: "",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;
