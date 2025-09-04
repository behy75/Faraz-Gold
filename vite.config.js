// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    plugins: [react()],
    base: isProd ? "/static/" : "/", // dev=/ ، prod=/static/trade/
    server: {
      port: 5173,
      strictPort: true,
      host: "localhost",
      // proxy: {
      //   "/room": {
      //     target: "http://localhost:8000",
      //     changeOrigin: true,
      //     secure: false,
      //   },
      //   "/dashboard": {
      //     target: "http://localhost:8000",
      //     changeOrigin: true,
      //     secure: false,
      //   },
      //   "/static": {
      //     target: "http://localhost:8000",
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: true,
    },
  };
});
