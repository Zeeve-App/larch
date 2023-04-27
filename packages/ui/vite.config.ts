import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const ASSET_URL = process.env.ASSET_URL || "";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: `${ASSET_URL}`,
  resolve: {
    alias: {
      src : "/src",
      public : "/public",
    }
  }
});
