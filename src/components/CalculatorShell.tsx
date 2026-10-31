import { Link } from "@tanstack/react-router";
import { SlidersHorizontal, BarChart3, BookOpen, Code2 } from "lucide-react";
import type { ReactNode } from "react";
import { DOCS_URL, REGISTER_URL, learnArticle, learnCategory, withUtm } from "../lib/links";

interface Crumb { to?: string; label: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {c.to ? (
              <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CalculatorShell({
  title,
  description,
  inputs,
  outputs,
  about,
  breadcrumbs,
  learn,
}: {
  title: string;
  description: string;
  inputs: ReactNode;
  outputs: ReactNode;
  about: ReactNode;
  breadcrumbs: Crumb[];
  learn?: LearnLink;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumbs items={breadcrumbs} />
      <header className="mt-4">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </header>
      <div className="mt-8 grid gap-6 animate-fade-in lg:grid-cols-5">
        <section aria-label="Inputs" className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Inputs
          </div>
          <div className="mt-4 space-y-4">{inputs}</div>
        </section>
        <aside aria-label="Results" className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <BarChart3 className="h-4 w-4" /> Results
          </div>
          <div className="mt-4 space-y-4">{outputs}</div>
        </aside>
      </div>
      <section className="mt-12 prose prose-invert prose-headings:font-display max-w-none text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
        {about}
      </section>
      {learn && <LearnCta {...learn} />}
    </div>
  );
}

export interface LearnLink {
  /** learn.realmarketapi.com article slug, e.g. "position-sizing" */
  article: string;
  articleTitle: string;
  /** learn.realmarketapi.com category slug, e.g. "risk-management" */
  category: string;
  categoryName: string;
}

export function LearnCta({ article, articleTitle, category, categoryName }: LearnLink) {
  const linkCls = "font-medium text-primary hover:underline";
  return (
    <section aria-label="Learn more" className="mt-10 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <BookOpen className="h-4 w-4" /> Keep learning
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Read{" "}
          <a href={withUtm(learnArticle(article), "calculator_cta")} target="_blank" rel="noreferrer noopener" className={linkCls}>
            {articleTitle}
          </a>{" "}
          or browse the{" "}
          <a href={withUtm(learnCategory(category), "calculator_cta")} target="_blank" rel="noreferrer noopener" className={linkCls}>
            {categoryName}
          </a>{" "}
          guides on RealMarketAPI Learn.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Code2 className="h-4 w-4" /> Build with live prices
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Feed calculations like this with real-time forex, gold and crypto prices from RealMarketAPI.{" "}
          <a href={withUtm(REGISTER_URL, "calculator_cta")} target="_blank" rel="noreferrer noopener" className={linkCls}>
            Get a free API key
          </a>{" "}
          or{" "}
          <a href={withUtm(DOCS_URL, "calculator_cta")} target="_blank" rel="noreferrer noopener" className={linkCls}>
            read the docs
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      inputMode="decimal"
      {...props}
      className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
    />
  );
}

export function Result({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold brand-text">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

export const INSTRUMENTS: Record<string, { label: string; pipValuePerLot: number; contractSize: number }> = {
  "EURUSD": { label: "EUR/USD (Forex)", pipValuePerLot: 10, contractSize: 100000 },
  "GBPUSD": { label: "GBP/USD (Forex)", pipValuePerLot: 10, contractSize: 100000 },
  "USDJPY": { label: "USD/JPY (Forex)", pipValuePerLot: 9.1, contractSize: 100000 },
  "XAUUSD": { label: "XAU/USD (Gold)", pipValuePerLot: 10, contractSize: 100 },
  "BTCUSD": { label: "BTC/USD (Crypto)", pipValuePerLot: 1, contractSize: 1 },
  "ETHUSD": { label: "ETH/USD (Crypto)", pipValuePerLot: 1, contractSize: 1 },
  "SPX500": { label: "S&P 500 (Index)", pipValuePerLot: 1, contractSize: 1 },
  "NAS100": { label: "Nasdaq 100 (Index)", pipValuePerLot: 1, contractSize: 1 },
  "WTI": { label: "WTI Crude (Commodity)", pipValuePerLot: 10, contractSize: 1000 },
};

export function fmt(n: number, digits = 2): string {
  if (!isFinite(n) || isNaN(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
}
