export default function GunMonologue() {
  return (
    <section className="gun sec">
      <svg className="gun-art rev" viewBox="0 0 560 150" fill="none" aria-hidden="true">
        <g fill="currentColor">
          <path d="M40 60 H300 V92 H120 L108 130 H70 L80 92 H40 Z" />
          <rect x="300" y="64" width="120" height="20" />
          <circle cx="76" cy="74" r="9" fill="#0a0a0b" />
          <rect x="408" y="66" width="14" height="16" fill="#c8232a" />
        </g>
        <path d="M422 74 H556" stroke="#c8232a" strokeWidth="2" strokeDasharray="4 6" />
      </svg>
      <p className="gun-q rev">WITH A GUN BARREL BETWEEN YOUR TEETH,<br />YOU SPEAK ONLY IN <span className="red">VOWELS.</span></p>
      <p className="gun-sub rev">&ldquo;People are always asking me if I know Tyler Durden.&rdquo; — three minutes. This is it. Ground zero.</p>
    </section>
  );
}
