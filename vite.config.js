import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      base: "/Delirio/wp-content/reactpress/apps/frontend/dist/",
      plugins: [react()],
    }
  } else {
    return {
      plugins: [react()],
    }
  }
})
