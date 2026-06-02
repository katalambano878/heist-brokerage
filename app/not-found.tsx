import Link from "next/link";
import { Container } from "@/components/Container/Container";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Container narrow className={styles.inner}>
        <p className={styles.kicker}>404</p>
        <h1 className={styles.title}>This page made a different move</h1>
        <p className={styles.text}>
          The page you requested may have moved, or the link may be incomplete.
          Use the navigation above or head back to the home page.
        </p>
        <Link href="/" className={styles.link}>
          Return home
        </Link>
      </Container>
    </div>
  );
}
