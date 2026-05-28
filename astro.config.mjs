import { defineConfig } from "astro/config";

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ["sharp-brooms-sink.loca.lt"],
  },
});
