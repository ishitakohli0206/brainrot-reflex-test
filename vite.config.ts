import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        howToPlay: resolve(import.meta.dirname, 'how-to-play/index.html'),
        reactionTimeGame: resolve(import.meta.dirname, 'reaction-time-game/index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
