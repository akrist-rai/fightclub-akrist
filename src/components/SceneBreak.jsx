// A cinematic letterboxed scene break: a designed poster shown whole over a
// blurred copy of itself, with reel/scene markers — like a frame of the film.
export default function SceneBreak({ id, img, alt, reelLeft, reelRight, cap }) {
  return (
    <section className="scene" id={id}>
      <div className="lbx t" />
      <div className="lbx b" />
      <img className="blur" src={img} alt="" aria-hidden="true" />
      <img className="poster" src={img} alt={alt} loading="lazy" />
      <div className="reel"><span>{reelLeft}</span><span>{reelRight}</span></div>
      <div className="cap">{cap}</div>
    </section>
  );
}
