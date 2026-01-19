import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
<<<<<<< Updated upstream
import { config } from "../front_jsd_project_group_2/src/config/config";
=======
import { config } from "./src/config/config.js";

>>>>>>> Stashed changes

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    proxy: {
      "/api": {
<<<<<<< Updated upstream
        target: config.apiUrl, // 🔥 เปลี่ยนเป็น port backend ของอัส
=======
        target: config.apiUrl, 
>>>>>>> Stashed changes
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})