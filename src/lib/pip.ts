export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "NZD" | "CAD" | "CHF";

export const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "JPY", "AUD", "NZD", "CAD", "CHF"];

/** Approximate USD value of one unit of each currency; only used to pre-fill editable inputs. */
export const APPROX_USD_PER_UNIT: Record<Currency, number> = {
  USD: 1, EUR: 1.08, GBP: 1.27, JPY: 0.0067, AUD: 0.66, NZD: 0.6, CAD: 0.73, CHF: 1.13,
};

/**
 * Pip conventions for pip-based calculators. Values are consistent with INSTRUMENTS in components/CalculatorShell:
 * standard forex lot = 100,000 units, pip 0.0001 (0.01 for JPY pairs);
 * XAUUSD lot = 100 oz with a 0.1 pip ($10 per pip per lot, as used by the position size calculator).
 */
export const PIP_PAIRS: Record<string, { label: string; base: Currency | "XAU"; quote: Currency; pipSize: number; contractSize: number; price: number }> = {
  EURUSD: { label: "EUR/USD", base: "EUR", quote: "USD", pipSize: 0.0001, contractSize: 100000, price: 1.08 },
  GBPUSD: { label: "GBP/USD", base: "GBP", quote: "USD", pipSize: 0.0001, contractSize: 100000, price: 1.27 },
  AUDUSD: { label: "AUD/USD", base: "AUD", quote: "USD", pipSize: 0.0001, contractSize: 100000, price: 0.66 },
  NZDUSD: { label: "NZD/USD", base: "NZD", quote: "USD", pipSize: 0.0001, contractSize: 100000, price: 0.6 },
  USDJPY: { label: "USD/JPY", base: "USD", quote: "JPY", pipSize: 0.01, contractSize: 100000, price: 150 },
  USDCHF: { label: "USD/CHF", base: "USD", quote: "CHF", pipSize: 0.0001, contractSize: 100000, price: 0.88 },
  USDCAD: { label: "USD/CAD", base: "USD", quote: "CAD", pipSize: 0.0001, contractSize: 100000, price: 1.37 },
  EURGBP: { label: "EUR/GBP", base: "EUR", quote: "GBP", pipSize: 0.0001, contractSize: 100000, price: 0.85 },
  EURJPY: { label: "EUR/JPY", base: "EUR", quote: "JPY", pipSize: 0.01, contractSize: 100000, price: 162 },
  GBPJPY: { label: "GBP/JPY", base: "GBP", quote: "JPY", pipSize: 0.01, contractSize: 100000, price: 190 },
  XAUUSD: { label: "XAU/USD (Gold)", base: "XAU", quote: "USD", pipSize: 0.1, contractSize: 100, price: 2400 },
};
