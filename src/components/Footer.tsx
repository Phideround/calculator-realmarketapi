import { Link } from "@tanstack/react-router";
import { Mail, Globe, Twitter, Facebook, Instagram } from "lucide-react";
import logo from "../assets/logo.png.asset.json";

function BskyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 10.8c-1.09-2.1-4.05-5.98-6.8-7.9C2.82.68 1.17.94.51 1.9c-.67.98-.35 2.3.83 3.37l5.63 4.9c.58.5.87 1.16.8 1.82-.07.66-.5 1.24-1.15 1.58l-2.08 1.1a.93.93 0 0 0 .4 1.77l4.6-.6c1.34-.18 2.68.17 3.7.94l.16.12.16-.12c1.02-.77 2.36-1.12 3.7-.94l4.6.6a.93.93 0 0 0 .4-1.77l-2.08-1.1a1.87 1.87 0 0 1-1.15-1.58c-.07-.66.22-1.32.8-1.82l5.63-4.9c1.18-1.07 1.5-2.4.83-3.37-.66-.96-2.31-1.22-4.69-.01-2.75 1.92-5.71 5.8-6.8 7.9z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.88-6.43 2.525-8.483C5.845 1.205 8.6.024 12.18 0h.024c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-6.083-8.32-6.067-2.868.022-5.236.936-6.846 2.635-1.526 1.607-2.374 3.93-2.386 6.74v.009c.012 2.816.84 5.14 2.386 6.747 1.61 1.7 3.978 2.613 6.846 2.635 4.46.017 7.33-2.22 8.49-6.414l1.94.543c-.68 2.41-1.89 4.38-3.6 5.86-1.99 1.71-4.51 2.64-7.3 2.66zM18.823 14.76c0-2.875-1.93-5.02-5.39-6.03 1.12-.5 1.87-1.39 1.87-2.61 0-2.19-2.02-3.5-4.51-3.5-1.53 0-2.85.52-3.63 1.41l1.2 1.16c.48-.57 1.22-.92 2.18-.92 1.59 0 2.65.77 2.65 1.86 0 .94-.66 1.5-2.04 1.66l-2.14.23c-2.86.31-4.48 1.72-4.48 3.85 0 2.3 1.88 3.82 4.58 3.82 1.91 0 3.46-.64 4.38-1.74l.98.84c-1.22 1.43-3.25 2.27-5.71 2.27-3.47 0-6.02-2.03-6.02-5.02 0-2.56 1.55-4.23 4.33-4.58l2.15-.24c.83-.1 1.25-.43 1.25-.95 0-.73-.74-1.23-1.96-1.23-.92 0-1.72.34-2.15.92l-1.28-1.03c.76-1.02 2.15-1.66 3.82-1.66 2.85 0 4.82 1.42 4.82 3.5 0 1.3-.83 2.29-2.28 2.85 2.69.89 4.2 2.74 4.2 5.15 0 3.26-2.78 5.48-6.47 5.48-2.74 0-4.92-1.15-6.07-3.04l1.48-1.03c.88 1.4 2.57 2.3 4.59 2.3 2.75 0 4.63-1.54 4.63-3.85z" />
    </svg>
  );
}

const socials = [
  { href: "https://x.com/realmarketapi", label: "X", Icon: Twitter },
  { href: "https://www.facebook.com/realmarketapi", label: "Facebook", Icon: Facebook },
  { href: "https://bsky.app/profile/realmarketapi.bsky.social", label: "Bluesky", Icon: BskyIcon },
  { href: "https://www.instagram.com/realmarketapi2026/", label: "Instagram", Icon: Instagram },
  { href: "https://www.threads.com/@realmarketapi2026", label: "Threads", Icon: ThreadsIcon },
];

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
          <div className="mt-5 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <s.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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
            <li><a href="https://realmarketapi.com" className="inline-flex items-center gap-1.5 hover:text-foreground"><Globe className="h-3.5 w-3.5" /> realmarketapi.com</a></li>
            <li><a href="https://learn.realmarketapi.com" className="hover:text-foreground">Learn</a></li>
            <li><a href="mailto:admin@realmarketapi.com" className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> admin@realmarketapi.com</a></li>
            <li><a href="mailto:support@realmarketapi.com" className="inline-flex items-center gap-1.5 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> support@realmarketapi.com</a></li>
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
