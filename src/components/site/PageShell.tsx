import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-festive text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        {eyebrow && <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-primary-foreground/80">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-5 px-4 py-14 leading-relaxed text-foreground/85 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-primary">{children}</div>;
}
