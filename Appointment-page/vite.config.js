import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@custom': path.resolve(__dirname, './src/components/custom'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@shad': path.resolve(__dirname, './src/components/ui'),
    }
  }
})
