import { useEffect, useRef, useState } from 'react';
import { useFx } from '../context/Fx.jsx';
import { HOMEWORK } from '../data.js';

export default function Homework() {
  const fx = useFx();
  const [text, setText] = useState('Press the button. Receive your assignment. Ask no questions.');
  const [count, setCount] = useState(0);
  const [id, setId] = useState('01');
  const [label, setLabel] = useState('RECEIVE ASSIGNMENT');
  const bag = useRef([]);
  const typer = useRef(0);

  useEffect(() => () => clearInterval(typer.current), []);

  const receive = () => {
    if (bag.current.length === 0) bag.current = [...HOMEWORK].sort(() => Math.random() - 0.5);
    const task = bag.current.pop();
    setCount((c) => c + 1);
    setId(String(Math.floor(Math.random() * 98) + 1).padStart(2, '0'));
    setLabel('NEXT ASSIGNMENT');
    fx.flash('MAYHEM');
    clearInterval(typer.current);
    let i = 0;
    typer.current = setInterval(() => {
      i++;
      setText(task.slice(0, i));
      if (i >= task.length) clearInterval(typer.current);
    }, 18);
  };

  return (
    <section className="homework sec" id="homework">
      <span className="eyebrow gold rev">// project mayhem · committee for human sacrifice</span>
      <h2 className="disp rev" style={{ fontSize: 'clamp(32px,6.5vw,72px)', margin: '0 0 6px', lineHeight: '.86' }}>Tonight&rsquo;s Homework</h2>
      <div className="hw-card rev">
        <div className="hw-head">▌ ASSIGNMENT — ISSUED TO SPACE MONKEY <span>{id}</span></div>
        <p className="hw-text type">{text}</p>
        <button className="hw-btn" onClick={receive}>{label}</button>
        <div className="hw-count">assignments issued: {count}</div>
      </div>
    </section>
  );
}
