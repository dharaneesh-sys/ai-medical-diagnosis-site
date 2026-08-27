/** Hero block (todo-12): owns the page H1 and the two CTAs. */
export default function Hero() {
  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold leading-tight md:text-5xl">
        GROUP 4 — AI-Based Medical Diagnosis
      </h1>
      <p className="text-lg text-muted">
        Discrete Mathematics — Units I–III: the logic, counting and graph theory behind a
        symptom-based diagnosis assistant — proved, counted, mapped, and runnable below.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href="#demo"
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-[#06231c] transition-opacity hover:opacity-90"
        >
          Try the Live Demo
        </a>
        <a
          href="#report"
          className="rounded-lg border border-white/20 px-4 py-2 transition-colors hover:border-primary hover:text-primary"
        >
          Jump to Report
        </a>
      </div>
    </div>
  );
}
