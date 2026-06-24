import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts
    server: { entry: "server" },
  },
  // Force Nitro to configure for Vercel explicitly
  nitro: {
    preset: "vercel",
  },
});