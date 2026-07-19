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

    </>
  );
}
