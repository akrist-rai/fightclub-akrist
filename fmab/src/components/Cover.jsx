import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { rumble, spark } from '../lib/sfx.js';

export default function Cover({ onOpen }) {
  const [lines, setLines] = useState([]);
  const [complete, setComplete] = useState(false);

  const bootLogs = [
    'ESTABLISHING CONNECTION TO CENTRAL COMMAND ROUTER...',
    'SECURE HANDSHAKE RECOGNIZED. ENCRYPTING FEED...',
    'RETRIEVING RESEARCH LOGS [OCT.3.11]...',
    '-------------------------------------------------------',
    'RESEARCH SUBSECTION: GATE & ALCHEMICAL PROTOCOLS',
    'CORE LAW DEFINED: EQUIVALENT EXCHANGE',
    '>> "To obtain, something of equal value must be lost."',
    '-------------------------------------------------------',
    'WARNING: HUMAN TRANSMUTATION DATA IS REDACTED [CLASS-A]',
    'ATTEMPT DETECTION: SIGNAL TRACE SHIELDED...',
    'TRANSMUTING STATE INTERFACE... COMPLETE.',
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
    }, 280);

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
      <div className="terminal-screen">
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-title">AMESTRIS STATE MILITARY SYSTEM // COLD_BOOT</span>
        </div>

        <div className="terminal-body">
          {lines.map((line, i) => (
            <div key={i} className="terminal-line">
              <span className="terminal-prompt">&gt;</span> {line}
            </div>
          ))}
          {!complete && <div className="terminal-cursor">█</div>}

          {complete && (
            <motion.div
              className="terminal-access"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="access-title">SYSTEM SECURED // GATE INTERFACE READY</div>
              <button className="access-btn" onClick={handleAccess}>
                CONNECT TO ALCHEMICAL MATRIX
              </button>
            </motion.div>
          )}
        </div>

        <div className="terminal-footer">
          <span>PORT: 5174 // PROTOCOL: TRUTH_LINK_V4</span>
          <span>STATION: CENTRAL_CITY</span>
        </div>
      </div>
    </motion.div>
  );
}
