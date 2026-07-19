// Original alchemic geometry — concentric rings, polygons, sigils.
// Generic shapes (not a reproduction of any specific array).

function polygonPoints(cx, cy, r, n, rot = -90) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (rot + (360 / n) * i) * (Math.PI / 180);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

function starPath(cx, cy, r, n, skip) {
  // connect every `skip`-th vertex of an n-gon to form a star
  const v = [];
  for (let i = 0; i < n; i++) {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    v.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  let d = '', i = 0;
  for (let c = 0; c <= n; c++) { const [x, y] = v[i % n]; d += (c === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' '; i += skip; }
  return d + 'Z';
}

// The grand hub circle — detailed, slowly rotating.
export function GrandCircle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="200" cy="200" r="196" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="182" strokeWidth="0.8" opacity="0.6" />
      <circle cx="200" cy="200" r="150" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="96" strokeWidth="1" opacity="0.8" />
      <circle cx="200" cy="200" r="66" strokeWidth="0.8" opacity="0.6" />
      <path d={starPath(200, 200, 150, 6, 2)} strokeWidth="1.3" />
      <path d={starPath(200, 200, 96, 6, 2)} strokeWidth="1" opacity="0.85" />
      <polygon points={polygonPoints(200, 200, 150, 3)} strokeWidth="1" opacity="0.5" />
      <polygon points={polygonPoints(200, 200, 150, 3, 90)} strokeWidth="1" opacity="0.5" />
      {/* tick marks */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i * 7.5) * (Math.PI / 180);
        const r1 = 182, r2 = i % 4 === 0 ? 168 : 175;
        return <line key={i} x1={200 + r1 * Math.cos(a)} y1={200 + r1 * Math.sin(a)} x2={200 + r2 * Math.cos(a)} y2={200 + r2 * Math.sin(a)} strokeWidth="0.7" opacity="0.5" />;
      })}
      {/* inner sigils */}
      {polygonPoints(200, 200, 96, 6).split(' ').map((p, i) => {
        const [x, y] = p.split(',').map(Number);
        return <circle key={i} cx={x} cy={y} r="5" strokeWidth="0.9" opacity="0.8" />;
      })}
      <circle cx="200" cy="200" r="30" strokeWidth="1" />
      <path d={starPath(200, 200, 30, 5, 2)} strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

// A compact ring used behind nodes / framing images.
export function RingMark({ className = '', points = 5 }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="60" cy="60" r="56" strokeWidth="1.4" />
      <circle cx="60" cy="60" r="46" strokeWidth="0.7" opacity="0.6" />
      <path d={starPath(60, 60, 46, points, 2)} strokeWidth="1.1" />
      <polygon points={polygonPoints(60, 60, 46, points)} strokeWidth="0.6" opacity="0.45" />
    </svg>
  );
}

// The Flame array (stylised, original).
export function FlameArray({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="60" cy="60" r="56" strokeWidth="1.4" />
      <polygon points={polygonPoints(60, 60, 50, 3)} strokeWidth="1.2" />
      <polygon points={polygonPoints(60, 60, 50, 3, 90)} strokeWidth="1.2" />
      <circle cx="60" cy="60" r="22" strokeWidth="1" />
      <path d="M60 44 q10 8 0 20 q-10 -8 0 -20Z" strokeWidth="1.1" />
    </svg>
  );
}

// The Gate's eye.
export function GateEye({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 60 Q100 -8 194 60 Q100 128 6 60Z" strokeWidth="2" />
      <circle cx="100" cy="60" r="34" strokeWidth="2" />
      <circle cx="100" cy="60" r="14" fill="currentColor" stroke="none" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15) * (Math.PI / 180);
        return <line key={i} x1={100 + 16 * Math.cos(a)} y1={60 + 16 * Math.sin(a)} x2={100 + 33 * Math.cos(a)} y2={60 + 33 * Math.sin(a)} strokeWidth="0.7" opacity="0.7" />;
      })}
    </svg>
  );
}
