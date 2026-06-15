import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalculatorShell, Field, NumberInput, Result, Select, INSTRUMENTS, fmt } from "../components/CalculatorShell";

export const Route = createFileRoute("/margin")({
  head: () => ({
    meta: [
      { title: "Margin Calculator — Required Margin & Leverage" },
      { name: "description", content: "Free margin calculator for forex, gold, crypto, indices. Estimate required margin and margin usage before opening a trade." },
      { property: "og:title", content: "Margin Calculator | RealMarketAPI" },
      { property: "og:description", content: "Estimate margin requirements before opening a trade." },
      { property: "og:url", content: "/margin" },
    ],
    links: [{ rel: "canonical", href: "/margin" }],
    scripts: [bc("Margin Calculator", "/margin")],
  }),
  component: Page,
});

function Page() {
  const [instrument, setInstrument] = useState("EURUSD");
  const [size, setSize] = useState(100000);
  const [leverage, setLeverage] = useState(100);
  const [price, setPrice] = useState(1.1);
  const [balance, setBalance] = useState(10000);

  const { margin, usage } = useMemo(() => {
    const notional = size * price;
    const m = leverage > 0 ? notional / leverage : 0;
    return { margin: m, usage: balance > 0 ? (m / balance) * 100 : 0 };
  }, [size, leverage, price, balance]);

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Margin" }]}
      title="Margin Calculator"
      description="Estimate margin requirements before opening a trade."
      inputs={
        <>
          <Field label="Instrument">
            <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
              {Object.entries(INSTRUMENTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
          </Field>
          <Field label="Position Size (units)"><NumberInput value={size} onChange={(e) => setSize(+e.target.value)} /></Field>
          <Field label="Current Price"><NumberInput value={price} step={0.0001} onChange={(e) => setPrice(+e.target.value)} /></Field>
          <Field label="Leverage (e.g. 100 = 1:100)"><NumberInput value={leverage} onChange={(e) => setLeverage(+e.target.value)} /></Field>
          <Field label="Account Balance (USD)"><NumberInput value={balance} onChange={(e) => setBalance(+e.target.value)} /></Field>
        </>
      }
      outputs={
        <>
          <Result label="Required Margin" value={`$${fmt(margin)}`} />
          <Result label="Margin Usage" value={`${fmt(usage)}%`} sub={usage > 50 ? "High exposure — consider reducing size" : "Comfortable"} />
        </>
      }
      about={
        <>
          <h2>Formula</h2>
          <p>Required Margin = (Position Size × Price) ÷ Leverage. Higher leverage reduces margin but increases liquidation risk.</p>
        </>
      }
    />
  );
}

function bc(name: string, path: string) {
  return { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://calculators.realmarketapi.com/" }, { "@type": "ListItem", position: 2, name, item: `https://calculators.realmarketapi.com${path}` }] }) };
}
