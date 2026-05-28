import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  server: {
    host: true,
    allowedHosts: ["swift-bumpers-burn.loca.lt"],
  },
});
