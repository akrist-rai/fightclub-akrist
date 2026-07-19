import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { rumble, spark } from '../lib/sfx.js';

export default function Cover({ onOpen }) {
  const [lines, setLines] = useState([]);
  const [complete, setComplete] = useState(false);

  const bootLogs = [
    'OPENING THE ELRIC FIELD RECORD...',
    'RESEMBool // CENTRAL // BRIGGS // THE PROMISED DAY',
    'A STORY OF TWO BROTHERS AND EVERYONE WHO BROUGHT THEM HOME.',
    'ARCHIVE READY.',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLogs.length) {
        setLines((prev) => [...prev, bootLogs[index]]);
        index++;
        if (index % 3 === 0) {
          rumble(); // Add alchemical machine rumble on log load
        }
      } else {
        clearInterval(interval);
        setComplete(true);
        spark();
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const handleAccess = () => {
    spark();
    onOpen();
  };

  return (
    <motion.div
      className="terminal-boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cover-poster">
        <div className="cover-image" />
        <div className="cover-ink" />
        <div className="cover-mark">⚭</div>
        <div className="cover-kicker">AN UNOFFICIAL VISUAL STORYBOOK OF</div>
        <h1 className="cover-title"><span>FULLMETAL</span><em>ALCHEMIST</em></h1>
        <p className="cover-subtitle">BROTHERHOOD · A STORY OF LOSS, CHOICE, AND COMING HOME</p>
        <div className="cover-dossier">
          <div className="cover-dossier-title">THE ELRIC RECORD / OPEN FOR READING</div>
          <div className="terminal-body cover-log" aria-live="polite">
            {lines.slice(-3).map((line, i) => (
              <div key={i} className="terminal-line"><span className="terminal-prompt">//</span>{line}</div>
            ))}
            {!complete && <div className="terminal-cursor">█</div>}
          </div>
          {complete && (
            <motion.div className="terminal-access" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <button className="access-btn" onClick={handleAccess}>BEGIN THE STORY <span>→</span></button>
            </motion.div>
          )}
        </div>
        <div className="cover-edition">VOLUME 01<br />1914 / AMESTRIS</div>
      </div>
    </motion.div>
  );
}
