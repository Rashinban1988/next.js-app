/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',    // 静的HTML出力
    trailingSlash: true, // 末尾にスラッシュを付ける
    // images: {
        // protocol: 'https',
        // hostname: 'https://django-app.rakumanu.com',
        // unoptimized: true, // 画像の最適化を無効化
    // },
    // assetPrefix: '/django-app.rakumanu.com', // サブディレクトリにデプロイする場合
    // basePath: '/django-app.rakumanu.com',    // サブディレクトリにデプロイする場合
    // reactStrictMode: true,

};

export default nextConfig;
