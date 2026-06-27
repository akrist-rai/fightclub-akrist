import { useCallback, useEffect, useRef, useState } from 'react';
import { BOOT_LINES } from '../data.js';

// Terminal cold-boot overlay. Click anywhere (or wait) to enter.
export default function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [gone, setGone] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setGone(true);
    setTimeout(onDone, 620);
  }, [onDone]);

  useEffect(() => {
    let i = 0;
    const acc = [];
    const t = setInterval(() => {
      acc.push(BOOT_LINES[i++]);
      setLines([...acc]);
      if (i >= BOOT_LINES.length) { clearInterval(t); setTimeout(finish, 1300); }
    }, 480);
    return () => clearInterval(t);
  }, [finish]);

  return (
    <div className={'boot' + (gone ? ' gone' : '')} onClick={finish}>
      <pre>{lines.join('\n')}<span className="blk" /></pre>
      <div className="skip">[ click anywhere to enter the basement ]</div>
    </div>
  );
}
