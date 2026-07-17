"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import styles from "./PropertyGallery.module.css";

export type GalleryImage = {
  src: string;
  alt: string;
};

type PropertyGalleryProps = {
  images: GalleryImage[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, prev, next]);

  if (images.length === 0) return null;

  const main = images[0];
  const thumbs = images.slice(1, 3);
  const more = images.slice(3);

  const cellButton = (img: GalleryImage, index: number, sizes: string) => (
    <button
      type="button"
      className={styles.cellButton}
      onClick={() => setOpenIndex(index)}
      aria-label={`View photo ${index + 1} of ${images.length} in full screen`}
    >
      <Image
        src={img.src}
        alt={img.alt || `${title} photo ${index + 1}`}
        width={1200}
        height={800}
        className={styles.galleryImage}
        sizes={sizes}
        priority={index === 0}
      />
      <span className={styles.zoomHint} aria-hidden>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M16.5 16.5L21 21M11 8v6M8 11h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );

  const active = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className={styles.gallery}>
        <ScrollReveal variant="scale" className={styles.galleryMain}>
          {cellButton(main, 0, "(max-width: 980px) 100vw, 66vw")}
        </ScrollReveal>
        {thumbs.length > 0 ? (
          <div className={styles.galleryThumbs}>
            {thumbs.map((img, i) => (
              <ScrollReveal
                key={`${img.src}-${i}`}
                variant="fadeUp"
                staggerIndex={i}
                className={styles.thumb}
              >
                {cellButton(img, i + 1, "(max-width: 980px) 50vw, 22vw")}
              </ScrollReveal>
            ))}
          </div>
        ) : null}
      </div>

      {more.length > 0 ? (
        <div className={styles.moreGrid} aria-label="More photos">
          {more.map((img, i) => (
            <ScrollReveal
              key={`${img.src}-${i}`}
              variant="fadeUp"
              staggerIndex={i % 4}
              className={styles.moreCell}
            >
              {cellButton(img, i + 3, "(max-width: 760px) 50vw, 25vw")}
            </ScrollReveal>
          ))}
        </div>
      ) : null}

      {mounted && active
        ? createPortal(
            <div
              className={styles.lightbox}
              role="dialog"
              aria-modal="true"
              aria-label={`${title} photo viewer`}
              onClick={close}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={close}
                aria-label="Close photo viewer"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {images.length > 1 ? (
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous photo"
                >
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                    <path
                      d="M15 5l-7 7 7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : null}

              <figure
                className={styles.lightboxFigure}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Plain img: the lightbox needs natural aspect ratio at full viewport size */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.src}
                  alt={active.alt || `${title} photo ${(openIndex ?? 0) + 1}`}
                  className={styles.lightboxImage}
                />
                <figcaption className={styles.lightboxCaption}>
                  {(openIndex ?? 0) + 1} / {images.length}
                </figcaption>
              </figure>

              {images.length > 1 ? (
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next photo"
                >
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
