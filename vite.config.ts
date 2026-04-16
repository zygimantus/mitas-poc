import { defineConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
    plugins: [yaml()],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
    }
});