import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue()],
    server: {
      proxy: {
        "/options": {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
        "/print-jobs": {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
        "/printer-status": {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
        "/printer-direct-print": {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
        "/textvariant": {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
        "/barcodemapping": {
          target: env.VITE_API_DOMAIN,
          changeOrigin: true,
        },
      },
    },
  };
});
