import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={logo.url} alt="RealMarketAPI" width={32} height={32} className="h-8 w-8" />
            <span className="font-display font-semibold">Calculators.RealMarketAPI</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Professional Trading Tools Powered by RealMarketAPI. Free forever. No registration required.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Calculators</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/position-size" className="hover:text-foreground">Position Size</Link></li>
            <li><Link to="/risk" className="hover:text-foreground">Risk</Link></li>
            <li><Link to="/margin" className="hover:text-foreground">Margin</Link></li>
            <li><Link to="/drawdown" className="hover:text-foreground">Drawdown</Link></li>
            <li><Link to="/profit" className="hover:text-foreground">Profit</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">RealMarketAPI</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="https://realmarketapi.com" className="hover:text-foreground">Market Data API</a></li>
            <li><a href="https://learn.realmarketapi.com" className="hover:text-foreground">Learn</a></li>
            <li><a href="/sitemap.xml" className="hover:text-foreground">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RealMarketAPI. All calculators provided as-is for educational purposes.
      </div>
    </footer>
  );
}
