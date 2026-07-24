import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Project Mayhem build config. base:'./' keeps asset paths relative so the
// built site works when opened from any sub-path or static host.
export default defineConfig({
  base: './',
  plugins: [svelte()],
});
