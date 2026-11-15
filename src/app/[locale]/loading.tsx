export default function LocaleLoading() {
  return (
    <section className="route-state" aria-live="polite" aria-busy="true">
      <div className="route-state-mark" aria-hidden="true">DB</div>
      <p className="eyebrow">DISCOVER BURGAS</p>
      <h1>Зареждаме следващото откритие…</h1>
      <div className="route-state-lines" aria-hidden="true"><i/><i/><i/></div>
      <span className="sr-only">Loading the next discovery.</span>
    </section>
  );
}
