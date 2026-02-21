import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { ResumeDocument } from './resumeTemplate';

async function main() {
  const buffer = await renderToBuffer(<ResumeDocument />);
  const outPath = resolve(__dirname, '..', 'public', 'EshaSherryResume.pdf');
  writeFileSync(outPath, buffer);
  const sizeKB = (buffer.byteLength / 1024).toFixed(1);
  console.log(`Resume written to ${outPath} (${sizeKB} KB)`);
}

main().catch((err) => {
  console.error('Failed to generate resume:', err);
  process.exit(1);
});
