import { readdir, mkdir } from 'node:fs/promises';
import { extname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/* Converts raw partner/trust logos under assets-raw/partners/ into
   compact, transparent .webp under public/partners/, sized for a small
   marquee logo (not a full photo), alpha preserved so they sit cleanly
   on the dark background with no white box behind them.
   Usage: node scripts/optimize-partner-logos.mjs */

const RAW_DIR = new URL('../assets-raw/partners/', import.meta.url);
const OUT_DIR = new URL('../public/partners/', import.meta.url);
const MAX_DIMENSION = 400;
const QUALITY = 90;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function run() {
  await mkdir(fileURLToPath(OUT_DIR), { recursive: true });
  const entries = await readdir(fileURLToPath(RAW_DIR), { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && EXTS.has(extname(e.name).toLowerCase()));

  for (const entry of files) {
    const inPath = join(fileURLToPath(RAW_DIR), entry.name);
    const outName = basename(entry.name, extname(entry.name)).toLowerCase() + '.webp';
    const outPath = join(fileURLToPath(OUT_DIR), outName);
    await sharp(inPath)
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    console.log(`✓ partners/${entry.name} -> public/partners/${outName}`);
  }
  console.log('Done.');
}

run();
