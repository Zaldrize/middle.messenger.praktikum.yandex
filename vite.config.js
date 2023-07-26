import { defineConfig } from 'vite';
import { resolve } from 'path';
import { checker } from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'stylelint';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  /* "plugins": [handlebars({
    "partialDirectory": resolve(__dirname, 'src/pages')
  })] */
  plugins: [handlebars(), checker({ typescript: true }), eslint(), stylelint()],
});
