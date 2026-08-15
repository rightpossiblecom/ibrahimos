import type { Metadata } from "next";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Season notes" };

const notes = [
  {
    title: "August humidity and maize lesions",
    place: "Kaduna · Kano",
    body: "Wet nights after a dry spell are when northern blight jumps rows. Scout the lower leaves at first light, not after the market run. If lesions are long and grey-brown, treat before Thursday rain — waiting for an extension visit usually means the stand is already gone.",
  },
  {
    title: "When the Lagos maize premium is real",
    place: "Enugu · Lagos",
    body: "A ₦4,000 bag gap looks like money until you price diesel and the two-day wait at the park. If the spread after transport is thinner than a full tank, hold. Cooperatives that sold on the first aggregator offer in July left more on the floor than they saved in haste.",
  },
  {
    title: "Phosphorus on tomato after a sandy rain",
    place: "Oyo",
    body: "Purple undersides and stalled fruit set after a hard rain usually mean the dressing washed. Split SSP, mulch the bed, and do not chase it with more nitrogen. Recheck the same plants in ten days — not the next village rumour.",
  },
];

export default function SeasonNotesPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Season notes"
          title="What the weather is doing to the crop"
          body="Field notes from Kaduna, Kano, Oyo, and Enugu — blight, markets, and soil. Not a product tour."
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <ul className="space-y-10">
            {notes.map((note) => (
              <li key={note.title} className="border-b border-line pb-10 last:border-0">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                  {note.place}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {note.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {note.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-ink-muted">
            Longer pieces live in the{" "}
            <Link href="/blog" className="font-medium text-accent hover:underline">
              journal
            </Link>
            .
          </p>
        </section>
      </main>
      <MarketingCtaBand
        title="Bring a leaf from your own row"
        body="Log in when you want a check on the plant in front of you."
      />
    </>
  );
}
