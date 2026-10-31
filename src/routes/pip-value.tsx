import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalculatorShell,
  Field,
  NumberInput,
  Result,
  Select,
  fmt,
} from "../components/CalculatorShell";
import { PIP_PAIRS, CURRENCIES, APPROX_USD_PER_UNIT, type Currency } from "../lib/pip";

export const Route = createFileRoute("/pip-value")({
  head: () => ({
    meta: [
      { title: "Pip Value Calculator — Forex Pairs and Gold (XAUUSD)" },
      { name: "description", content: "Free pip value calculator. Find how much one pip is worth for your position and per standard lot on forex pairs and gold, in your account currency." },
      { property: "og:title", content: "Pip Value Calculator | RealMarketAPI" },
      { property: "og:description", content: "Calculate the value of one pip for forex pairs and XAUUSD in USD, EUR, GBP, JPY and more." },
      { property: "og:url", content: "/pip-value" },
    ],
    links: [{ rel: "canonical", href: "/pip-value" }],
    scripts: [bc("Pip Value Calculator", "/pip-value")],
  }),
  component: Page,
});

const defaultRate = (from: Currency, to: Currency) => +(APPROX_USD_PER_UNIT[from] / APPROX_USD_PER_UNIT[to]).toPrecision(5);

function Page() {
  const [instrument, setInstrument] = useState("EURUSD");
  const [lots, setLots] = useState(1);
  const [account, setAccount] = useState<Currency>("USD");
  const [price, setPrice] = useState(PIP_PAIRS.EURUSD.price);
  const [rate, setRate] = useState(1);

  const pair = PIP_PAIRS[instrument];
  // How the quote-currency pip value is converted into the account currency.
  const mode: "direct" | "price" | "rate" =
    pair.quote === account ? "direct" : pair.base === account ? "price" : "rate";

  const { perLot, perPosition, perLotQuote } = useMemo(() => {
    const quoteValue = pair.pipSize * pair.contractSize; // pip value per lot, in quote currency
    let factor = 1;
    if (mode === "price") factor = price > 0 ? 1 / price : NaN;
    if (mode === "rate") factor = rate > 0 ? rate : NaN;
    const perLot = quoteValue * factor;
    return { perLot, perPosition: perLot * lots, perLotQuote: quoteValue };
  }, [pair, mode, price, rate, lots]);

  const onInstrument = (k: string) => {
    setInstrument(k);
    setPrice(PIP_PAIRS[k].price);
    setRate(defaultRate(PIP_PAIRS[k].quote, account));
  };
  const onAccount = (c: Currency) => {
    setAccount(c);
    setRate(defaultRate(pair.quote, c));
  };

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Pip Value" }]}
      title="Pip Value Calculator"
      description="Find out how much a single pip is worth for your position, in your account currency."
      inputs={
        <>
          <Field label="Instrument">
            <Select value={instrument} onChange={(e) => onInstrument(e.target.value)}>
              {Object.entries(PIP_PAIRS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
          </Field>
          <Field label="Position Size (lots)" hint={`1 lot = ${fmt(pair.contractSize, 0)} ${pair.base === "XAU" ? "oz" : "units"}. Pip size: ${pair.pipSize}.`}>
            <NumberInput value={lots} step={0.01} onChange={(e) => setLots(+e.target.value)} />
          </Field>
          <Field label="Account Currency">
            <Select value={account} onChange={(e) => onAccount(e.target.value as Currency)}>
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          {mode === "price" && (
            <Field label={`Current ${pair.label} Price`} hint={`Needed because your account is in the base currency (${pair.base}).`}>
              <NumberInput value={price} step={pair.pipSize} onChange={(e) => setPrice(+e.target.value)} />
            </Field>
          )}
          {mode === "rate" && (
            <Field label={`Exchange Rate (1 ${pair.quote} = ? ${account})`} hint={`Pre-filled with an approximate rate. Enter the live ${pair.quote}/${account} rate for accuracy.`}>
              <NumberInput value={rate} step={0.0001} onChange={(e) => setRate(+e.target.value)} />
            </Field>
          )}
        </>
      }
      outputs={
        <>
          <Result label="Pip Value (your position)" value={`${fmt(perPosition)} ${account}`} sub={`Per pip on ${fmt(lots, 2)} lot${lots === 1 ? "" : "s"}`} />
          <Result label="Pip Value per Standard Lot" value={`${fmt(perLot)} ${account}`} />
          <Result label="Pip Value per Lot (quote currency)" value={`${fmt(perLotQuote)} ${pair.quote}`} />
        </>
      }
      about={
        <>
          <h2>How pip value is calculated</h2>
          <p>Pip value (quote currency) = Pip size × Contract size × Lots. A pip is 0.0001 for most forex pairs and 0.01 for JPY pairs, on a standard lot of 100,000 units.</p>
          <p>To express it in your account currency: if the account currency is the quote currency (e.g. USD on EUR/USD) no conversion is needed; if it is the base currency (e.g. USD on USD/JPY) divide by the current price; otherwise multiply by the quote-to-account exchange rate.</p>
          <p>Gold (XAU/USD) uses a 100 oz lot and a 0.1 pip here, so one pip is worth $10 per lot — the same convention as our <a href="/position-size">position size calculator</a>. Some brokers quote gold pips as 0.01 ($1 per lot), so check your platform.</p>
          <h2>FAQ</h2>
          <p><strong>Why does pip value change on USD/JPY?</strong> Its pips are worth a fixed 1,000 JPY per lot, so the USD value moves with the exchange rate.</p>
          <p><strong>How do I use pip value?</strong> Multiply it by your stop distance in pips to get dollar risk, or use the <a href="/risk-reward">risk/reward calculator</a> to plan the trade.</p>
        </>
      }
      learn={{ article: "what-is-a-pip", articleTitle: "What Is a Pip?", category: "trading-basics", categoryName: "Trading Basics" }}
    />
  );
}

function bc(name: string, path: string) {
  return { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://calculator.realmarketapi.com/" }, { "@type": "ListItem", position: 2, name, item: `https://calculator.realmarketapi.com${path}` }] }) };
}
