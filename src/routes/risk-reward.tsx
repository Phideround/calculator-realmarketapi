import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalculatorShell, Field, NumberInput, Result, Select, fmt } from "../components/CalculatorShell";
import { PIP_PAIRS } from "../lib/pip";

export const Route = createFileRoute("/risk-reward")({
  head: () => ({
    meta: [
      { title: "Risk Reward Calculator — R:R Ratio and Breakeven Win Rate" },
      { name: "description", content: "Free risk/reward calculator. Enter entry, stop loss and take profit targets to get the R:R ratio, risk and reward in price and pips, and the breakeven win rate." },
      { property: "og:title", content: "Risk/Reward Calculator | RealMarketAPI" },
      { property: "og:description", content: "Calculate R:R ratio, pip distances and breakeven win rate for long and short trades." },
      { property: "og:url", content: "/risk-reward" },
    ],
    links: [{ rel: "canonical", href: "/risk-reward" }],
    scripts: [bc("Risk/Reward Calculator", "/risk-reward")],
  }),
  component: Page,
});

type Direction = "long" | "short";

const round = (n: number, pipSize: number) => +n.toFixed(decimals(pipSize));
const decimals = (pipSize: number) => Math.max(0, Math.round(-Math.log10(pipSize))) + 1;

function defaults(instrument: string, dir: Direction) {
  const { price, pipSize } = PIP_PAIRS[instrument];
  const s = dir === "long" ? 1 : -1;
  return {
    entry: price,
    stop: round(price - s * 50 * pipSize, pipSize),
    tps: [round(price + s * 100 * pipSize, pipSize), "", ""] as (number | "")[],
  };
}

function Page() {
  const init = defaults("EURUSD", "long");
  const [instrument, setInstrument] = useState("EURUSD");
  const [direction, setDirection] = useState<Direction>("long");
  const [entry, setEntry] = useState(init.entry);
  const [stop, setStop] = useState(init.stop);
  const [tps, setTps] = useState<(number | "")[]>(init.tps);
  const [lots, setLots] = useState<number | "">("");

  const pair = PIP_PAIRS[instrument];
  const digits = decimals(pair.pipSize);

  const calc = useMemo(() => {
    const s = direction === "long" ? 1 : -1;
    const risk = (entry - stop) * s;
    const targets = tps
      .map((tp, i) => ({ i, tp }))
      .filter((t): t is { i: number; tp: number } => t.tp !== "")
      .map(({ i, tp }) => {
        const reward = (tp - entry) * s;
        const rr = risk > 0 ? reward / risk : NaN;
        return { i, tp, reward, rr, breakeven: rr > 0 ? 100 / (1 + rr) : NaN, valid: reward > 0 };
      });
    return { risk, riskValid: risk > 0, targets };
  }, [direction, entry, stop, tps]);

  const toPips = (d: number) => d / pair.pipSize;
  const money = (d: number) => (lots === "" ? null : d * pair.contractSize * lots);
  const riskMoney = money(calc.risk);

  const onInstrument = (k: string) => {
    const d = defaults(k, direction);
    setInstrument(k);
    setEntry(d.entry);
    setStop(d.stop);
    setTps(d.tps);
  };
  // Mirror stop and targets around the entry so the trade stays valid when flipping direction.
  const onDirection = (d: Direction) => {
    if (d === direction) return;
    setDirection(d);
    setStop(round(2 * entry - stop, pair.pipSize));
    setTps(tps.map((tp) => (tp === "" ? "" : round(2 * entry - tp, pair.pipSize))));
  };
  const setTp = (i: number, v: string) => setTps(tps.map((tp, j) => (j === i ? (v === "" ? "" : +v) : tp)));

  const main = calc.targets[0];

  return (
    <CalculatorShell
      breadcrumbs={[{ to: "/", label: "Home" }, { label: "Risk/Reward" }]}
      title="Risk/Reward Calculator"
      description="Compare what you risk with what you stand to gain, and see the win rate you need to break even."
      inputs={
        <>
          <Field label="Instrument" hint={`Pip size: ${pair.pipSize}`}>
            <Select value={instrument} onChange={(e) => onInstrument(e.target.value)}>
              {Object.entries(PIP_PAIRS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Select>
          </Field>
          <Field label="Direction">
            <Select value={direction} onChange={(e) => onDirection(e.target.value as Direction)}>
              <option value="long">Long (Buy)</option>
              <option value="short">Short (Sell)</option>
            </Select>
          </Field>
          <Field label="Entry Price"><NumberInput value={entry} step={pair.pipSize} onChange={(e) => setEntry(+e.target.value)} /></Field>
          <Field label="Stop Loss Price"><NumberInput value={stop} step={pair.pipSize} onChange={(e) => setStop(+e.target.value)} /></Field>
          {tps.map((tp, i) => (
            <Field key={i} label={i === 0 ? "Take Profit Price" : `Take Profit ${i + 1} (optional)`}>
              <NumberInput value={tp} step={pair.pipSize} placeholder={i === 0 ? undefined : "Leave empty to skip"} onChange={(e) => setTp(i, e.target.value)} />
            </Field>
          ))}
          <Field label="Position Size (lots, optional)" hint={`Adds risk and reward in ${pair.quote}. 1 lot = ${fmt(pair.contractSize, 0)} ${pair.base === "XAU" ? "oz" : "units"}.`}>
            <NumberInput value={lots} step={0.01} placeholder="e.g. 1" onChange={(e) => setLots(e.target.value === "" ? "" : +e.target.value)} />
          </Field>
        </>
      }
      outputs={
        <>
          {!calc.riskValid && (
            <p className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-foreground">
              For a {direction} trade the stop loss must be {direction === "long" ? "below" : "above"} the entry price.
            </p>
          )}
          {main && !main.valid && (
            <p className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-foreground">
              For a {direction} trade the take profit must be {direction === "long" ? "above" : "below"} the entry price.
            </p>
          )}
          <Result label="Risk : Reward" value={main && calc.riskValid && main.valid ? `1 : ${fmt(main.rr)}` : "—"} sub={calc.targets.length > 1 ? "Based on the first target" : undefined} />
          <Result
            label="Risk Distance"
            value={`${fmt(toPips(calc.risk), 1)} pips`}
            sub={`${fmt(calc.risk, digits)} in price${riskMoney !== null ? ` · ${fmt(riskMoney)} ${pair.quote}` : ""}`}
          />
          {main && (
            <Result
              label="Reward Distance"
              value={`${fmt(toPips(main.reward), 1)} pips`}
              sub={`${fmt(main.reward, digits)} in price${money(main.reward) !== null ? ` · ${fmt(money(main.reward)!)} ${pair.quote}` : ""}`}
            />
          )}
          <Result label="Breakeven Win Rate" value={main && calc.riskValid && main.valid ? `${fmt(main.breakeven, 1)}%` : "—"} sub="Win rate needed to break even = 1 ÷ (1 + R:R)" />
          {calc.riskValid && calc.targets.some((t) => t.valid) && (
            <div className="rounded-lg border border-border bg-background/40 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Risk vs Reward</div>
              <div className="mt-3 space-y-3">
                {calc.targets.filter((t) => t.valid).map((t) => (
                  <RiskRewardBar key={t.i} label={`TP${t.i + 1}`} risk={calc.risk} reward={t.reward} rr={t.rr} breakeven={t.breakeven} multi={calc.targets.length > 1} />
                ))}
              </div>
            </div>
          )}
        </>
      }
      about={
        <>
          <h2>How risk/reward works</h2>
          <p>Risk = |Entry − Stop loss| and Reward = |Take profit − Entry|. The R:R ratio is Reward ÷ Risk, so a 50-pip stop with a 100-pip target is 1 : 2. Pip distances use 0.0001 per pip for most forex pairs, 0.01 for JPY pairs, and 0.1 for gold.</p>
          <p>Breakeven win rate = 1 ÷ (1 + R:R). At 1 : 2 you only need to win 33.3% of trades to break even before costs; at 1 : 1 you need 50%.</p>
          <h2>FAQ</h2>
          <p><strong>What is a good risk/reward ratio?</strong> Many traders aim for at least 1 : 2, but the right ratio depends on your strategy’s real win rate. A high R:R with a very low hit rate can still lose money.</p>
          <p><strong>Can I use multiple targets?</strong> Yes. Add up to three take-profit levels to see the R:R and breakeven win rate for each partial exit.</p>
          <p>Once you know your stop distance, size the trade with the <a href="/position-size">position size calculator</a> or check the <a href="/pip-value">pip value</a> for your account currency.</p>
        </>
      }
      learn={{ article: "risk-reward-ratio", articleTitle: "Risk Reward Ratio", category: "risk-management", categoryName: "Risk Management" }}
    />
  );
}

function RiskRewardBar({ label, risk, reward, rr, breakeven, multi }: { label: string; risk: number; reward: number; rr: number; breakeven: number; multi: boolean }) {
  const riskPct = (risk / (risk + reward)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{multi ? `${label} · ` : ""}1 : {fmt(rr)}</span>
        <span>Breakeven {fmt(breakeven, 1)}%</span>
      </div>
      <div className="mt-1.5 flex h-3 overflow-hidden rounded-full" role="img" aria-label={`Risk ${fmt(riskPct, 0)}% versus reward ${fmt(100 - riskPct, 0)}%`}>
        <div className="bg-destructive" style={{ width: `${riskPct}%` }} />
        <div className="bg-success" style={{ width: `${100 - riskPct}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>Risk</span>
        <span>Reward</span>
      </div>
    </div>
  );
}

function bc(name: string, path: string) {
  return { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://calculator.realmarketapi.com/" }, { "@type": "ListItem", position: 2, name, item: `https://calculator.realmarketapi.com${path}` }] }) };
}
