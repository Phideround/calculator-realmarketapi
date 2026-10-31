import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalculatorShell, Field, NumberInput, Result, Select, INSTRUMENTS, fmt } from "../components/CalculatorShell";

export const Route = createFileRoute("/position-size")({
  head: () => ({
    meta: [
      { title: "Position Size Calculator — Forex, Gold, Crypto, Stocks" },
      { name: "description", content: "Free position size calculator. Find the ideal lot size for any trade based on account balance, risk percentage and stop loss." },
      { property: "og:title", content: "Position Size Calculator | RealMarketAPI" },
      { property: "og:description", content: "Calculate the ideal position size for forex, gold, crypto, indices and commodities." },
      { property: "og:url", content: "/position-size" },
    ],
    links: [{ rel: "canonical", href: "/position-size" }],
    scripts: [breadcrumb("Position Size Calculator", "/position-size")],
  }),
  component: Page,
});

function Page() {
  const [balance, setBalance] = useState(10000);
  const [risk, setRisk] = useState(1);
  const [pips, setPips] = useState(20);
  const [instrument, setInstrument] = useState("EURUSD");

  const { riskAmount, lots, units } = useMemo(() => {
    const ra = balance * (risk / 100);
    const pipValue = INSTRUMENTS[instrument].pipValuePerLot;
    const cs = INSTRUMENTS[instrument].contractSize;
    const lots = pips > 0 ? ra / (pips * pipValue) : 0;
    return { riskAmount: ra, lots, units: lots * cs };
  }, [balance, risk, pips, instrument]);

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Position Size" }]}
      title="Position Size Calculator"
      description="Calculate the ideal position size based on your account balance and risk management rules."
      inputs={
        <>
          <Field label="Account Balance (USD)"><NumberInput value={balance} onChange={(e) => setBalance(+e.target.value)} /></Field>
          <Field label="Risk % per trade" hint="Most traders use 1–2%."><NumberInput value={risk} step={0.1} onChange={(e) => setRisk(+e.target.value)} /></Field>
          <Field label="Stop Loss (pips)"><NumberInput value={pips} onChange={(e) => setPips(+e.target.value)} /></Field>
          <Field label="Instrument">
            <Select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
              {Object.entries(INSTRUMENTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
          </Field>
        </>
      }
      outputs={
        <>
          <Result label="Risk Amount" value={`$${fmt(riskAmount)}`} />
          <Result label="Lot Size" value={fmt(lots, 3)} sub="Standard lots" />
          <Result label="Position Size (units)" value={fmt(units, 0)} />
        </>
      }
      about={
        <>
          <h2>How position sizing works</h2>
          <p>Position size = (Account × Risk%) ÷ (Stop in pips × Pip value per lot). The calculator uses the contract specification of the selected instrument to convert lots to units. For crypto and indices we treat one unit as one contract.</p>
          <p>Pair this tool with the <a href="/risk">risk calculator</a> to sanity-check the dollar risk before sending the order.</p>
        </>
      }
      learn={{ article: "position-sizing", articleTitle: "Position Sizing", category: "risk-management", categoryName: "Risk Management" }}
    />
  );
}

function breadcrumb(name: string, path: string) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://calculator.realmarketapi.com/" },
        { "@type": "ListItem", position: 2, name, item: `https://calculator.realmarketapi.com${path}` },
      ],
    }),
  };
}
