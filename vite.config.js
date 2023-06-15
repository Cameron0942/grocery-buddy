import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: '/grocery-buddy/',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  build: {
    outDir: 'docs',
  },
});
