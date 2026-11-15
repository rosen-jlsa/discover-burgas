"use client";

import { useParams } from "next/navigation";

export default function LocaleError({ retry }: { error: unknown; retry: () => void }) {
  const params = useParams<{ locale?: string }>();
  const bg = params?.locale !== "en";

  return (
    <section className="route-state" role="alert">
      <div className="route-state-mark" aria-hidden="true">!</div>
      <p className="eyebrow">{bg ? "ВРЕМЕННО ПРЕКЪСВАНЕ" : "TEMPORARY INTERRUPTION"}</p>
      <h1>{bg ? "Тази история не се зареди." : "This story did not load."}</h1>
      <p>{bg ? "Провери връзката и опитай отново. Картата и останалите места остават достъпни." : "Check your connection and try again. The map and the other places remain available."}</p>
      <button className="button" type="button" onClick={() => retry()}>{bg ? "Опитай отново" : "Try again"}</button>
    </section>
  );
}
