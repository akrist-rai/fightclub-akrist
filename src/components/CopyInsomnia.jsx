// "Copy of a copy of a copy" — a degraded CRT portrait beside a cascade of
// text that blurs/skews/desaturates with each generation.
function cascadeLines() {
  const out = [];
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    out.push(
      <div
        key={i}
        style={{
          fontFamily: "'Special Elite',monospace",
          textTransform: 'uppercase',
          color: '#ece7da',
          margin: '7px 0',
          opacity: 1 - t * 0.82,
          filter: `blur(${t * 2.4}px)`,
          fontSize: `clamp(13px, ${2.4 - t * 0.5}vw, ${24 - t * 7}px)`,
          transform: `skewX(${(t * 7).toFixed(2)}deg) translateX(${Math.sin(i) * t * 20}px)`,
          letterSpacing: `${0.26 + t * 0.25}em`,
          textShadow: `${(t * 2).toFixed(1)}px 0 0 rgba(200,35,42,${t * 0.4}), -${(t * 2).toFixed(1)}px 0 0 rgba(124,198,188,${t * 0.4})`,
          animation: `copyflk ${4 + i * 0.5}s steps(1) ${i * 0.2}s infinite`,
        }}
      >
        OF A COPY
      </div>
    );
  }
  return out;
}

export default function CopyInsomnia() {
  return (
    <section className="copy sec" id="copy">
      <span className="eyebrow ash rev" style={{ textAlign: 'center', display: 'block' }}>// VHS generation loss</span>
      <div className="copy-head rev">EVERYTHING IS A COPY OF A COPY OF A COPY</div>
      <div className="copy-grid" style={{ marginTop: 40 }}>
        <div className="crt rev">
          <div className="crt-screen">
            <img src="img/tyler-ascii.jpg" alt="Degraded portrait of Tyler on a CRT screen" loading="lazy" />
            <div className="crt-bulge" />
            <div className="crt-osd"><span className="rec">● REC</span> · CH 03 · SP · TRACKING</div>
          </div>
          <div className="crt-base"><div className="crt-brand">PAPER ST · TV</div><div className="crt-knobs"><i /><i /></div></div>
        </div>
        <div>{cascadeLines()}</div>
      </div>
    </section>
  );
}
