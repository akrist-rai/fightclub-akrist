// ===================== THE GATE OF TRUTH // data =====================
// Original copy + short iconic tribute lines. An unofficial fan tribute.

// Chapters of the grimoire. accent = illumination ink; plate = frontispiece art.
export const NODES = [
  { id: 'exchange',  num: 'I',    glyph: '⚖',  title: 'Equivalent Exchange', sub: 'The First Law',           accent: 'gold',    plate: 'img/blood-seal.jpg' },
  { id: 'taboo',     num: 'II',   glyph: '⛔', title: 'Human Transmutation',  sub: 'The Taboo',               accent: 'blood',   plate: 'img/ed-wake.jpg' },
  { id: 'gate',      num: 'III',  glyph: '👁', title: 'The Gate of Truth',    sub: 'The Toll',                accent: 'violet',  plate: 'img/ed-gun-truth.jpg' },
  { id: 'brothers',  num: 'IV',   glyph: '⚭',  title: 'The Elric Brothers',   sub: 'The Promise',             accent: 'verdant', plate: 'img/snow-brothers.jpg' },
  { id: 'bonds',     num: 'V',    glyph: '⛓',  title: 'Bonds',                sub: 'Loyalty & Found Family',  accent: 'rose',    plate: 'img/royai-day.jpg' },
  { id: 'court',     num: 'VI',   glyph: '♚',  title: "The Flame's Court",    sub: 'The Pieces',              accent: 'ember',   plate: 'img/chess-king-mustang.jpg' },
  { id: 'cost',      num: 'VII',  glyph: '🜂',  title: 'The Cost',             sub: 'Sacrifice',               accent: 'cold',    plate: 'img/rain-roy-riza.jpg' },
  { id: 'journey',   num: 'VIII', glyph: '🧭', title: 'The Journey',          sub: 'Amestris',                accent: 'azure',   plate: 'img/poster-amestris.jpg' },
  { id: 'alchemy',   num: 'IX',   glyph: '✦',  title: 'Alchemy',              sub: 'Deconstruct · Reconstruct', accent: 'teal',  plate: 'img/ed-spear.jpg' },
  { id: 'lessons',   num: 'X',    glyph: '❦',  title: 'Lessons',              sub: 'What It Taught Us',       accent: 'gold',    plate: 'img/sacrifice-collage.png' },
];

// Equivalent Exchange — choose a desire, learn the price.
export const EXCHANGES = [
  { want: 'Bring back the dead', cost: 'A leg. An arm. And the proof that some things cannot be bought back.', verdict: 'DENIED' },
  { want: 'A perfect body', cost: 'Your own — bound to cold steel, unable to sleep, taste, or feel a hand on your shoulder.', verdict: 'PAID IN FULL' },
  { want: 'Power without limit', cost: 'Souls. Thousands of them, ground into a single red stone.', verdict: 'FORBIDDEN' },
  { want: 'To protect everyone', cost: 'Your hands, your conscience, and rain you must pretend not to cry in.', verdict: 'ACCEPTED' },
  { want: 'To never be hurt again', cost: 'Everything worth feeling. A lesson without pain is meaningless.', verdict: 'REFUSED' },
];

// Human Transmutation — the rebound.
export const TABOO = {
  warn: 'The one taboo of alchemy. To bring a human soul back from death.',
  attemptLabel: 'COMPLETE THE CIRCLE',
  rebound: [
    'The reaction inverts. The circle turns red.',
    'A door you never meant to open swings wide.',
    'Truth reaches through — and collects.',
  ],
  toll: 'You asked for your mother. You were given a lesson, and a debt: a limb taken, a brother bound to a suit of armor with nothing but a soul and a chalk seal.',
  moral: 'Equivalent Exchange is a beautiful law. It is also a lie people tell themselves to feel better. Some things have no equal.',
};

// The Gate — Truth's tolls.
export const GATE = {
  greeting: ['I am called by many names.', 'The World. The Universe. God. Truth. All. One.', 'And I am also… you.'],
  prompt: 'To be shown everything, something of equal value must be surrendered. Choose your toll.',
  tolls: [
    { give: 'My right arm', gain: 'Knowledge that will not fit inside a single mind.' },
    { give: 'My ability to perform alchemy', gain: 'The thing I was searching for all along — already in my hands.' },
    { give: 'Nothing — I refuse', gain: 'Then the door stays shut. Sometimes that is the wisest exchange of all.' },
  ],
};

// The Flame's Court — Mustang's team as chess pieces.
export const COURT = [
  { id: 'king',   piece: 'THE KING',   name: 'Roy Mustang',   img: 'img/chess-king-mustang.jpg', file: 4,
    role: 'The Flame Alchemist. Burns a path to the top so the ones beneath him never have to.',
    line: 'A king without his subjects is no king at all.' },
  { id: 'queen',  piece: 'THE QUEEN',  name: 'Riza Hawkeye',  img: 'img/chess-queen-riza.jpg', file: 3,
    role: "His aim, his conscience, and the gun at his back. She carries his secret burned into her own skin.",
    line: "I'll follow you into hell — and shoot you myself if you stray from the path." },
  { id: 'knight', piece: 'THE KNIGHT', name: 'Jean Havoc',    img: 'img/chess-knight-havoc.jpg', file: 2,
    role: 'Loyal past the point of usefulness. Gives his legs and keeps his grin.',
    line: "I'm not done. Not by a long shot." },
  { id: 'bishop', piece: 'THE BISHOP', name: 'Vato Falman',   img: 'img/chess-bishop-falman.jpg', file: 5,
    role: 'The memory of the unit. Forgets nothing, records everything.',
    line: 'Every detail matters when lives hang on it.' },
  { id: 'rook',   piece: 'THE ROOK',   name: 'Heymans Breda', img: 'img/chess-rook-breda.jpg', file: 6,
    role: 'The strategist. Reads the board ten moves before it is played.',
    line: 'Fear is just data. Use it.' },
  { id: 'pawn',   piece: 'THE PAWN',   name: 'Kain Fuery',    img: 'img/chess-pawn-fuery.jpg', file: 1,
    role: 'The smallest piece — and the one that crosses the whole board to change everything.',
    line: "I'll do whatever I can. However small." },
];

// The Cost — sacrifice beats.
export const COST = [
  { img: 'img/house-burn.jpg', kicker: '3 · OCT · 11',
    head: 'They Burned Their Own House Down',
    body: 'So there would be nothing to crawl back to. The only way left was forward.' },
  { img: 'img/rain-roy-riza.jpg', kicker: 'A SOLDIER’S GRIEF',
    head: 'It’s Raining',
    body: 'When the strong are forbidden their tears, they call the sky down to cry for them.' },
  { img: 'img/riza-tattoo.jpg', kicker: 'THE SECRET ON HER BACK',
    head: 'Burn It Away',
    body: 'She let the most dangerous knowledge in the country be scorched from her own skin — so no one could ever use it for war again.' },
];

// The Elric Brothers — journey beats.
export const BROTHERS = [
  { img: 'img/snow-brothers.jpg', head: 'Two Sets Of Footprints',
    body: 'One small and warm. One vast and cold and hollow — and yet the gentler of the two.' },
  { img: 'img/al-child.jpg', head: 'The Softest Armor',
    body: 'A boy with no body who never lost his kindness. Steel on the outside, the most human heart within.' },
  { img: 'img/watch-brothers.jpg', head: 'The Promise',
    body: 'Get your body back. Get mine back. We do it together, or not at all.' },
  { img: 'img/grass-restored.jpg', head: 'The Dream On The Other Side',
    body: 'An ordinary afternoon. Grass, books, a dog, and two whole brothers. Everything they bled for.' },
];

// The Journey — a country to cross.
export const JOURNEY = {
  posters: [
    { img: 'img/poster-amestris.jpg', cap: 'AMESTRIS CENTRAL · 1914' },
    { img: 'img/poster-osaka.jpg', cap: 'THE LONG WAY HOME' },
  ],
  cities: [
    { name: 'Resembool', tag: 'WHERE IT BEGAN', note: 'Quiet farm country in the east. A home, a burned house, and the only road that mattered — the one leading out.' },
    { name: 'Central City', tag: 'THE CAPITAL', note: 'Marble halls and military command, with something far older buried beneath the streets.' },
    { name: 'Liore', tag: 'THE FALSE MIRACLE', note: 'A desert town that learned, the hard way, what happens when faith is sold by a fraud.' },
    { name: 'Briggs', tag: 'THE NORTHERN WALL', note: 'Survive the cold, or it survives you. The strong live; the weak are buried in the snow.' },
    { name: 'Ishval', tag: 'THE OPEN WOUND', note: 'A region the state turned to ash. The sin every soldier who served there carries home.' },
    { name: 'Xing', tag: 'BEYOND THE DESERT', note: 'A distant empire with a sister art — a different road to the very same truth.' },
  ],
};

// Bonds — loyalty & found family.
export const BONDS = [
  { img: 'img/roy-riza-shoot.jpg', head: 'Don’t Go Where I Can’t Follow', body: 'A pact between two soldiers: guard each other’s humanity — by force, if it ever comes to that.' },
  { img: 'img/royai-day.jpg', head: 'At His Back', body: 'He walks ahead; she watches the road behind. Neither would last a week without the other.' },
  { img: 'img/tavern.jpg', head: 'Found Family', body: 'Not bound by blood, but by every fight survived together. The family you choose for yourself.' },
  { img: 'img/riza-chibi.jpg', head: 'Who Hurt You?', body: 'Cross one of them and you answer to all of them — usually before you can finish the sentence.' },
];

// Alchemy steps.
export const ALCHEMY_STEPS = [
  { k: '01', t: 'COMPREHENSION', d: 'Understand the structure of what stands before you — what it is made of, and how.' },
  { k: '02', t: 'DECONSTRUCTION', d: 'Break it down into its base elements. Release the form it has been holding.' },
  { k: '03', t: 'RECONSTRUCTION', d: 'Rebuild it into the shape you intend — taking nothing, adding nothing.' },
];

// Lessons — short iconic tribute lines + the meaning we draw from them.
export const LESSONS = [
  { line: 'A lesson without pain is meaningless.', meaning: 'Nothing worth having comes without a cost you actually feel.' },
  { line: 'Stand up and walk. Keep moving forward.', meaning: 'You have two good legs — figurative or otherwise. Use them.' },
  { line: 'There is no such thing as a painless lesson.', meaning: 'Growth is the scar tissue of failure.' },
  { line: 'A king must protect his people.', meaning: 'Power only means anything pointed outward, in service of someone else.' },
  { line: 'Be afraid — then do it anyway.', meaning: 'Courage is not the absence of fear. It is acting with it.' },
  { line: 'The world is not perfect. That is exactly why it is beautiful.', meaning: 'The flaws are the point. Perfection has nothing left to strive for.' },
];

export const BOOT_LINES = [
  'Alchemy — the science of understanding, deconstructing, and reconstructing matter.',
  'It is bound by a single, absolute law.',
  'The Law of Equivalent Exchange:',
  'To obtain, something of equal value must be lost.',
];
