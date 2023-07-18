import { build } from 'esbuild';
import { glsl } from 'esbuild-plugin-glsl-include';
import copyStaticFiles from 'esbuild-copy-static-files';

build({
  entryPoints: ['./src/index.js'],
  outfile: './dist/bundle.js',
  bundle: true,
  plugins: [
    glsl(),
    copyStaticFiles({
      src: './static',
      dest: './dist',
    }),
  ]
}).catch(() => process.exit(1));
