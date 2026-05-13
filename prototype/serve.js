import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve('./dist');
const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.map':  'application/json; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
};

const mimeOf = path => mimeTypes[extname(path).toLowerCase()] || 'application/octet-stream';

const stripQuery = url => url.split('?')[0].split('#')[0];

const decodeUrl = url => {
  try { return decodeURIComponent(url); }
  catch { return url; }
};

const toFsPath = url => {
  const clean = stripQuery(decodeUrl(url));
  const rel = normalize(clean).replace(/^([\\/])+/, '');
  return join(root, rel);
};

const isInsideRoot = path => {
  const r = resolve(path);
  return r === root || r.startsWith(root + sep);
};

const resolveTarget = path =>
  stat(path)
    .then(s => (s.isDirectory() ? join(path, 'index.html') : path))
    .catch(() => path);

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { 'Cache-Control': 'no-cache', ...headers });
  res.end(body);
};

const sendFile = res => path =>
  readFile(path)
    .then(buf => send(res, 200, buf, { 'Content-Type': mimeOf(path) }))
    .catch(() => send(res, 404, 'Not Found', { 'Content-Type': 'text/plain' }));

const handle = (req, res) => {
  const fsPath = toFsPath(req.url || '/');
  if (!isInsideRoot(fsPath)) {
    send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain' });
    return;
  }
  resolveTarget(fsPath).then(sendFile(res));
};

const logRequest = (req, res) => {
  const start = Date.now();
  res.on('finish', () =>
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - start}ms)`)
  );
};

const server = createServer((req, res) => {
  logRequest(req, res);
  handle(req, res);
});

server.listen(port, host, () => {
  console.log(`Serving ${root}`);
  console.log(`http://${host}:${port}/`);
});
