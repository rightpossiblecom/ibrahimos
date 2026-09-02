import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatNgn } from "@/lib/format-currency";

export const metadata: Metadata = {
  title: "Market",
};

const prices = [
  { crop: "Maize", market: "Kaduna Central", price: 42000, unit: "100kg bag", live: true },
  { crop: "Rice", market: "Kano Dawanau", price: 78000, unit: "100kg bag", live: false },
  { crop: "Cassava", market: "Ibadan Bodija", price: 18000, unit: "tonne", live: false },
  { crop: "Tomato", market: "Lagos Mile 12", price: 35000, unit: "basket", live: false },
  { crop: "Pepper", market: "Abuja Garki", price: 28000, unit: "basket", live: false },
  { crop: "Yam", market: "Enugu Ogbete", price: 1200, unit: "tuber avg", live: false },
  { crop: "Beans", market: "Sokoto", price: 65000, unit: "100kg bag", live: false },
];

export default function MarketPage() {
  const incident = siteConfig.demoIncident;

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="ops-eyebrow">Market</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Prices</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Kaduna maize is the crop on {incident.field.name}. {formatNgn(incident.responseCost)} is the response against that bag price.
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-bg-elevated">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Crop</th>
              <th className="px-4 py-3 font-semibold">Market</th>
              <th className="px-4 py-3 font-semibold">Unit</th>
              <th className="px-4 py-3 font-semibold">Price</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row) => (
              <tr
                key={row.crop}
                className={
                  row.live
                    ? "border-b border-line bg-accent/10 last:border-0"
                    : "border-b border-line last:border-0"
                }
              >
                <td className="px-4 py-3 font-medium text-ink">
                  {row.crop}
                  {row.live ? " · live case" : ""}
                </td>
                <td className="px-4 py-3 text-ink-muted">{row.market}</td>
                <td className="px-4 py-3 text-ink-muted">{row.unit}</td>
                <td className="px-4 py-3 font-semibold text-accent">{formatNgn(row.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
