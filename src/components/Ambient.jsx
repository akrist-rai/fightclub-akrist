import { useEffect, useState } from 'react';
import { useFxState } from '../context/Fx.jsx';

// Fixed full-viewport overlays: film grain, scanlines, vignette, scroll fuse,
// the subliminal flash + the crack that appears during a glitch. Kept OUTSIDE
// the shake wrapper so position:fixed stays anchored to the viewport.
export default function Ambient() {
  const { subWord, glitching } = useFxState();
  const [fuse, setFuse] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setFuse(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="grain" />
      <div className="vig" />

      <div className="fuse"><div className="fuse-fill" style={{ width: fuse + '%' }}><div className="fuse-spark" /></div></div>
      <div className="fuse-cap">ENDING ONE MINUTE AT A TIME</div>

      <div className={'sub' + (subWord ? ' show' : '')}><div className="sub-word">{subWord}</div></div>

      {glitching && (
        <svg className="crack" viewBox="0 0 1000 700" preserveAspectRatio="none">
          <g stroke="rgba(236,231,218,.7)" strokeWidth="1.4" fill="none">
            <path d="M500 0 L520 180 L470 300 L560 420 L500 700" />
            <path d="M520 180 L720 140 M520 180 L300 230 M470 300 L240 360 M560 420 L800 470 M470 300 L640 360" />
            <path d="M520 180 L640 60 M300 230 L120 180 M800 470 L940 540" />
          </g>
        </svg>
      )}
    </>
  );
}
