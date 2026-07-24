import { SUB_WORDS } from '../data.js';

/*
 * Ambient effects shared across the whole site: subliminal single-frame
 * flashes, the screen-shake "glitch", and the reduced-motion guard.
 *
 * Svelte 5 version: a plain reactive object using $state runes inside a
 * .svelte.js module. App.svelte calls setContext('fx', createFx()) once;
 * every child calls getContext('fx') to access the same instance.
 */

export function createFx() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  let subWord = $state(null);
  let glitching = $state(false);

  let subTimer = 0;
  let glitchTimer = 0;

  function flash(word) {
    if (reduced) return;
    subWord = word;
    clearTimeout(subTimer);
    subTimer = setTimeout(() => { subWord = null; }, 95);
  }

  function triggerGlitch() {
    if (reduced) return;
    glitching = true;
    clearTimeout(glitchTimer);
    glitchTimer = setTimeout(() => { glitching = false; }, 520);
  }

  // Random subliminal loop; returns a stop fn used as an effect cleanup.
  function startSubliminals() {
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
  }

  return {
    get subWord() { return subWord; },
    get glitching() { return glitching; },
    get reduced() { return reduced; },
    flash,
    triggerGlitch,
    startSubliminals,
  };
}
