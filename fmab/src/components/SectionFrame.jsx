import { motion } from 'motion/react';

// A leaf (page) of the grimoire. Illuminated header + inked content on parchment.
// Keeps the same props every chapter already passes (onClose is unused here —
// the book's own controls turn the pages).
export default function SectionFrame({ title, sub, glyph, children, accent = 'gold' }) {
  return (
    <article className={'leaf accent-' + accent}>
      <header className="leaf-head">
        <motion.span className="leaf-initial"
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}>
          {glyph}
        </motion.span>
        <div className="leaf-titles">
          <motion.div className="leaf-sub" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{sub}</motion.div>
          <motion.h2 className="leaf-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>{title}</motion.h2>
        </div>
      </header>
      <div className="leaf-rule" />
      <motion.div className="leaf-body"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.5 }}>
        {children}
      </motion.div>
    </article>
  );
}
