import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
  // Add this block to tell Vite how to handle the specific TanStack query path
  vite: {
    build: {
      rollupOptions: {
        external: ["@tanstack/query-core"],
      },
    },
  },
});