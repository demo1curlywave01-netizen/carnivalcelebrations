import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src="/logo-transparent.png"
      alt="Carnival Celebrations"
      className={`object-contain ${className}`}
    />
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="Carnival Celebrations home">
      <div className={inverted ? "rounded-xl bg-white/95 p-1 shadow-sm shrink-0" : "shrink-0"}>
        <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
      </div>
      <span className="leading-none">
        <span className={`block font-display text-2xl font-semibold ${inverted ? "text-primary-foreground" : "text-primary"}`}>Carnival</span>
        <span className={`block text-[0.6rem] font-semibold tracking-[0.45em] ${inverted ? "text-accent" : "text-accent-foreground/70"}`}>CELEBRATIONS</span>
      </span>
    </Link>
  );
}
