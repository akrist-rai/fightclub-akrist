import { motion } from 'motion/react';

const images = [
  'field-brothers.jpg', 'ed-hawk.jpg', 'hill-wide.png', 'rain-roy-riza.jpg', 'watch-flame.jpg',
  'blood-seal.jpg', 'riza-tattoo.jpg', 'transmute-brothers.jpg', 'mustang-dynamic.jpg', 'chess-king-mustang.jpg',
  'watch-brothers.jpg', 'riza-chibi.jpg', 'ed-cry.jpg', 'snow-brothers.jpg', 'mustang-flame2.jpg',
  'team-snow.jpg', 'poster-amestris.jpg', 'ed-day30.jpg', 'ed-wake.jpg', 'chess-queen-riza.jpg',
  'chess-rook-breda.jpg', 'automail-name.jpg', 'roy-riza-shoot.jpg', 'al-child.jpg', 'ed-gun-truth.jpg',
  'tavern.jpg', 'ed-deconstruct.jpg', 'chess-bishop-falman.jpg', 'grass-restored.jpg', 'riza-rest.jpg',
  'feast.jpg', 'ed-spear.jpg', 'house-burn.jpg', 'ed-pop.jpg', 'royai-day.jpg', 'rain-manga.jpg',
  'team-downtime.jpg', 'poster-osaka.jpg', 'it-hurts.jpg', 'flame-snap.jpg', 'ouroboros-name.jpg',
  'sacrifice-collage.png', 'chess-pawn-fuery.jpg', 'chess-knight-havoc.jpg',
];

const chapters = [
  { id: '#/', no: '01', name: 'The Promise', title: 'A brother is a reason to return.', text: 'Edward and Alphonse begin with a mistake, but their story is not about the mistake. It is about refusing to leave each other behind after it.', hero: 'field-brothers.jpg', color: 'gold', dialogue: [['ALPHONSE', '“Brother, I’m here.”'], ['EDWARD', 'Then we find our way home. Together.']], quote: '“Stand up and walk. Keep moving forward.”', quoteBy: 'EDWARD ELRIC · A PROMISE MADE ACTIVE' },
  { id: '#/gate', no: '02', name: 'The Truth', title: 'The lesson hurts because it matters.', text: 'The Gate does not reward ambition. It reflects it. Every loss forces the brothers to ask what a human life, a body, and a promise are truly worth.', hero: 'ed-gun-truth.jpg', color: 'bone', dialogue: [['THE TRUTH', 'The price is understanding.'], ['EDWARD', 'Then I’ll carry the pain and keep moving.']], quote: '“A lesson without pain is meaningless.”', quoteBy: 'EDWARD ELRIC · WHAT THE GATE TAUGHT' },
  { id: '#/court', no: '03', name: 'The Flame', title: 'Grief can become a weapon—or a way forward.', text: 'Roy Mustang and Riza Hawkeye carry the weight of Ishval differently: with discipline, memory, and a refusal to let power erase their conscience.', hero: 'mustang-dynamic.jpg', color: 'red', dialogue: [['RIZA', 'I’ll watch your back.'], ['MUSTANG', 'And I’ll make sure the future is worth it.']] },
  { id: '#/journey', no: '04', name: 'The People', title: 'Home is who still waits for you.', text: 'Winry, the Rockbells, the Briggs soldiers, and the friends met along the way make the brothers’ journey larger than one family’s loss.', hero: 'snow-brothers.jpg', color: 'blue', dialogue: [['WINRY', 'Come back in one piece.'], ['ALPHONSE', 'We have people waiting for us.']] },
  { id: '#/alchemy', no: '05', name: 'The Choice', title: 'The world is imperfect. So choose kindness.', text: 'The end of the journey is not a victory over Truth. It is the choice to value ordinary hands, ordinary bonds, and a future that belongs to everyone.', hero: 'grass-restored.jpg', color: 'gold', dialogue: [['EDWARD', 'Not unbreakable—just brave enough to care.'], ['THE RECORD', 'That is what makes a future worth choosing.']], quote: '“A heart made fullmetal.”', quoteBy: 'EDWARD ELRIC · THE LAST WORD' },
];

const frameNotes = {
  'field-brothers.jpg': ['THE STARTING LINE', 'Two silhouettes, one shared direction. Their first promise is simply not to stop.'],
  'ed-hawk.jpg': ['A NAME TO LIVE UP TO', 'The red coat is not a costume; it is a vow to use power for someone else.'],
  'hill-wide.png': ['RESEMBOOL', 'A small town becomes the fixed point every long journey needs.'],
  'rain-roy-riza.jpg': ['WHEN THE RAIN COMES', 'Riza sees the person behind the Flame Alchemist title.'],
  'watch-flame.jpg': ['A MATCH, A MEMORY', 'Mustang’s flame is always tied to what it must never become again.'],
  'blood-seal.jpg': ['THE SOUL IN THE ARMOR', 'A blood seal turns a suit of armor into Alphonse—and makes every scratch matter.'],
  'riza-tattoo.jpg': ['A BURDEN CHOSEN', 'Hawkeye carries her father’s research so it cannot be used carelessly.'],
  'transmute-brothers.jpg': ['THE CIRCLE', 'Alchemy begins with understanding. The brothers learn that understanding alone is not wisdom.'],
  'mustang-dynamic.jpg': ['THE FLAME ALCHEMIST', 'Precision, rage, and restraint in the same snap of a glove.'],
  'chess-king-mustang.jpg': ['NOT A GAME', 'The military hierarchy turns people into pieces; Mustang refuses to forget their names.'],
  'watch-brothers.jpg': ['KEEP WATCH', 'There is no gap wide enough for the brothers to lose sight of one another.'],
  'riza-chibi.jpg': ['THE QUIET MOMENT', 'Even soldiers need a second where the world does not ask anything of them.'],
  'ed-cry.jpg': ['NO EASY ANSWERS', 'Edward’s anger is grief looking for somewhere to go.'],
  'snow-brothers.jpg': ['NORTHBOUND', 'The cold of Briggs tests resolve without caring who you are.'],
  'mustang-flame2.jpg': ['DO NOT LOOK AWAY', 'Power becomes frightening when compassion is no longer holding it back.'],
  'team-snow.jpg': ['BORROWED FAMILY', 'The journey expands because every ally decides the brothers are worth helping.'],
  'poster-amestris.jpg': ['THE COUNTRY UNDERNEATH', 'Amestris is beautiful from far away—and built on a terrible secret.'],
  'ed-day30.jpg': ['KEEP THE DATE', 'Some memories are kept not to suffer, but to make sure the past changes us.'],
  'ed-wake.jpg': ['WAKE UP', 'Every setback asks the same question: will you stand again?'],
  'chess-queen-riza.jpg': ['THE EYE OF THE HAWK', 'Riza’s resolve is sharp enough to keep a king honest.'],
  'chess-rook-breda.jpg': ['THE PEOPLE BESIDE YOU', 'No one reaches the future alone—not even a State Alchemist.'],
  'automail-name.jpg': ['MADE TO MOVE', 'Automail is both consequence and possibility: proof that a body can adapt.'],
  'roy-riza-shoot.jpg': ['COVERING FIRE', 'Trust is made visible in the instant someone knows you will not miss.'],
  'al-child.jpg': ['THE BOY INSIDE', 'Al’s gentleness survives even when the world leaves him without a body.'],
  'ed-gun-truth.jpg': ['FACE THE GATE', 'Truth offers no comfort. It only asks whether you understand the price.'],
  'tavern.jpg': ['A TABLE, NOT A BATTLEFIELD', 'The ordinary warmth of a meal is one of the things worth fighting for.'],
  'ed-deconstruct.jpg': ['BREAK IT DOWN', 'Alchemy teaches Edward to see the parts. Love teaches him to see the whole.'],
  'chess-bishop-falman.jpg': ['THE RECORD KEEPER', 'Facts can be weapons when someone has the courage to remember them.'],
  'grass-restored.jpg': ['AFTER THE FIRE', 'Healing is not returning to what was. It is making room for what can grow.'],
  'riza-rest.jpg': ['REST IS NOT SURRENDER', 'A moment of stillness can be an act of trust.'],
  'feast.jpg': ['THE REWARD', 'Joy is not a distraction from the mission; it is why the mission matters.'],
  'ed-spear.jpg': ['SMALL, NOT WEAK', 'Edward never stops challenging the labels placed on him.'],
  'house-burn.jpg': ['NO WAY BACK', 'The burned house is not abandonment—it is a decision to build a different future.'],
  'ed-pop.jpg': ['STILL HUMAN', 'For all his talent, Edward is stubborn, loud, and allowed to be young.'],
  'royai-day.jpg': ['TOMORROW’S WORK', 'A better country begins with people who refuse to accept the old one.'],
  'rain-manga.jpg': ['RAIN DOES NOT LAST', 'Even a bleak page eventually has to turn.'],
  'team-downtime.jpg': ['BETWEEN THE FIGHTS', 'Friendship lives in the unspectacular hours.'],
  'poster-osaka.jpg': ['A WORLD WORTH SEEING', 'Every city and stranger enlarges the brothers’ idea of home.'],
  'it-hurts.jpg': ['LET IT HURT', 'Pain acknowledged becomes something other than a prison.'],
  'flame-snap.jpg': ['THE RESPONSIBILITY OF FIRE', 'Strength is measured by what a person chooses not to destroy.'],
  'ouroboros-name.jpg': ['THE CIRCLE BREAKS', 'A perfect system that feeds on people deserves to end.'],
  'sacrifice-collage.png': ['EVERYONE PAYS', 'The finale gathers every private debt into one collective choice.'],
  'chess-pawn-fuery.jpg': ['NO ONE IS A PAWN', 'The smallest role still changes the board.'],
  'chess-knight-havoc.jpg': ['STAY IN THE FIGHT', 'Havoc’s courage is not erased by the cost he pays.'],
};

const mangaMoments = [
  { tag: 'ALPHONSE ELRIC', line: '“The world isn’t perfect.”', title: 'That is why it is worth trying to change.', text: 'Al sees cruelty clearly, but refuses to let it decide who he becomes. His kindness is not innocence; it is a deliberate answer to a broken world.', image: 'al-child.jpg', tone: 'warm' },
  { tag: 'ROY MUSTANG', line: 'WHEN GRIEF LOOKS LIKE RAIN', title: 'Some losses deserve to be carried, not buried.', text: 'Mustang’s ambition is hollow unless it protects people. Riza keeps that truth in front of him when anger threatens to become the only thing left.', image: 'rain-roy-riza.jpg', tone: 'rain' },
  { tag: 'WINRY ROCKBELL', line: 'THE HANDS THAT REPAIR', title: 'Love can be practical.', text: 'Winry does not fight with alchemy. She builds, fixes, scolds, and waits. Her care gives the Elrics a place to return to and a reason to be whole.', image: 'automail-name.jpg', tone: 'blue' },
  { tag: 'SCAR & ISHVAL', line: 'REMEMBER THE NAMES', title: 'Revenge ends where responsibility begins.', text: 'A country cannot heal by forgetting what it did. The road forward demands memory, accountability, and the courage to refuse another cycle of violence.', image: 'sacrifice-collage.png', tone: 'ash' },
];

function InkMark() { return <svg className="archive-circle" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="87"/><circle cx="100" cy="100" r="61"/><path d="M100 18 129 70h-58L100 18Zm0 164-29-52h58l-29 52ZM18 100l52-29v58L18 100Zm164 0-52 29V71l52 29Z"/><path d="M100 42v116M42 100h116M59 59l82 82M141 59l-82 82"/></svg>; }

export default function MangaArchive({ currentPage }) {
  const chapter = chapters.find((item) => item.id === currentPage) || chapters[0];
  const start = chapters.indexOf(chapter) * 8;
  const chapterImages = [...images.slice(start, start + 12), ...images.slice(0, 12)].slice(0, 12);

  return <div className="archive-shell">
    <header className="archive-nav">
      <a className="archive-brand" href="#/"><InkMark /><span>FULLMETAL<br /><b>ARCHIVES</b></span></a>
      <div className="archive-nav-links">{chapters.map(item => <a key={item.id} className={item.id === chapter.id ? 'on' : ''} href={item.id}><small>{item.no}</small>{item.name}</a>)}</div>
      <span className="archive-volume">VOLUME / 01</span>
    </header>
    <div className="archive-ticker"><div><span>FULLMETAL ALCHEMIST</span><b>✦</b><span>EQUIVALENT EXCHANGE</span><b>✦</b><span>THE ELRIC RECORD</span><b>✦</b><span>DO NOT FORGET 3.OCT.11</span><b>✦</b><span>FULLMETAL ALCHEMIST</span><b>✦</b><span>EQUIVALENT EXCHANGE</span></div></div>

    <main>
      <section className={`chapter-hero ${chapter.color}`} key={chapter.id}>
        <div className="hero-photo" style={{ backgroundImage: `url(/img/${chapter.hero})` }} />
        <div className="hero-copy">
          <span className="chapter-number">CHAPTER {chapter.no} / {chapter.name}</span>
          <h1>{chapter.title}</h1>
          <p>{chapter.text}</p>
          <div className="hero-dialogue">{chapter.dialogue.map(([speaker, line]) => <p key={speaker}><b>{speaker}</b><span>{line}</span></p>)}</div>
          <a href="#archive" className="read-trigger">OPEN FIELD NOTES <i>↓</i></a>
        </div>
        <div className="hero-fragments" aria-hidden="true">
          {images.slice(start + 1, start + 4).map((image, i) => <img key={image} className={`fragment-${i + 1}`} src={`/img/${image}`} alt="" />)}
        </div>
        <div className="hero-side-type">FULLMETAL ALCHEMIST · BROTHERHOOD</div>
        <InkMark />
      </section>

      <section id="archive" className="archive-intro">
        <div className="intro-number">{chapter.no}</div>
        <div><span className="eyebrow">CENTRAL LIBRARY · RESTRICTED COLLECTION</span><h2>Fragments from a world<br /><em>built on exchange.</em></h2></div>
        <p>An image-led record of kinship, war, loss, and impossible choices. Turn the page. The ink is still wet.</p>
      </section>

      <section className="image-storyboard">
        {chapterImages.map((image, index) => <motion.figure key={image} className={`story-frame frame-${index + 1}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: (index % 5) * .05 }}>
          <img src={`/img/${image}`} alt={frameNotes[image][0]} loading="lazy" />
          <figcaption><span>FIG. {String(index + 1).padStart(2, '0')}</span><b>{frameNotes[image][0]}</b><em>{frameNotes[image][1]}</em></figcaption>
        </motion.figure>)}
        <aside className="story-quote"><i>“</i><strong>{chapter.quote || 'The future is built by the people who refuse to give up on it.'}</strong><span>{chapter.quoteBy || 'THE PEOPLE OF AMESTRIS · A FUTURE CHOSEN'}</span><i>”</i></aside>
      </section>

      <section className="manga-moments">
        <div className="moments-title"><span className="eyebrow">LINES THAT SHAPE THE STORY</span><h2>Not just words.<br /><em>Ways to live.</em></h2></div>
        <div className="moments-list">{mangaMoments.map((moment, index) => <article key={moment.tag} className={`moment-card ${moment.tone}`}>
          <div className="moment-image"><img src={`/img/${moment.image}`} alt={moment.tag} loading="lazy" /><span>0{index + 1}</span></div>
          <div className="moment-copy"><small>{moment.tag}</small><div className="moment-line">{moment.line}</div><h3>{moment.title}</h3><p>{moment.text}</p></div>
        </article>)}</div>
      </section>

      <section className="chapter-index">
        <div className="index-intro"><span className="eyebrow">CONTINUE READING</span><h2>The volume<br />is not over.</h2></div>
        <div className="chapter-cards">{chapters.map(item => <a href={item.id} key={item.id} className={`chapter-card ${item.color}`}><img src={`/img/${item.hero}`} alt="" loading="lazy"/><span>{item.no}</span><h3>{item.name}</h3><i>READ CHAPTER →</i></a>)}</div>
      </section>

      <section className="truth-break">
        <div className="truth-words"><span>TO OBTAIN</span><strong>SOMETHING</strong><span>OF EQUAL VALUE</span><strong>MUST BE LOST.</strong></div>
        <InkMark />
        <div className="truth-note">LAW 01<br />EQUIVALENT<br />EXCHANGE</div>
      </section>

      <section className="memory-vault">
        <div className="vault-heading"><span className="eyebrow">THE COMPLETE FIELD REEL</span><h2>Every frame<br /><em>has a cost.</em></h2><p>44 recovered stills from the Central archive. Handle with care.</p></div>
        <div className="vault-grid">{images.map((image, index) => <figure key={image}><img src={`/img/${image}`} alt={frameNotes[image][0]} loading="lazy" /><figcaption><b>{String(index + 1).padStart(3, '0')} / {frameNotes[image][0]}</b><span>{frameNotes[image][1]}</span></figcaption></figure>)}</div>
      </section>
    </main>
  </div>;
}
