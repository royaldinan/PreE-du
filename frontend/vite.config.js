import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['framer-motion', 'motion-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/framer-motion/, /motion-dom/, /node_modules/],
    },
  },
})
