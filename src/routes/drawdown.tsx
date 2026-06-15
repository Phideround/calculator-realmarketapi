import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalculatorShell, Field, NumberInput, Result, fmt } from "../components/CalculatorShell";

export const Route = createFileRoute("/drawdown")({
  head: () => ({
    meta: [
      { title: "Trading Drawdown Calculator — Recovery Required" },
      { name: "description", content: "Free trading drawdown calculator. Measure your drawdown percentage and the return needed to recover to breakeven." },
      { property: "og:title", content: "Drawdown Calculator | RealMarketAPI" },
      { property: "og:description", content: "Measure account drawdown and recovery requirements." },
      { property: "og:url", content: "/drawdown" },
    ],
    links: [{ rel: "canonical", href: "/drawdown" }],
    scripts: [bc("Drawdown Calculator", "/drawdown")],
  }),
  component: Page,
});

function Page() {
  const [start, setStart] = useState(10000);
  const [current, setCurrent] = useState(8500);

  const { lost, dd, recovery } = useMemo(() => {
    const lost = start - current;
    const dd = start > 0 ? (lost / start) * 100 : 0;
    const recovery = current > 0 ? (lost / current) * 100 : 0;
    return { lost, dd, recovery };
  }, [start, current]);

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Drawdown" }]}
      title="Drawdown Calculator"
      description="Measure account performance and understand recovery requirements."
      inputs={
        <>
          <Field label="Starting Balance (USD)"><NumberInput value={start} onChange={(e) => setStart(+e.target.value)} /></Field>
          <Field label="Current Balance (USD)"><NumberInput value={current} onChange={(e) => setCurrent(+e.target.value)} /></Field>
        </>
      }
      outputs={
        <>
          <Result label="Drawdown %" value={`${fmt(dd)}%`} />
          <Result label="Capital Lost" value={`$${fmt(lost)}`} />
          <Result label="Return Needed to Recover" value={`${fmt(recovery)}%`} sub="Recovery math is not symmetrical." />
        </>
      }
      about={
        <>
          <h2>Why drawdown matters</h2>
          <p>A 20% drawdown requires a 25% gain to recover; a 50% drawdown requires a 100% gain. Cutting losses small is mathematically essential.</p>
        </>
      }
    />
  );
}

function bc(name: string, path: string) {
  return { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://calculators.realmarketapi.com/" }, { "@type": "ListItem", position: 2, name, item: `https://calculators.realmarketapi.com${path}` }] }) };
}
