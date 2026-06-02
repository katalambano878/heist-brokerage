import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { PageFade } from "@/components/PageFade/PageFade";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://www.heistbrokerage.com";

const SITE_DESCRIPTION =
  "Heist Brokerage & Construction delivers strategic real estate and construction solutions for homeowners, investors, and visionaries — precision, trust, and premium execution at every stage.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    template: "%s | Heist Brokerage & Construction",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Heist Brokerage & Construction",
    title: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Heist Brokerage & Construction | Real Estate, Reimagined.",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={styles.shell}>
        <a href="#main-content" className={styles.skip}>
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className={styles.main}>
          <PageFade>{children}</PageFade>
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
