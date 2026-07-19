import { motion } from 'motion/react';
import { NODES } from '../data.js';

// The contents leaf. Click an entry to turn straight to that chapter.
export default function Toc({ onPick }) {
  return (
    <article className="leaf toc-leaf accent-gold">
      <header className="leaf-head">
        <span className="leaf-initial">❦</span>
        <div className="leaf-titles">
          <div className="leaf-sub">TURN TO ANY CHAPTER</div>
          <h2 className="leaf-title">Contents</h2>
        </div>
      </header>
      <div className="leaf-rule" />
      <motion.ol className="toc-list"
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}>
        {NODES.map((n) => (
          <motion.li key={n.id} className={'toc-item accent-' + n.accent}
            variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
            whileHover={{ x: 8 }}
            onClick={() => onPick(n.id)}>
            <span className="toc-num">{n.num}</span>
            <span className="toc-thumb"><img src={n.plate} alt="" loading="lazy" /></span>
            <span className="toc-text">
              <b>{n.title}</b>
              <i>{n.sub}</i>
            </span>
            <span className="toc-glyph">{n.glyph}</span>
          </motion.li>
        ))}
      </motion.ol>
    </article>
  );
}
