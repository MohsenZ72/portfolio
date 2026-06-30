import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Set to your repo name when deploying to https://<user>.github.io/<repo>/
// Use '/' if the repo is named <user>.github.io
const repoName = 'portfolio'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss()],
})
