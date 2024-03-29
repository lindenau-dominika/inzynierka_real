import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://garnuchy.pl/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/xd': {
        target: 'http://127.0.0.1:5000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xd/, ''),
      },
    },
  },
})


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//     },
//     extend: {},
//   },
//   plugins: [],
// }

