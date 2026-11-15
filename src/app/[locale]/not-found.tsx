import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <section className="route-state">
      <div className="route-state-mark" aria-hidden="true">404</div>
      <p className="eyebrow">ИЗГУБЕНА СЛЕДА · LOST TRAIL</p>
      <h1>Това място още не е част от картата.</h1>
      <p>This place is not part of the map yet.</p>
      <div className="route-state-actions">
        <Link className="button" href="/bg/map">Разгледай картата</Link>
        <Link className="button secondary" href="/en/map">Explore the map</Link>
      </div>
    </section>
  );
}
