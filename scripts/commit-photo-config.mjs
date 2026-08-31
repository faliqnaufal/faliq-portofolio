import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: npm run photos:commit -- /path/to/exported-config.json');
  process.exit(1);
}

const root = process.cwd();
const outputDir = path.join(root, 'public', 'portfolio-images');
const outputConfig = path.join(root, 'public', 'portfolio-photos-config.json');
fs.mkdirSync(outputDir, { recursive: true });

const source = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
if (!source || typeof source !== 'object' || Array.isArray(source)) {
  throw new Error('Photo config must be a JSON object keyed by image ID.');
}

const mimeExtensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg'
};

const optimized = {};
const hashToFilename = new Map();
let extracted = 0;

for (const [key, value] of Object.entries(source)) {
  if (!value || typeof value !== 'object') continue;
  const config = { ...value };
  const url = typeof config.url === 'string' ? config.url : '';
  const match = url.match(/^data:([^;]+);base64,(.*)$/s);

  if (match) {
    const [, mime, encoded] = match;
    const bytes = Buffer.from(encoded, 'base64');
    const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    const ext = mimeExtensions[mime] || 'bin';
    const safeKey = key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'image';
    let filename = hashToFilename.get(hash);
    if (!filename) {
      filename = `${safeKey}-${hash}.${ext}`;
      const destination = path.join(outputDir, filename);
      if (!fs.existsSync(destination)) {
        fs.writeFileSync(destination, bytes);
        extracted += 1;
      }
      hashToFilename.set(hash, filename);
    }

    config.url = `portfolio-images/${filename}`;
  }

  optimized[key] = config;
}

fs.writeFileSync(outputConfig, `${JSON.stringify(optimized, null, 2)}\n`, 'utf8');
console.log(`Committed ${Object.keys(optimized).length} image configs.`);
console.log(`Wrote ${extracted} new image assets.`);
console.log(`Updated ${path.relative(root, outputConfig)}.`);
