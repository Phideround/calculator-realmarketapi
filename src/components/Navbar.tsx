import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png.asset.json";

const links = [
  { to: "/position-size", label: "Position Size" },
  { to: "/risk", label: "Risk" },
  { to: "/margin", label: "Margin" },
  { to: "/drawdown", label: "Drawdown" },
  { to: "/profit", label: "Profit" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo.url} alt="RealMarketAPI" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-base font-semibold tracking-tight">
            Calculators<span className="text-muted-foreground">.RealMarketAPI</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a
          href="https://realmarketapi.com"
          target="_blank"
          rel="noreferrer noopener"
          className="hidden rounded-md brand-gradient px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 sm:inline-flex"
        >
          Get RealMarketAPI
        </a>
      </nav>
    </header>
  );
}
