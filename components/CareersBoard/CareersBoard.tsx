"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { CareersForm } from "@/components/CareersForm/CareersForm";
import styles from "@/app/careers/page.module.css";

export type Opening = {
  title: string;
  type: string;
  location: string;
  desc: string;
};

type CareersBoardProps = {
  openings: Opening[];
};

export function CareersBoard({ openings }: CareersBoardProps) {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setActiveRole(null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeRole) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeRole, close]);

  return (
    <>
      <div className={styles.jobList}>
        {openings.map((job, i) => (
          <ScrollReveal
            key={job.title}
            variant="fadeUp"
            staggerIndex={i}
            className={styles.jobCard}
          >
            <div className={styles.jobHeader}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <div className={styles.jobMeta}>
                <span className={styles.jobBadge}>{job.type}</span>
                <span className={styles.jobLocation}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
                    <path
                      d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  {job.location}
                </span>
              </div>
            </div>
            <p className={styles.jobDesc}>{job.desc}</p>
            <button
              type="button"
              className={styles.applyBtn}
              onClick={() => setActiveRole(job.title)}
            >
              Apply Now
            </button>
          </ScrollReveal>
        ))}
      </div>

      {mounted && activeRole
        ? createPortal(
            <div
              className={styles.modalOverlay}
              role="presentation"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <div
                className={styles.modalPanel}
                role="dialog"
                aria-modal="true"
                aria-label={`Apply for ${activeRole}`}
              >
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={close}
                  aria-label="Close application form"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <CareersForm defaultPosition={activeRole} />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
