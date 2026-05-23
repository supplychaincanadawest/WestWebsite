#!/usr/bin/env node
/**
 * Auto-generates assets/sponsors/manifest.json from all image files
 * in assets/sponsors/. Runs automatically on every Vercel build.
 * Just drop logo files into assets/sponsors/ and push — no other changes needed.
 */
const fs   = require('fs');
const path = require('path');

const sponsorDir = path.join(__dirname, '..', 'assets', 'sponsors');

if (!fs.existsSync(sponsorDir)) {
  fs.mkdirSync(sponsorDir, { recursive: true });
}

const logos = fs.readdirSync(sponsorDir)
  .filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f))
  .sort();

const manifest = { logos };
fs.writeFileSync(
  path.join(sponsorDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n'
);

console.log(`✓ Sponsor manifest generated: ${logos.length} logo(s)`);
if (logos.length) console.log(' ', logos.join(', '));
