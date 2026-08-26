const LINKS = [
  ['#overview', 'Overview'],
  ['#unit-1', 'Unit I'],
  ['#unit-2', 'Unit II'],
  ['#unit-3', 'Unit III'],
  ['#demo', 'Live Demo'],
  ['#report', 'Report'],
] as const;

/** Sticky primary navigation (todo-7). Anchor-only — no router. */
export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--color-bg)]/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-3">
        <a href="#overview" className="whitespace-nowrap font-bold text-primary">
          G4 · MedDiag
        </a>
        <ul className="flex gap-1 text-sm">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="whitespace-nowrap rounded px-2 py-1 hover:bg-surface hover:text-primary">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
