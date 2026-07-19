// Synthesized transmutation sound — Web Audio, no files. Action-triggered only
// (no ambient drone), so it is never intrusive. Muteable.

let ctx = null, master = null, muted = false;

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.9;
  master.connect(ctx.destination);
  return ctx;
}
function noise(dur) {
  const n = Math.floor(ctx.sampleRate * dur);
  const b = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
export function initAudio() { ensure(); if (ctx && ctx.state === 'suspended') ctx.resume(); }
export function setMuted(m) { muted = m; if (master && ctx) master.gain.linearRampToValueAtTime(m ? 0 : 0.9, ctx.currentTime + 0.2); }
export function isMuted() { return muted; }

// Electric transmutation spark — opening a section / completing a transmute.
export function spark() {
  if (!ensure()) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource(); src.buffer = noise(0.32);
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.setValueAtTime(900, t);
  bp.frequency.exponentialRampToValueAtTime(5200, t + 0.18); bp.Q.value = 6;
  const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.32, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  src.connect(bp); bp.connect(g); g.connect(master); src.start(t);
  const o = ctx.createOscillator(); o.type = 'triangle';
  o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(660, t + 0.16);
  const og = ctx.createGain(); og.gain.setValueAtTime(0.0001, t);
  og.gain.exponentialRampToValueAtTime(0.12, t + 0.02); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(og); og.connect(master); o.start(t); o.stop(t + 0.24);
}

// Deep rumble — the Gate, the rebound.
export function rumble() {
  if (!ensure()) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator(); o.type = 'sine';
  o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(28, t + 1.1);
  const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.5, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + 1.35);
  const src = ctx.createBufferSource(); src.buffer = noise(1.2);
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380;
  const ng = ctx.createGain(); ng.gain.setValueAtTime(0.25, t); ng.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
  src.connect(lp); lp.connect(ng); ng.connect(master); src.start(t);
}

// Paper rustle — turning a page of the grimoire.
export function pageTurn() {
  if (!ensure()) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource(); src.buffer = noise(0.35);
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass';
  bp.frequency.setValueAtTime(2600, t); bp.frequency.exponentialRampToValueAtTime(1200, t + 0.3); bp.Q.value = 0.6;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
  src.connect(bp); bp.connect(g); g.connect(master); src.start(t);
}

// Soft tap/chime — UI clicks, chess, card flips.
export function tap() {
  if (!ensure()) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator(); o.type = 'sine';
  o.frequency.setValueAtTime(880, t); o.frequency.exponentialRampToValueAtTime(1320, t + 0.05);
  const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.14, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.16);
}
