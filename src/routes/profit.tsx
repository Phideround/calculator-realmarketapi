import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalculatorShell, Field, NumberInput, Result, Select, INSTRUMENTS, fmt } from "../components/CalculatorShell";

export const Route = createFileRoute("/profit")({
  head: () => ({
    meta: [
      { title: "Profit Calculator for Traders — P/L and ROI" },
      { name: "description", content: "Free trading profit calculator. Estimate dollar P/L and ROI before placing a trade across forex, gold, crypto, indices and commodities." },
      { property: "og:title", content: "Profit Calculator | RealMarketAPI" },
      { property: "og:description", content: "Estimate potential gains and losses before placing a trade." },
      { property: "og:url", content: "/profit" },
    ],
    links: [{ rel: "canonical", href: "/profit" }],
    scripts: [bc("Profit Calculator", "/profit")],
  }),
  component: Page,
});

function Page() {
  const [instrument, setInstrument] = useState("EURUSD");
  const [entry, setEntry] = useState(1.1);
  const [exit, setExit] = useState(1.11);
  const [size, setSize] = useState(100000);
  const [direction, setDirection] = useState<"long" | "short">("long");

  const { pl, roi } = useMemo(() => {
    const diff = direction === "long" ? exit - entry : entry - exit;
    const pl = diff * size;
    const cost = entry * size;
    return { pl, roi: cost > 0 ? (pl / cost) * 100 : 0 };
  }, [entry, exit, size, direction]);

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Profit" }]}
      title="Profit Calculator"
      description="Estimate potential gains and losses before placing a trade."
      inputs={
        <>
          <Field label="Instrument">
            <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
              {Object.entries(INSTRUMENTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
          </Field>
          <Field label="Direction">
            <Select value={direction} onChange={(e) => setDirection(e.target.value as "long" | "short")}>
              <option value="long">Long (Buy)</option>
              <option value="short">Short (Sell)</option>
            </Select>
          </Field>
          <Field label="Entry Price"><NumberInput value={entry} step={0.0001} onChange={(e) => setEntry(+e.target.value)} /></Field>
          <Field label="Exit Price"><NumberInput value={exit} step={0.0001} onChange={(e) => setExit(+e.target.value)} /></Field>
          <Field label="Position Size (units)"><NumberInput value={size} onChange={(e) => setSize(+e.target.value)} /></Field>
        </>
      }
      outputs={
        <>
          <Result label="Profit / Loss" value={`${pl >= 0 ? "+" : "−"}$${fmt(Math.abs(pl))}`} />
          <Result label="ROI %" value={`${fmt(roi)}%`} />
        </>
      }
      about={
        <>
          <h2>Formula</h2>
          <p>For a long: P/L = (Exit − Entry) × Size. For a short: P/L = (Entry − Exit) × Size. ROI is computed against notional entry cost.</p>
        </>
      }
      learn={{ article: "long-vs-short-positions", articleTitle: "Long vs Short Positions", category: "trading-basics", categoryName: "Trading Basics" }}
    />
  );
}

function bc(name: string, path: string) {
  return { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://calculator.realmarketapi.com/" }, { "@type": "ListItem", position: 2, name, item: `https://calculator.realmarketapi.com${path}` }] }) };
}
