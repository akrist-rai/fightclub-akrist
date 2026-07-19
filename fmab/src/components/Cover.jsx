import { motion } from 'motion/react';
import { GrandCircle } from '../lib/circles.jsx';

// The closed grimoire. Click to open it.
export default function Cover({ onOpen }) {
  return (
    <motion.button
      className="cover"
      onClick={onOpen}
      initial={{ rotateX: 18, opacity: 0, y: 40 }}
      animate={{ rotateX: 0, opacity: 1, y: 0 }}
      exit={{ rotateY: -118, opacity: 0, transformOrigin: 'left center' }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ scale: 1.015 }}
    >
      <div className="cover-leather">
        <div className="cover-emboss"><GrandCircle /></div>
        <div className="cover-plate">
          <div className="cover-kicker">鋼の錬金術師</div>
          <h1 className="cover-title">Fullmetal<br />Alchemist</h1>
          <div className="cover-band" />
          <div className="cover-sub">A Grimoire of Equivalent Exchange</div>
        </div>
        <div className="cover-corner ct-tl" /><div className="cover-corner ct-tr" />
        <div className="cover-corner ct-bl" /><div className="cover-corner ct-br" />
        <div className="cover-open">✦ open the book ✦</div>
      </div>
    </motion.button>
  );
}
