import type { Metadata } from "next";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "The farm" };

export default function TheFarmPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="The farm"
          title="Behind the Yoruba Chief Palace, Gwako"
          body="Ibrahim's Agricultural Enterprise sits in Gwagwalada — plots, stores, and the road into Abuja. This is the ground the company is named for."
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-8 text-base leading-relaxed text-ink-muted">
          <p>
            The address is 53, Behind Yoruba Chief Palace Gwako, Gwagwalada, FCT.
            You smell woodsmoke and wet earth after a night rain. The palace wall
            is on one side; the plots run back toward the track that takes
            produce toward the junction.
          </p>
          <p>
            Work here is maize, vegetables, and the books that never quite kept
            up with the season. That gap — late disease calls, missing records,
            prices heard second-hand — is why the enterprise exists. The farm
            is not a showroom. It is the place the advice has to survive.
          </p>
          <p>
            Visitors come for the land first. The product is how we keep the
            same notes when we are not standing in the row.
          </p>
          <p className="text-sm">
            {siteConfig.legalEntity} · CAC {siteConfig.cacNumber} ·{" "}
            {siteConfig.natureOfBusiness}
          </p>
        </section>
      </main>
      <MarketingCtaBand
        title="Come for the farm. Stay for the season."
        body="Write hello@ibrahimos.top, or log in if you already keep fields with us."
      />
    </>
  );
}
