import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { initAudio } from './lib/sfx.js';
import Ambient from './components/Ambient.jsx';
import Cover from './components/Cover.jsx';
import Book from './components/Book.jsx';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="desk">
      <Ambient />
      <AnimatePresence mode="wait">
        {open
          ? <Book key="book" />
          : <Cover key="cover" onOpen={() => { initAudio(); setOpen(true); }} />}
      </AnimatePresence>
    </div>
  );
}
