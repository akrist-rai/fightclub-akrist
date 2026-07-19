import { useState } from 'react';
import { JOURNEY } from '../data.js';
import SectionFrame from './SectionFrame.jsx';
import { tap } from '../lib/sfx.js';

const PINS = [
  { x: 30, y: 70 }, { x: 50, y: 50 }, { x: 70, y: 38 },
  { x: 78, y: 64 }, { x: 46, y: 18 }, { x: 90, y: 30 },
];

const CITY_IMAGES = [
  { img: 'img/house-burn.jpg', label: 'LOC RECON: THE ELRIC RUINS [RESEMBOOL]' },
  { img: 'img/feast.jpg', label: 'LOC RECON: CENTRAL HEADQUARTERS' },
  { img: 'img/mustang-dynamic.jpg', label: 'LOC RECON: EAST CITY OUTPOST' },
  { img: 'img/automail-name.jpg', label: 'LOC RECON: ATELIER WORKSHOP [RUSH VALLEY]' },
  { img: 'img/team-snow.jpg', label: 'LOC RECON: FORTRESS WALL [BRIGGS]' },
  { img: 'img/watch-brothers.jpg', label: 'LOC RECON: THE DEPT INVESTIGATION [LIORE]' }
];

export default function Journey({ onClose }) {
  const [sel, setSel] = useState(0);
  const c = JOURNEY.cities[sel];
  const pick = (i) => { setSel(i); tap(); };

  return (
    <SectionFrame title="The Journey" sub="A NATION CALLED AMESTRIS" glyph="🧭" accent="azure" onClose={onClose}>
      <p className="lede">Two boys with one suitcase and a borrowed pocket watch, riding the rails from one end of the country to the other, chasing a way to put themselves back together.</p>

      <div className="journey-split-grid">
        <div className="map-control-panel">
          <div className="map-wrap">
            <svg className="map" viewBox="0 0 100 90" fill="none" aria-hidden="true">
              <path d="M8 50 Q4 24 26 16 Q44 6 60 14 Q86 8 94 28 Q98 50 84 64 Q70 84 44 80 Q16 80 8 50Z"
                stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
              {PINS.map((p, i) => (
                <line key={'l' + i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="currentColor" strokeWidth="0.25" opacity="0.3" strokeDasharray="1 1.4" />
              ))}
              {PINS.map((p, i) => (
                <g key={i} className={'pin' + (sel === i ? ' on' : '')} onClick={() => pick(i)} style={{ cursor: 'pointer' }}>
                  <circle cx={p.x} cy={p.y} r="3.2" className="pin-hit" fill="transparent" />
                  <circle cx={p.x} cy={p.y} r="1.5" className="pin-dot" />
                  <circle cx={p.x} cy={p.y} r="3" className="pin-ring" fill="none" strokeWidth="0.4" />
                </g>
              ))}
            </svg>
            <div className="map-cities">
              {JOURNEY.cities.map((city, i) => (
                <button key={i} className={'city-chip' + (sel === i ? ' on' : '')} onClick={() => pick(i)}>{city.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="dossier-visuals journey-details-visuals">
          <aside className="journey-detail" key={sel}>
            <div className="jd-tag">{c.tag}</div>
            <h3 className="jd-name">{c.name}</h3>
            <p className="jd-note">{c.note}</p>
          </aside>

          {CITY_IMAGES[sel] && (
            <div className="beat-fig secondary-offset">
              <img src={CITY_IMAGES[sel].img} alt={CITY_IMAGES[sel].label} loading="lazy" />
              <span className="visual-caption">{CITY_IMAGES[sel].label}</span>
            </div>
          )}
        </div>
      </div>

      <div className="journey-posters">
        {JOURNEY.posters.map((p, i) => (
          <figure className="poster-plate" key={i}>
            <img src={p.img} alt={p.cap} loading="lazy" />
            <figcaption>{p.cap}</figcaption>
          </figure>
        ))}
      </div>
    </SectionFrame>
  );
}
