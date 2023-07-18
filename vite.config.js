import { defineConfig } from 'vite'
import {resolve} from 'path'
import handlebars from './vite-plugin-handlebars-precompile';
import { checker } from 'vite-plugin-checker';

export default defineConfig({
  "root": resolve(__dirname, 'src'),
  "build": {
    "outDir": resolve(__dirname,'dist')
  },
 /* "plugins": [handlebars({
    "partialDirectory": resolve(__dirname, 'src/pages')
  })]*/
  "plugins": [handlebars(), checker({typescript: true})],
});
