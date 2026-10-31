import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalculatorShell, Field, NumberInput, Result, fmt } from "../components/CalculatorShell";

export const Route = createFileRoute("/risk")({
  head: () => ({
    meta: [
      { title: "Forex Risk Calculator — Trade Risk in $ and %" },
      { name: "description", content: "Free risk calculator. See exactly how much you are risking in dollars and percentage of your account before placing a trade." },
      { property: "og:title", content: "Risk Calculator | RealMarketAPI" },
      { property: "og:description", content: "Calculate trade risk in dollars and percentage of account." },
      { property: "og:url", content: "/risk" },
    ],
    links: [{ rel: "canonical", href: "/risk" }],
    scripts: [bc("Risk Calculator", "/risk")],
  }),
  component: Page,
});

function Page() {
  const [balance, setBalance] = useState(10000);
  const [entry, setEntry] = useState(1.1);
  const [stop, setStop] = useState(1.095);
  const [size, setSize] = useState(100000);

  const { riskAmt, riskPct } = useMemo(() => {
    const r = Math.abs(entry - stop) * size;
    return { riskAmt: r, riskPct: balance > 0 ? (r / balance) * 100 : 0 };
  }, [balance, entry, stop, size]);

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Risk" }]}
      title="Risk Calculator"
      description="Understand exactly how much capital you are risking before entering a trade."
      inputs={
        <>
          <Field label="Account Balance (USD)"><NumberInput value={balance} onChange={(e) => setBalance(+e.target.value)} /></Field>
          <Field label="Entry Price"><NumberInput value={entry} step={0.0001} onChange={(e) => setEntry(+e.target.value)} /></Field>
          <Field label="Stop Loss Price"><NumberInput value={stop} step={0.0001} onChange={(e) => setStop(+e.target.value)} /></Field>
          <Field label="Position Size (units)"><NumberInput value={size} onChange={(e) => setSize(+e.target.value)} /></Field>
        </>
      }
      outputs={
        <>
          <Result label="Risk Amount" value={`$${fmt(riskAmt)}`} />
          <Result label="Risk Percentage" value={`${fmt(riskPct)}%`} sub={riskPct > 2 ? "Above the 1–2% guideline" : "Within healthy range"} />
        </>
      }
      about={
        <>
          <h2>Formula</h2>
          <p>Risk = |Entry − Stop| × Position Size. Risk % = Risk ÷ Account Balance × 100.</p>
        </>
      }
      learn={{ article: "stop-loss-strategies", articleTitle: "Stop Loss Strategies", category: "risk-management", categoryName: "Risk Management" }}
    />
  );
}

function bc(name: string, path: string) {
  return { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://calculator.realmarketapi.com/" }, { "@type": "ListItem", position: 2, name, item: `https://calculator.realmarketapi.com${path}` }] }) };
}
