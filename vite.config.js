import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset paths relative, so the build works on GitHub Pages
// (served from /repo-name/) and on Cloudflare Pages (served from /).
export default defineConfig({
  base: './',
  plugins: [react()],
});
