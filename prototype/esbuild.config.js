import { build, transform } from 'esbuild';
import { cp, rm, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outDir   = './dist';
const outFile  = join(outDir, 'app.js');
//  Both CSS files get minified after copy. dervo.css must sit next to app.js
//  because src/styles.js resolves it via `new URL('./dervo.css', import.meta.url)`.
const cssFiles = [
  join(outDir, 'assets/nf.css'),
  join(outDir, 'dervo.css'),
];

const buildConfig = {
  entryPoints: ['./app.js'],
  bundle: true,
  format: 'esm',
  target: 'esnext',
  minify: true,
  treeShaking: true,
  charset: 'utf8',
  outfile: outFile,
  logLevel: 'info',
};

const staticAssets = [
  { from: './index.html',         to: join(outDir, 'index.html') },
  { from: './assets',             to: join(outDir, 'assets') },
  { from: '../src/dervo.css',     to: join(outDir, 'dervo.css') },
];

const clean    = () => rm(outDir, { recursive: true, force: true });
const ensureDir = () => mkdir(outDir, { recursive: true });
const copyOne  = ({ from, to }) => cp(from, to, { recursive: true });
const copyAll  = assets => Promise.all(assets.map(copyOne));

//  esbuild emits `var` at top-level when bundling. Convert each `var` to
//  `const` if the binding is never reassigned, otherwise to `let`.
const isReassigned = src => name => {
  const re = new RegExp(`(^|[^.\\w$])${name}\\s*=[^=]`, 'g');
  let hits = 0;
  while (re.exec(src) !== null) hits += 1;
  return hits > 1; //  one hit is the declaration itself
};

const namesIn = head =>
  [...head.matchAll(/[A-Za-z_$][A-Za-z0-9_$]*/g)].map(m => m[0]);

const anyReassigned = src => head =>
  namesIn(head).some(isReassigned(src));

const rewriteVars = src =>
  src.replace(/^var (\{[^}]+\}|\[[^\]]+\]|\w+)(\s*=)/gm, (_, head, eq) =>
    `${anyReassigned(src)(head) ? 'let' : 'const'} ${head}${eq}`
  );

const postProcess = path =>
  readFile(path, 'utf8')
    .then(rewriteVars)
    .then(out => writeFile(path, out));

//  Minify CSS in-place via esbuild's transform API.
//  Strips whitespace + comments and applies safe syntax minification.
const minifyCss = path =>
  readFile(path, 'utf8')
    .then(src => transform(src, {
      loader: 'css',
      minify: true,
      charset: 'utf8',
    }))
    .then(({ code }) => writeFile(path, code));

const run = () =>
  clean()
    .then(ensureDir)
    .then(() => Promise.all([build(buildConfig), copyAll(staticAssets)]))
    .then(() => Promise.all([postProcess(outFile), ...cssFiles.map(minifyCss)]));

run().catch(err => {
  console.error(err);
  process.exit(1);
});
