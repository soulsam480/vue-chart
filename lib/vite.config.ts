import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Types from 'vite-plugin-vue-type-imports';

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue(), Types()],
  build: {
    target: 'esnext',
    minify: 'terser',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs', 'es', 'umd'],
      name: 'vue-chart',
    },
    rollupOptions: {
      external: ['vue', 'chart.js'],
      output: {
        globals: {
          vue: 'Vue',
          'chart.js': 'Chart',
          'chart.js/helpers': 'Chart.helpers',
        },
      },
    },
  },
});
