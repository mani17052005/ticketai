import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative assets make the build work on GitHub Pages regardless of repository name.
export default defineConfig({
  plugins: [react()],
  base: './',
});
