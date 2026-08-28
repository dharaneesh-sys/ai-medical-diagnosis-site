import Button from "../ui/Button";
import Card from "../ui/Card";
import GraphSvgBase from "../figures/GraphSvgBase";
import { bipartiteLayout, circularLayout } from "../../lib/graphModel";

/** Primitive showcase — renders every DESIGN.md §5 primitive in all required states at 375/768/1280. */
export default function Showcase() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <h1 className="text-3xl font-bold">Primitive Showcase</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Button — primary / ghost / chip</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary CTA</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="chip" pressed>Chip pressed</Button>
          <Button variant="chip">Chip</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" loading>Loading</Button>
          <button className="rounded-lg border border-white/10 px-4 py-2.5 text-sm opacity-50" disabled>Empty state placeholder</button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>Default card — surface, border, p-5. Used for case studies and demo panels.</Card>
          <Card variant="highlight">Highlighted — border-primary/40, for conclusion.</Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Table — truth table style</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead><tr className="bg-surface"><th className="border border-white/10 px-3 py-2">A</th><th className="border px-3 py-2">B</th><th className="border px-3 py-2">Result</th></tr></thead>
            <tbody>
              <tr><td className="border px-3 py-2">T</td><td className="border px-3 py-2">T</td><td className="border px-3 py-2">T</td></tr>
              <tr className="row-premises-true"><td className="border px-3 py-2">F</td><td className="border px-3 py-2">T</td><td className="border px-3 py-2">T</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Graph — both layouts (animatic)</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div><h3 className="mb-2 text-sm font-semibold">Bipartite</h3><GraphSvgBase points={bipartiteLayout()} ariaLabel="bipartite showcase" width={480} /></div>
          <div><h3 className="mb-2 text-sm font-semibold">Circular</h3><GraphSvgBase points={circularLayout()} ariaLabel="circular showcase" width={480} /></div>
        </div>
      </section>
    </div>
  );
}
