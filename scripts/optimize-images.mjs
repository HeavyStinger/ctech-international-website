import { readdir, mkdir } from 'node:fs/promises';
import { extname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/* Converts raw images under assets-raw/portfolio/<group>/ into resized .webp
   files under public/portfolio/<group>/.
   Two layouts are supported per group:
   - flat: assets-raw/portfolio/websites/yec.png -> public/portfolio/websites/yec.webp
   - one-folder-per-item (for multi-image albums, e.g. flyers):
     assets-raw/portfolio/flyers/tsunami-adventures/*.jpg
       -> public/portfolio/flyers/tsunami-adventures/tsunami-adventures-1.webp, -2.webp, ...
     (renamed to <folder-name>-<n>.webp, ordered by any number found in the
     original filename so messy source names like "IMG_5.jpg" still land in
     the right sequence)
   Usage: node scripts/optimize-images.mjs [group] (defaults to all groups) */

const RAW_ROOT = new URL('../assets-raw/portfolio/', import.meta.url);
const OUT_ROOT = new URL('../public/portfolio/', import.meta.url);
const MAX_DIMENSION = 960;
const QUALITY = 80;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff']);

function naturalSort(a, b) {
  const numA = a.match(/\d+/);
  const numB = b.match(/\d+/);
  if (numA && numB) return parseInt(numA[0], 10) - parseInt(numB[0], 10);
  return a.localeCompare(b);
}

async function convertFile(inPath, outDirUrl, baseName) {
  await mkdir(outDirUrl, { recursive: true });
  const outPath = join(fileURLToPath(outDirUrl), `${baseName}.webp`);
  await sharp(inPath)
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);
  return outPath;
}

async function processGroup(group) {
  const rawDirUrl = new URL(`${group}/`, RAW_ROOT);
  const outDirUrl = new URL(`${group}/`, OUT_ROOT);

  let entries;
  try {
    entries = await readdir(fileURLToPath(rawDirUrl), { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // one-folder-per-item album: rename to <folder-name>-<n>.webp, in natural order
      const itemRawDir = fileURLToPath(new URL(`${entry.name}/`, rawDirUrl));
      const itemOutDirUrl = new URL(`${entry.name}/`, outDirUrl);
      const files = (await readdir(itemRawDir))
        .filter((f) => EXTS.has(extname(f).toLowerCase()))
        .sort(naturalSort);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const outName = `${entry.name}-${i + 1}`;
        const inPath = join(itemRawDir, file);
        await convertFile(inPath, itemOutDirUrl, outName);
        console.log(`✓ ${group}/${entry.name}/${file} -> portfolio/${group}/${entry.name}/${outName}.webp`);
      }
    } else if (EXTS.has(extname(entry.name).toLowerCase())) {
      const name = basename(entry.name, extname(entry.name));
      const inPath = fileURLToPath(new URL(entry.name, rawDirUrl));
      await convertFile(inPath, outDirUrl, name);
      console.log(`✓ ${group}/${entry.name} -> portfolio/${group}/${name}.webp`);
    }
  }
}

const requestedGroup = process.argv[2];
const groups = requestedGroup ? [requestedGroup] : await readdir(fileURLToPath(RAW_ROOT)).catch(() => []);

for (const group of groups) {
  await processGroup(group);
}

console.log('Done.');
