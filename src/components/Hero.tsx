/** Asymmetric split hero — editorial, not centered blob (todo-3 v2) — 20-word subtext, real visual */
export default function Hero() {
  return (
    <div className="grid items-center gap-8 py-8 md:grid-cols-[48%_52%] md:py-12">
      <div className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          Group 4 · Mini R&D Report
        </p>
        <h1 className="text-4xl font-bold leading-[0.95] tracking-tighter md:text-5xl lg:text-6xl">
          AI-Based <span className="italic font-normal leading-[1.1] pb-1">Medical Diagnosis</span>
        </h1>
        <p className="max-w-[52ch] text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
          The logic, counting and graphs behind a symptom-based diagnosis assistant — proved, counted, mapped and runnable.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#demo"
            className="inline-flex min-h-11 items-center rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition hover:opacity-90 active:scale-[0.98]"
          >
            Try the Live Demo
          </a>
          <a
            href="#report"
            className="inline-flex min-h-11 items-center rounded-lg border border-[var(--border-default)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            View Report
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)]">
          <img
            src="https://picsum.photos/seed/medical-lab-research/1200/900"
            alt="Clinical research lab — pipettes and samples"
            width={1200}
            height={900}
            className="h-[320px] w-full object-cover md:h-[420px]"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-[var(--color-surface)] p-4 shadow-lg md:block">
          <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">Live knowledge graph</p>
          <p className="font-mono text-sm font-semibold">7 vertices · 6 edges · isomorphic ✓</p>
        </div>
      </div>
    </div>
  );
}
