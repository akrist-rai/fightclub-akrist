import { motion } from 'motion/react';

export default function SectionFrame({ title, sub, glyph, children, accent = 'gold' }) {
  return (
    <article className={`dossier-frame accent-${accent}`}>
      <header className="dossier-header">
        <motion.div 
          className="dossier-glyph-box"
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        >
          {glyph}
        </motion.div>
        
        <div className="dossier-title-block">
          <motion.div 
            className="dossier-sub"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            {sub}
          </motion.div>
          <motion.h2 
            className="dossier-title"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h2>
        </div>

        <div className="dossier-stamp">
          <span>CLASSIFIED // STATE MILITARY</span>
        </div>
      </header>

      <div className="dossier-rule" />

      <motion.div 
        className="dossier-body"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </article>
  );
}
