import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Project Mayhem build config. base:'./' keeps asset paths relative so the
// built site works when opened from any sub-path or static host.
export default defineConfig({
  base: './',
  plugins: [react()],
});
