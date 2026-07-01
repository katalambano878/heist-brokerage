import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { PageHero } from "@/components/PageHero/PageHero";
import { blogPosts } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog & Real Estate Updates",
  description:
    "Market insights, buying guides and company updates from Heist Brokerage & Construction — helping you make smarter property decisions in Ghana.",
  openGraph: {
    title: "Blog & Real Estate Updates | Heist Brokerage & Construction",
    description:
      "Market insights, buying guides and updates from the Heist team.",
    url: "/blog",
  },
};

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

export default function BlogPage() {
  const posts = blogPosts;

  return (
    <div className={styles.page}>
      <PageHero
        kicker="Journal"
        title="Real estate updates, insights & guides"
        lead="Market movements, ownership guides and news from the Heist team — written to help you buy, build and invest with confidence."
        headingId="blog-hero"
        imageSrc="/images/heist-mentality.png"
        imageAlt="The Heist team at work"
      />

      <section className={styles.listSection} aria-label="Blog articles">
        <Container>
          {posts.length === 0 ? (
            <p className={styles.empty}>
              New articles are on the way — check back soon.
            </p>
          ) : (
            <div className={styles.grid}>
              {posts.map((post, i) => (
                <ScrollReveal
                  key={post.slug}
                  as="article"
                  variant="fadeUp"
                  staggerIndex={i}
                  className={styles.card}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.cardMedia}
                    aria-label={post.title}
                  >
                    <Image
                      src={post.coverImage || "/images/heist-mentality.png"}
                      alt={post.coverAlt || post.title}
                      width={800}
                      height={520}
                      className={styles.cardImage}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                    {post.category ? (
                      <span className={styles.cardCategory}>{post.category}</span>
                    ) : null}
                  </Link>
                  <div className={styles.cardBody}>
                    {post.publishedAt ? (
                      <time className={styles.cardDate} dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    ) : null}
                    <h2 className={styles.cardTitle}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      Read article
                      <span aria-hidden> →</span>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
