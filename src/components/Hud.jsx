// Minimal cinema frame: four viewfinder brackets and one quiet label.
// Wayfinding lives in the side index; this is purely atmospheric.
export default function Hud() {
  return (
    <div className="hud" aria-hidden="true">
      <div className="br-corner tlc" /><div className="br-corner trc" />
      <div className="br-corner blc" /><div className="br-corner brc" />
      <div className="hud-tl">PROJECT MAYHEM · 1999</div>
    </div>
  );
}
