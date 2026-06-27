import { useRef, useState } from 'react';

// The real movie ID card prop on the front; Project Mayhem record on the back.
// Mouse tilts it; click flips it.
export default function IdCard() {
  const stage = useRef(null), card = useRef(null), glare = useRef(null), raf = useRef(0);
  const [flipped, setFlipped] = useState(false);

  const onMove = (e) => {
    if (flipped || window.matchMedia('(hover:none)').matches) return;
    const r = stage.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (!card.current) return;
      card.current.style.transition = 'transform .14s ease-out';
      card.current.style.transform = `rotateX(${(0.5 - py) * 18}deg) rotateY(${(px - 0.5) * 24}deg)`;
      glare.current.style.background = `radial-gradient(380px circle at ${px * 100}% ${py * 100}%,rgba(255,255,255,.4),transparent 60%)`;
    });
  };

  const onLeave = () => {
    if (flipped || !card.current) return;
    card.current.style.transform = 'rotateX(0) rotateY(0)';
    glare.current.style.background = 'transparent';
  };

  const onClick = () => {
    const next = !flipped;
    setFlipped(next);
    if (!card.current) return;
    card.current.style.transition = 'transform .6s ease';
    card.current.style.transform = next ? 'rotateY(180deg)' : 'rotateX(0) rotateY(0)';
  };

  return (
    <section className="identity sec" id="identity">
      <span className="eyebrow rev" style={{ textAlign: 'center' }}>// identity card · the criterion collection · 1999</span>
      <h2 className="disp rev" style={{ fontSize: 'clamp(34px,7vw,80px)', margin: '0 0 8px', lineHeight: '.86', textAlign: 'center' }}>You Are Not Special</h2>
      <p className="rev mono" style={{ color: 'var(--ash)', letterSpacing: '.16em', fontSize: 12, textAlign: 'center', maxWidth: 480, margin: '0 auto 34px' }}>
        Issued to a man who does not exist. DURDEN, TYLER · FC111793036.
      </p>
      <div className="card-stage rev" ref={stage} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
        <div className="card-3d" ref={card}>
          <div className="card-face cf">
            <img src="img/id-card.jpg" alt="Tyler Durden Fight Club ID card" />
            <div className="cf-glare" ref={glare} />
          </div>
          <div className="card-face cb">
            <div className="cb-stripe" />
            <div className="cb-cnt">
              <h4>PROPERTY OF PROJECT MAYHEM</h4>
              <p>This card certifies the bearer surrendered name, history and fear upon induction. The bearer is now a space monkey. The bearer does not exist.</p>
              <p>537 Paper Street · Bradford<br /><em>You met me at a very strange time in my life.</em></p>
              <div className="barcode">
                {Array.from({ length: 46 }, (_, i) => <i key={i} style={{ width: ((i * 37) % 5) + 1 + 'px' }} />)}
              </div>
              <div className="barcode-txt">FC 14793036 · AUTH ████ · THUMB ON FILE</div>
            </div>
            <div className="cb-thumb">
              <svg viewBox="0 0 60 78" width="60" height="78" style={{ position: 'absolute', inset: 0, opacity: 0.28 }}>
                <ellipse cx="30" cy="39" rx="24" ry="22" fill="none" stroke="#0c3b35" strokeWidth=".9" />
                <ellipse cx="30" cy="39" rx="18" ry="17" fill="none" stroke="#0c3b35" strokeWidth=".9" />
                <ellipse cx="30" cy="39" rx="12" ry="12" fill="none" stroke="#0c3b35" strokeWidth=".9" />
                <ellipse cx="30" cy="39" rx="7" ry="7" fill="none" stroke="#0c3b35" strokeWidth=".9" />
                <ellipse cx="30" cy="39" rx="3" ry="3" fill="none" stroke="#0c3b35" strokeWidth=".9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="card-hint">› drag to tilt · click to flip ‹</p>
    </section>
  );
}
