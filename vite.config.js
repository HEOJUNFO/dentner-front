import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import path from 'path';
import process from 'process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      https: false,
      host: '0.0.0.0',
      port: 4000,
    },
    plugins: [
      react(),
      mkcert(),
      VitePWA({
        injectRegister: 'auto',
        registerType: 'autoUpdate',
        devOptions: { enabled: true }, // vite dev 로 돌려도 PWA 까지 볼 수 있게끔 주는 옵션
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: '덴트너',
          short_name: '덴트너',
          theme_color: '#ffffff',
          icons: [

            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },

          ],
        },
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            GoogleMapApiKey: env.VITE_APP_GOOGLE_MAP_API_KEY,
          },
        },
      }),
    ],
    //base: './', // 상대 경로 설정
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, './src/pages'),
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/api'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@modal': path.resolve(__dirname, './src/components/ui/modal'),
        '@store': path.resolve(__dirname, './src/store'),
      },
    },
    define: { global: 'window' },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      sourcemap: false,
    },
  };
});
