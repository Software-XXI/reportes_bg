import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
