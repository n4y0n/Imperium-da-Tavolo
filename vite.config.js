import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import CSV from "vite-plugin-csv";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'assets',
  },
  publicDir: 'src/tools',
  plugins: [react(), CSV()]
})
