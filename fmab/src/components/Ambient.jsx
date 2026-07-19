// The desk by candlelight: a warm glow, drifting dust, paper grain, vignette.
export default function Ambient() {
  return (
    <>
      <div className="candle" />
      <div className="motes" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{
            left: `${(i * 6.3 + 4) % 100}%`,
            animationDelay: `${(i * 1.4) % 13}s`,
            animationDuration: `${15 + (i % 6) * 3}s`,
          }} />
        ))}
      </div>
      <div className="grain" />
      <div className="vig" />
    </>
  );
}
