import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Shield, Landmark, TrendingDown, TrendingUp, Lock, BarChart3, Repeat, Scale, Coins } from "lucide-react";
import { DOCS_URL, SITE_URL, withUtm } from "../lib/links";

const CALCS = [
  { to: "/position-size", title: "Position Size Calculator", desc: "Calculate the ideal position size based on your account balance and risk management rules.", Icon: Calculator },
  { to: "/risk", title: "Risk Calculator", desc: "Understand exactly how much capital you are risking before entering a trade.", Icon: Shield },
  { to: "/margin", title: "Margin Calculator", desc: "Estimate margin requirements before opening a trade.", Icon: Landmark },
  { to: "/drawdown", title: "Drawdown Calculator", desc: "Measure account performance and understand recovery requirements.", Icon: TrendingDown },
  { to: "/profit", title: "Profit Calculator", desc: "Estimate potential gains and losses before placing a trade.", Icon: TrendingUp },
  { to: "/pip-value", title: "Pip Value Calculator", desc: "Find out how much a single pip is worth for your position, in your account currency.", Icon: Coins },
  { to: "/risk-reward", title: "Risk/Reward Calculator", desc: "Compare what you risk with what you stand to gain, and see the win rate you need to break even.", Icon: Scale },
] as const;

const FAQ = [
  { q: "Are these trading calculators free?", a: "Yes. All calculators on Calculators.RealMarketAPI.com are free forever and do not require registration." },
  { q: "Can I use these for forex, gold, crypto, stocks, indices and commodities?", a: "Yes. Each calculator supports the most popular instruments across forex pairs, metals like XAUUSD, major crypto, equity indices, and commodities." },
  { q: "How accurate are the calculations?", a: "Calculations use standard industry formulas. For live execution, combine with real-time prices from RealMarketAPI to validate against your broker’s quotes." },
  { q: "What is the recommended risk per trade?", a: "Most professional traders risk only 1–2% of their account per trade to survive losing streaks and compound returns over time." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free Trading Calculators — Position Size, Risk, Margin, Drawdown, Profit" },
      { name: "description", content: "Free professional trading calculators for forex, gold, crypto, stocks, indices and commodities. Calculate position size, risk, margin, drawdown and profit instantly." },
      { property: "og:title", content: "Free Trading Calculators | RealMarketAPI" },
      { property: "og:description", content: "Position size, risk, margin, drawdown and profit calculators for serious traders. Free forever, no registration." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Calculators.RealMarketAPI",
          url: "https://calculator.realmarketapi.com",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.45 0.18 275 / 0.35), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              Professional Trading Tools Powered by RealMarketAPI
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Free <span className="brand-text">Trading Calculators</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Professional trading calculators to help you manage risk, position size, margin requirements, profits, and drawdowns.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/position-size" className="inline-flex items-center rounded-md brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Position Size Calculator
              </Link>
              <Link to="/risk" className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
                Risk Calculator
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>✓ Free Forever</li>
              <li>✓ No Registration Required</li>
              <li>✓ Used by Traders Worldwide</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section id="calculators" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">All Calculators</h2>
            <p className="mt-2 text-muted-foreground">Pick a tool to get started. Each calculator is instant and works offline in your browser.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCS.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group animate-fade-in rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">Open calculator →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Why Risk Management Matters</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">The single largest predictor of long-term trading survival is how you size and manage risk.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Never risk more than 1–2% per trade", d: "Small per-trade risk lets you survive losing streaks without blowing up.", Icon: Lock },
            { t: "Protect your capital first", d: "Capital preservation is the prerequisite for compounding.", Icon: Shield },
            { t: "Consistency beats large wins", d: "A steady edge applied with discipline outperforms occasional home runs.", Icon: Repeat },
            { t: "R:R beats win rate", d: "A 40% win rate with 1:3 risk-to-reward outperforms 60% wins with 1:1.", Icon: Scale },
          ].map((c) => (
            <div key={c.t} className="group animate-fade-in rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-display text-base font-semibold text-foreground">{f.q}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Built as a companion to <a href={withUtm(SITE_URL, "home_faq")} className="text-primary hover:underline" rel="noreferrer">RealMarketAPI</a> — real-time market data for forex, crypto, stocks, indices and commodities.
        </p>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border brand-gradient p-8 sm:p-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
                Need real-time market data for your trading app, AI agent, or dashboard?
              </h2>
              <p className="mt-2 text-primary-foreground/85">
                RealMarketAPI delivers forex, crypto, stocks, indices and commodities data with a single API.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
              <a
                href={withUtm(SITE_URL, "home_cta")}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-md bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Get RealMarketAPI →
              </a>
              <a
                href={withUtm(DOCS_URL, "home_cta")}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-medium text-primary-foreground/85 hover:text-primary-foreground hover:underline"
              >
                Read the API docs
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
