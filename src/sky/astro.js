// Low-precision positions for a sky chart: good to a fraction of a degree,
// which is far below what a 400px chart can show.
// Sun and Moon: Astronomical Almanac low-precision formulae.
// Planets: JPL approximate Keplerian elements (valid 1800-2050).

const RAD = Math.PI / 180;
const sin = (d) => Math.sin(d * RAD);
const cos = (d) => Math.cos(d * RAD);
const norm = (d) => ((d % 360) + 360) % 360;

export const julianDay = (date) => date.getTime() / 86400000 + 2440587.5;

const obliquity = (n) => 23.439 - 0.0000004 * n;

function eclipticToEquatorial(lon, lat, eps) {
  const x = cos(lat) * cos(lon);
  const y = cos(lat) * sin(lon) * cos(eps) - sin(lat) * sin(eps);
  const z = cos(lat) * sin(lon) * sin(eps) + sin(lat) * cos(eps);
  return { ra: norm(Math.atan2(y, x) / RAD), dec: Math.asin(z) / RAD };
}

export function sunRaDec(jd) {
  const n = jd - 2451545;
  const L = norm(280.46 + 0.9856474 * n);
  const g = norm(357.528 + 0.9856003 * n);
  const lambda = L + 1.915 * sin(g) + 0.02 * sin(2 * g);
  return eclipticToEquatorial(lambda, 0, obliquity(n));
}

export function moonRaDec(jd) {
  const n = jd - 2451545;
  const T = n / 36525;
  const lambda =
    218.32 +
    481267.881 * T +
    6.29 * sin(135.0 + 477198.87 * T) -
    1.27 * sin(259.3 - 413335.36 * T) +
    0.66 * sin(235.7 + 890534.22 * T) +
    0.21 * sin(269.9 + 954397.74 * T) -
    0.19 * sin(357.5 + 35999.05 * T) -
    0.11 * sin(186.5 + 966404.03 * T);
  const beta =
    5.13 * sin(93.3 + 483202.02 * T) +
    0.28 * sin(228.2 + 960400.89 * T) -
    0.28 * sin(318.3 + 6003.15 * T) -
    0.17 * sin(217.6 - 407332.21 * T);
  return eclipticToEquatorial(norm(lambda), beta, obliquity(n));
}

// a, e, I, L, long. perihelion, long. node, each [value at J2000, rate per century]
const ELEMENTS = {
  Mercury: [[0.38709927, 0.00000037], [0.20563593, 0.00001906], [7.00497902, -0.00594749], [252.2503235, 149472.67411175], [77.45779628, 0.16047689], [48.33076593, -0.12534081]],
  Venus: [[0.72333566, 0.0000039], [0.00677672, -0.00004107], [3.39467605, -0.0007889], [181.9790995, 58517.81538729], [131.60246718, 0.00268329], [76.67984255, -0.27769418]],
  Earth: [[1.00000261, 0.00000562], [0.01671123, -0.00004392], [-0.00001531, -0.01294668], [100.46457166, 35999.37244981], [102.93768193, 0.32327364], [0, 0]],
  Mars: [[1.52371034, 0.00001847], [0.0933941, 0.00007882], [1.84969142, -0.00813131], [-4.55343205, 19140.30268499], [-23.94362959, 0.44441088], [49.55953891, -0.29257343]],
  Jupiter: [[5.202887, -0.00011607], [0.04838624, -0.00013253], [1.30439695, -0.00183714], [34.39644051, 3034.74612775], [14.72847983, 0.21252668], [100.47390909, 0.20469106]],
  Saturn: [[9.53667594, -0.0012506], [0.05386179, -0.00050991], [2.48599187, 0.00193609], [49.95424423, 1222.49362201], [92.59887831, -0.41897216], [113.66242448, -0.28867794]],
};

function heliocentric(name, T) {
  const [a, e, I, L, peri, node] = ELEMENTS[name].map(([v, r]) => v + r * T);
  const w = peri - node;
  const M = norm(L - peri);
  let E = M + (e / RAD) * sin(M);
  for (let i = 0; i < 8; i += 1) {
    E -= (E - (e / RAD) * sin(E) - M) / (1 - e * cos(E));
  }
  const xp = a * (cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * sin(E);
  return {
    x: (cos(w) * cos(node) - sin(w) * sin(node) * cos(I)) * xp + (-sin(w) * cos(node) - cos(w) * sin(node) * cos(I)) * yp,
    y: (cos(w) * sin(node) + sin(w) * cos(node) * cos(I)) * xp + (-sin(w) * sin(node) + cos(w) * cos(node) * cos(I)) * yp,
    z: sin(w) * sin(I) * xp + cos(w) * sin(I) * yp,
  };
}

export const PLANETS = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

export function planetRaDec(name, jd) {
  const T = (jd - 2451545) / 36525;
  const p = heliocentric(name, T);
  const earth = heliocentric('Earth', T);
  const x = p.x - earth.x;
  const y = p.y - earth.y;
  const z = p.z - earth.z;
  const eps = 23.43928;
  const ye = y * cos(eps) - z * sin(eps);
  const ze = y * sin(eps) + z * cos(eps);
  return { ra: norm(Math.atan2(ye, x) / RAD), dec: Math.atan2(ze, Math.hypot(x, ye)) / RAD };
}

export function localSiderealTime(jd, lon) {
  return norm(280.46061837 + 360.98564736629 * (jd - 2451545) + lon);
}

// Altitude and azimuth (from north, toward east) in degrees.
export function altAz(ra, dec, lat, lst) {
  const ha = lst - ra;
  const alt = Math.asin(sin(dec) * sin(lat) + cos(dec) * cos(lat) * cos(ha)) / RAD;
  const az = norm(Math.atan2(-cos(dec) * sin(ha), sin(dec) * cos(lat) - cos(dec) * sin(lat) * cos(ha)) / RAD);
  return { alt, az };
}

// Stereographic projection of the sky seen looking up: zenith at the centre,
// the horizon on a circle of radius R, north up and east on the left.
export function project(alt, az, R) {
  const r = Math.min(R * Math.tan(((90 - alt) / 2) * RAD), R * 12);
  return { x: -r * sin(az), y: -r * cos(az) };
}
