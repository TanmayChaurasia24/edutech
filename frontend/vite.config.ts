import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
        "/api": {
            target: "http://localhost:8000",
            changeOrigin: true,
            secure: false,
            // Optional: rewrite the URL if needed
            // rewrite: (path) => path.replace(/^\/api/, ''),
        },
    },
},
})
