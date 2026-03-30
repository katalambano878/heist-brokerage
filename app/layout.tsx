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

const siteUrl = "https://luxuryestate.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luxury Estate",
    template: "%s | Luxury Estate",
  },
  description:
    "A modern real estate platform connecting buyers, sellers, and renters with trusted property listings and seamless transactions.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Luxury Estate",
    title: "Luxury Estate",
    description:
      "A modern real estate platform connecting buyers, sellers, and renters with trusted property listings and seamless transactions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Estate",
    description:
      "A modern real estate platform connecting buyers, sellers, and renters with trusted property listings and seamless transactions.",
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
