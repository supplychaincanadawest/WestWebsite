#!/usr/bin/env node
/**
 * Auto-generates manifest.json in both logo folders on every Vercel build.
 * Drop files into assets/sponsors/ or assets/Company Representation/ and push.
 */
const fs   = require('fs');
const path = require('path');

function buildManifest(dir, label) {
  if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); return; }
  const logos = fs.readdirSync(dir)
    .filter(f => /\.(png|jpg|jpeg|webp|svg|jfif)$/i.test(f))
    .sort();
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ logos }, null, 2) + '\n');
  console.log(`✓ ${label} manifest: ${logos.length} logo(s)`);
  if (logos.length) console.log(' ', logos.join(', '));
}

buildManifest(path.join(__dirname, '..', 'assets', 'sponsors'), 'Sponsors');
buildManifest(path.join(__dirname, '..', 'assets', 'Company Representation'), 'Company Representation');
buildManifest(path.join(__dirname, '..', 'assets', 'past-partners'), 'Past Partners');
buildManifest(path.join(__dirname, '..', 'assets', 'premier-sponsors'), 'Premier Sponsors');
