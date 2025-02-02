import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isProd = import.meta.env.MODE === 'production'
const backendUrl = import.meta.env.VITE_BACKEND_URL || (isProd ? '' : 'http://localhost:5001')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: isProd,
        cookieDomainRewrite: {
          '*': ''
        },
        cookiePathRewrite: {
          '*': '/'
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
