import type { Metadata } from "next";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/MarketingCtaBand";
import { MarketingPageHero } from "@/components/MarketingPageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <main>
        <MarketingPageHero
          eyebrow="Blog"
          title="Season notes from the field"
          body="Blight timing, market spreads, and offline habits — written for people who actually stand in the row."
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <ul className="space-y-8">
            {siteConfig.blogPosts.map((post) => (
              <li key={post.slug} className="border-b border-line pb-8 last:border-0">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                  {post.date}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-accent"
                >
                  Read →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <MarketingCtaBand
        title="Put the notes to work"
        body="Log in and run the check on your own crop."
      />
    </>
  );
}
