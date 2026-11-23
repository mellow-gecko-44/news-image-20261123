// news-image-20261123 entry (Node 22, standard library only).
// The image is the front page in entry.png beside this file; the program
// copies it to the grader's output directory as entry.png.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

if (!existsSync(source)) {
  throw new Error('entry.png is missing from the repository');
}

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(source);
writeFileSync(target, bytes);

// Read it back: the grader runs this program twice and the two runs
// must write the same bytes, so confirm the copy landed intact.
const written = readFileSync(target);
if (written.length !== bytes.length || !written.equals(bytes)) {
  throw new Error('entry.png did not copy cleanly');
}
console.log(`wrote ${target} (${written.length} bytes)`);
