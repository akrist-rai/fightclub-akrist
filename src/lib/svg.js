// Original line-art icons + IKEA-style furniture diagrams.
// Returned as markup strings and injected with dangerouslySetInnerHTML so the
// data-driven sections (rules, support, catalog) stay declarative.

const ICONS = {
  lips: '<path d="M10 50 Q50 20 90 50 Q50 80 10 50Z" fill="none" stroke="currentColor" stroke-width="4"/><line x1="50" y1="24" x2="50" y2="76" stroke="currentColor" stroke-width="4"/><line x1="34" y1="30" x2="34" y2="70" stroke="currentColor" stroke-width="3"/><line x1="66" y1="30" x2="66" y2="70" stroke="currentColor" stroke-width="3"/>',
  nolips: '<path d="M10 50 Q50 20 90 50 Q50 80 10 50Z" fill="none" stroke="currentColor" stroke-width="4"/><line x1="14" y1="84" x2="86" y2="16" stroke="currentColor" stroke-width="5"/>',
  stop: '<path d="M30 50 V30 a6 6 0 0 1 12 0 V46 M42 44 V26 a6 6 0 0 1 12 0 V46 M54 46 V30 a6 6 0 0 1 12 0 V52 M66 48 V36 a6 6 0 0 1 12 0 V66 a18 18 0 0 1-18 18 H46 a18 18 0 0 1-16-10 L24 64" fill="none" stroke="currentColor" stroke-width="4"/>',
  two: '<circle cx="34" cy="40" r="12" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="66" cy="40" r="12" fill="none" stroke="currentColor" stroke-width="4"/><path d="M18 84 q16 -24 32 0 M50 84 q16 -24 32 0" fill="none" stroke="currentColor" stroke-width="4"/>',
  one: '<text x="50" y="72" text-anchor="middle" font-family="Anton,Impact" font-size="72" fill="currentColor">1</text>',
  shirt: '<path d="M30 26 L20 40 L30 50 V80 H70 V50 L80 40 L70 26 Q50 40 30 26Z" fill="none" stroke="currentColor" stroke-width="4"/><line x1="16" y1="84" x2="84" y2="16" stroke="currentColor" stroke-width="5"/>',
  clock: '<circle cx="50" cy="52" r="30" fill="none" stroke="currentColor" stroke-width="4"/><path d="M50 36 V52 L64 60" fill="none" stroke="currentColor" stroke-width="4"/><line x1="50" y1="14" x2="50" y2="22" stroke="currentColor" stroke-width="4"/>',
  fist: '<path d="M28 56 V44 a6 6 0 0 1 12 0 M40 44 V36 a6 6 0 0 1 12 0 V46 M52 46 V38 a6 6 0 0 1 12 0 V50 M64 50 V46 a6 6 0 0 1 12 0 V64 a16 16 0 0 1-16 16 H44 a16 16 0 0 1-16-16 V56 Z" fill="none" stroke="currentColor" stroke-width="4"/>',
  lungs: '<path d="M50 20 V52 M50 30 H40 M50 30 H60" stroke="currentColor" stroke-width="4" fill="none"/><path d="M40 34 Q22 44 24 70 Q26 84 40 80 Q46 76 46 60 Q46 44 40 34Z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M60 34 Q78 44 76 70 Q74 84 60 80 Q54 76 54 60 Q54 44 60 34Z" fill="none" stroke="currentColor" stroke-width="4"/>',
  brain: '<path d="M40 30 Q26 30 26 44 Q16 50 22 62 Q20 76 36 78 Q40 86 50 82 V30 Q46 26 40 30Z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M60 30 Q74 30 74 44 Q84 50 78 62 Q80 76 64 78 Q60 86 50 82" fill="none" stroke="currentColor" stroke-width="4"/>',
  blood: '<path d="M50 18 Q72 50 72 66 a22 22 0 0 1-44 0 Q28 50 50 18Z" fill="none" stroke="currentColor" stroke-width="4"/>',
  liver: '<path d="M22 44 Q50 32 80 42 Q82 64 60 76 Q40 82 30 68 Q20 58 22 44Z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M52 40 Q58 56 50 74" fill="none" stroke="currentColor" stroke-width="3"/>',
};

const FURNITURE = {
  duvet: '<rect x="10" y="40" width="100" height="44" rx="6"/><path d="M10 52 h100 M24 40 v44 M44 40 v44 M64 40 v44 M84 40 v44"/><path d="M118 50 l8 -8 m-8 8 l8 8" stroke-width="2"/>',
  table: '<ellipse cx="60" cy="40" rx="44" ry="14"/><circle cx="60" cy="40" r="9"/><path d="M60 31 a9 9 0 0 1 0 18" fill="currentColor" opacity=".25"/><line x1="22" y1="46" x2="22" y2="86"/><line x1="98" y1="46" x2="98" y2="86"/><line x1="60" y1="54" x2="60" y2="90"/>',
  shelf: '<rect x="22" y="16" width="76" height="84"/><line x1="22" y1="44" x2="98" y2="44"/><line x1="22" y1="72" x2="98" y2="72"/><line x1="60" y1="16" x2="60" y2="100"/><rect x="30" y="22" width="10" height="16" opacity=".3" fill="currentColor"/><rect x="68" y="50" width="10" height="16" opacity=".3" fill="currentColor"/>',
  lamp: '<path d="M40 24 H80 L92 56 H28 Z"/><line x1="60" y1="56" x2="60" y2="92"/><path d="M44 92 H76"/><circle cx="60" cy="20" r="4"/>',
  sofa: '<path d="M14 56 v24 h92 v-24"/><path d="M14 56 q0 -16 14 -16 h64 q14 0 14 16"/><path d="M30 56 q0 -8 8 -8 h44 q8 0 8 8"/><line x1="60" y1="48" x2="60" y2="68"/><line x1="20" y1="80" x2="20" y2="92"/><line x1="100" y1="80" x2="100" y2="92"/>',
  khaki: '<path d="M40 18 h40 v18 l8 60 h-22 l-6 -50 -6 50 h-22 l8 -60 Z"/><line x1="40" y1="30" x2="80" y2="30"/><line x1="60" y1="36" x2="60" y2="60"/>',
};

export function icon(name) {
  return `<svg viewBox="0 0 100 100">${ICONS[name] || ''}</svg>`;
}

export function furniture(name) {
  return `<svg viewBox="0 0 130 110" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round">${FURNITURE[name] || ''}</svg>`;
}
