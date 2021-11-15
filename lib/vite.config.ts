import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Types from 'vite-plugin-vue-type-imports';

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue(), Types()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
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
