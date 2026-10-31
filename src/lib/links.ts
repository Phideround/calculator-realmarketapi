// Outbound links to the RealMarketAPI family of sites, tagged with UTM params
// so referrals from the calculators can be attributed.

export const SITE_URL = "https://realmarketapi.com";
export const REGISTER_URL = "https://realmarketapi.com/register";
export const DOCS_URL = "https://realmarketapi.com/docs";
export const LEARN_URL = "https://learn.realmarketapi.com";
export const GAME_URL = "https://game.realmarketapi.com";

export type UtmPlacement =
  | "navbar"
  | "footer"
  | "home_hero"
  | "home_faq"
  | "home_cta"
  | "calculator_cta";

export function withUtm(url: string, campaign: UtmPlacement): string {
  const u = new URL(url);
  u.searchParams.set("utm_source", "calculators");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}

export const learnArticle = (slug: string) => `${LEARN_URL}/article/${slug}`;
export const learnCategory = (slug: string) => `${LEARN_URL}/category/${slug}`;
