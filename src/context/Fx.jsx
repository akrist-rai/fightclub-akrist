import { createContext, useContext, useCallback, useMemo, useRef, useState } from 'react';
import { SUB_WORDS } from '../data.js';

/*
 * Ambient effects shared across the whole site: subliminal single-frame
 * flashes, the screen-shake "glitch", and the reduced-motion guard.
 *
 * Two contexts on purpose:
 *   ActionsCtx — stable callbacks (never change identity) for any component
 *                that fires effects (HIT ME, declassify, detonator…).
 *   StateCtx   — volatile {subWord, glitching} consumed only by <Ambient/>
 *                and the shake wrapper, so a flash doesn't re-render the page.
 */
const ActionsCtx = createContext(null);
const StateCtx = createContext(null);

export const useFx = () => useContext(ActionsCtx);
export const useFxState = () => useContext(StateCtx);

export function FxProvider({ children }) {
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches,
    []
  );
  const [subWord, setSubWord] = useState(null);
  const [glitching, setGlitching] = useState(false);
  const subTimer = useRef(0);
  const glitchTimer = useRef(0);

  const flash = useCallback((word) => {
    if (reduced) return;
    setSubWord(word);
    clearTimeout(subTimer.current);
    subTimer.current = setTimeout(() => setSubWord(null), 95);
  }, [reduced]);

  const triggerGlitch = useCallback(() => {
    if (reduced) return;
    setGlitching(true);
    clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => setGlitching(false), 520);
  }, [reduced]);

  // Random subliminal loop; returns a stop fn used as an effect cleanup.
  const startSubliminals = useCallback(() => {
    if (reduced) return () => {};
    let alive = true;
    (function loop() {
      if (!alive) return;
      setTimeout(() => {
        if (!alive) return;
        flash(SUB_WORDS[Math.floor(Math.random() * SUB_WORDS.length)]);
        loop();
      }, 8000 + Math.random() * 6000);
    })();
    return () => { alive = false; };
  }, [reduced, flash]);

  const actions = useMemo(
    () => ({ reduced, flash, triggerGlitch, startSubliminals }),
    [reduced, flash, triggerGlitch, startSubliminals]
  );
  const state = useMemo(() => ({ subWord, glitching }), [subWord, glitching]);

  return (
    <ActionsCtx.Provider value={actions}>
      <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    </ActionsCtx.Provider>
  );
}
