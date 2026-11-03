// Builds public/vendor/react-live.js from react-live.src.js.
// Needs esbuild, react, react-dom and esprima resolvable (set NODE_PATH if they live elsewhere).
import { build } from 'esbuild';
await build({
  entryPoints: [new URL('./react-live.src.js', import.meta.url).pathname],
  outfile: new URL('../../public/vendor/react-live.js', import.meta.url).pathname,
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2019',
  legalComments: 'inline',
  define: { 'process.env.NODE_ENV': '"production"' },
  banner: { js: '/* React 19 + esprima JSX transform for Bit Lab live code. React: MIT (c) Meta Platforms, Inc. esprima: BSD-2-Clause (c) JS Foundation and contributors. */' },
});
console.log('built public/vendor/react-live.js');
