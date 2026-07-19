import { useState } from 'react';
import { isMuted, setMuted, initAudio, spark } from '../lib/sfx.js';

export default function Ambient() {
  const [muted, setMutedState] = useState(isMuted());

  const toggleSound = () => {
    initAudio();
    const nextMuted = !muted;
    setMutedState(nextMuted);
    setMuted(nextMuted);
    spark();
  };

  return (
    <>
      {/* CRT Scanline and Screen noise grain overlays */}
      <div className="crt-scanlines" />
      <div className="crt-noise" />
      <div className="grain" />
      <div className="vig" />

      {/* Military HUD Viewfinder boundary lines */}
      <div className="hud-bounds">
        <div className="hud-bracket top-left" />
        <div className="hud-bracket top-right" />
        <div className="hud-bracket bottom-left" />
        <div className="hud-bracket bottom-right" />
        
        {/* State telemetry overlays */}
        <div className="hud-telemetry left">
          <span>REC [AMESTRIS Central]</span>
          <span>SYS_VAL: EQUIV_EXCH_OK</span>
        </div>
        <div className="hud-telemetry right">
          <span>SIGNAL_STRENGTH: 98%</span>
          <span>SYS_TIME: [OCT.3.11]</span>
        </div>
      </div>

      {/* Floating Audio HUD Switcher */}
      <button 
        className={`hud-audio-toggle ${muted ? 'muted' : 'active'}`} 
        onClick={toggleSound}
        title="Toggle Alchemical Audio Frequency"
      >
        <span className="audio-icon">{muted ? '☒' : '☑'}</span>
        <span className="audio-label">AUDIO: {muted ? 'OFF' : 'ON'}</span>
      </button>
    </>
  );
}
