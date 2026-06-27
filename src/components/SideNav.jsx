import { useEffect, useState } from 'react';
import { NAV } from '../data.js';

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function SideNav() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="idx">
      <ul>
        {NAV.map(([id, label], i) => (
          <li key={id} className={active === id ? 'on' : undefined} onClick={() => jump(id)}>
            <span>{String(i + 1).padStart(2, '0')}</span> {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
