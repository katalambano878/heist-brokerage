import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container/Container";
import { blogPosts, getPostBySlug } from "@/lib/data";
import styles from "./page.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Heist Brokerage & Construction`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      type: "article",
    },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link href="/blog" className={styles.back}>
            <span aria-hidden>←</span> All articles
          </Link>
          {post.category ? (
            <span className={styles.category}>{post.category}</span>
          ) : null}
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            {post.author ? <span>{post.author}</span> : null}
            {post.author && post.publishedAt ? (
              <span className={styles.dot} aria-hidden>
                ·
              </span>
            ) : null}
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
          </div>
        </Container>
      </header>

      {post.coverImage ? (
        <Container className={styles.coverWrap}>
          <Image
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            width={1400}
            height={840}
            className={styles.cover}
            sizes="(max-width: 900px) 100vw, 900px"
            priority
          />
        </Container>
      ) : null}

      <Container className={styles.bodyWrap}>
        <div className={styles.body}>
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {post.tags.length > 0 ? (
          <ul className={styles.tags} aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className={styles.tag}>
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready to make your move?</h2>
          <p className={styles.ctaLead}>
            Talk to a Heist specialist about buying, building or investing.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Book a Strategy Call
          </Link>
        </div>
      </Container>

      {related.length > 0 ? (
        <section className={styles.related} aria-label="More articles">
          <Container>
            <h2 className={styles.relatedTitle}>More from the journal</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className={styles.relatedCard}
                >
                  <Image
                    src={r.coverImage || "/images/heist-mentality.png"}
                    alt={r.coverAlt || r.title}
                    width={600}
                    height={400}
                    className={styles.relatedImage}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                  <span className={styles.relatedCardTitle}>{r.title}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
