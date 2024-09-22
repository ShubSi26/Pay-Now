import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // This makes Vite accessible over the network
    port: 5173,           // Specify the port (you can change this)
    strictPort: true,     // If true, Vite won't fall back to another port if the specified one is in use
    open: true,           // Optional: Opens the app in the browser on start
  },
})
