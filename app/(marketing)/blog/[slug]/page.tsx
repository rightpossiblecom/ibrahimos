import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return siteConfig.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = siteConfig.blogPosts.find((item) => item.slug === slug);
  return { title: post?.title ?? "Blog" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = siteConfig.blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {post.date}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
        {post.title}
      </h1>
      <p className="mt-8 text-base leading-relaxed text-ink-muted">{post.body}</p>
      <Link
        href="/blog"
        className="mt-10 inline-block text-sm font-medium text-accent"
      >
        ← All notes
      </Link>
    </main>
  );
}
