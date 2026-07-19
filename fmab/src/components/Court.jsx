import { useState } from 'react';
import { COURT } from '../data.js';
import SectionFrame from './SectionFrame.jsx';

const GLYPH = { king: '♚', queen: '♛', knight: '♞', bishop: '♝', rook: '♜', pawn: '♟' };

// Mustang calls his people his chess pieces. Click one to read the piece.
export default function Court({ onClose }) {
  const [sel, setSel] = useState(COURT[0]);

  return (
    <SectionFrame title="The Flame's Court" sub="HE PLAYS TO WIN — TOGETHER" glyph="♚" accent="ember" onClose={onClose}>
      <p className="lede">A commander once said he could not do it alone — that he needed his pieces on the board. Not as tools, but as the only reason the game is worth winning. Move a piece.</p>

      <div className="court-wrap">
        <div className="chessboard" role="group" aria-label="chess pieces">
          {Array.from({ length: 64 }).map((_, i) => {
            const rank = Math.floor(i / 8), fileIdx = i % 8;
            const dark = (rank + fileIdx) % 2 === 1;
            const piece = rank === 7 ? COURT.find((c) => c.file === fileIdx) : null;
            return (
              <div key={i} className={'sq' + (dark ? ' dark' : '')}>
                {piece && (
                  <button
                    className={'piece' + (sel.id === piece.id ? ' sel' : '')}
                    onClick={() => setSel(piece)}
                    title={piece.name}
                  >
                    {GLYPH[piece.id]}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <aside className="court-detail" key={sel.id}>
          <div className="court-fig">
            <img src={sel.img} alt={sel.name} loading="lazy" />
            <span className="court-piece-glyph">{GLYPH[sel.id]}</span>
          </div>
          <div className="court-info">
            <div className="court-piece">{sel.piece}</div>
            <h3 className="court-name">{sel.name}</h3>
            <p className="court-role">{sel.role}</p>
            <blockquote className="court-line">&ldquo;{sel.line}&rdquo;</blockquote>
          </div>
        </aside>
      </div>

      <div className="court-rail">
        {COURT.map((c) => (
          <button key={c.id} className={'rail-pip' + (sel.id === c.id ? ' on' : '')} onClick={() => setSel(c)}>
            {GLYPH[c.id]}<i>{c.name.split(' ')[0]}</i>
          </button>
        ))}
      </div>
    </SectionFrame>
  );
}
