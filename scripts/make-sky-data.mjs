// Builds src/data/sky.json from the d3-celestial catalogue (BSD-3-Clause, (c) Olaf Frohn).
// Run once with `node scripts/make-sky-data.mjs`; the output is committed, so builds never need it.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../node_modules/d3-celestial/data/', import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
const ra = (lon) => +((lon + 360) % 360).toFixed(2);
const r2 = (v) => +v.toFixed(2);

const MAG_LIMIT = 4.8;
const names = read('starnames.json');
const stars = read('stars.6.json')
  .features.filter((f) => f.properties.mag <= MAG_LIMIT)
  .map((f) => {
    const [lon, dec] = f.geometry.coordinates;
    const row = [ra(lon), r2(dec), r2(f.properties.mag), r2(parseFloat(f.properties.bv) || 0.6)];
    const name = f.properties.mag <= 1.4 && names[f.id]?.name;
    return name ? [...row, name] : row;
  });

const constNames = Object.fromEntries(read('constellations.json').features.map((f) => [f.id, f.properties.en]));
const lines = read('constellations.lines.json').features.map((f) => ({
  id: f.id,
  name: constNames[f.id] || f.id,
  rank: Number(f.properties.rank),
  lines: f.geometry.coordinates.map((line) => line.map(([lon, dec]) => [ra(lon), r2(dec)])),
}));

// Milky Way: the faint outline and the brighter core, thinned to keep the file small.
const mw = read('mw.json').features
  .filter((f) => ['ol1', 'ol3', 'ol5'].includes(f.id))
  .map((f) => ({
    level: Number(f.id.slice(2)),
    polys: f.geometry.coordinates.flatMap((poly) =>
      poly
        .map((ring) => ring.filter((_, i) => i % 4 === 0).map(([lon, dec]) => [+((lon + 360) % 360).toFixed(1), +dec.toFixed(1)]))
        .filter((ring) => ring.length > 3),
    ),
  }));

writeFileSync(new URL('../src/data/sky.json', import.meta.url), JSON.stringify({ stars, lines, mw }));
console.log(`stars ${stars.length}, constellations ${lines.length}, milky way rings ${mw.reduce((n, m) => n + m.polys.length, 0)}`);
