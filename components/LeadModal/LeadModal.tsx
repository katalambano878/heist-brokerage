"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./LeadModal.module.css";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LeadModal({ open, onClose }: LeadModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  const finalizeClose = useCallback(() => {
    setClosing(false);
    onClose();
  }, [onClose]);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      finalizeClose();
    }, 300);
  }, [closing, finalizeClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open && !closing && panelRef.current) {
      const focusable = panelRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }
  }, [open, closing]);

  if (typeof window === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div
      className={`${styles.root} ${closing ? styles.rootOut : ""}`}
      role="presentation"
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close dialog"
        onClick={handleClose}
      />
      <div
        className={`${styles.dialog} ${closing ? styles.dialogOut : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            Arrange a private introduction
          </h2>
          <button
            type="button"
            className={styles.close}
            onClick={handleClose}
            aria-label="Close"
          >
            <span aria-hidden className={styles.closeIcon} />
          </button>
        </div>
        <p className={styles.lead}>
          Leave your details and a specialist will reply within one business day
          with next steps tailored to your search or sale.
        </p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          <label className={styles.field}>
            <span className={styles.label}>Full name</span>
            <input className={styles.input} type="text" name="name" required />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input className={styles.input} type="email" name="email" required />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>You are looking to</span>
            <select className={styles.input} name="intent">
              <option value="buy">Purchase a home</option>
              <option value="land">Purchase a land</option>
              <option value="build">Build a house</option>
              <option value="sell">Sell a property</option>
              <option value="rent">Lease a residence</option>
              <option value="invest">Invest with guidance</option>
            </select>
          </label>
          <button type="submit" className={styles.submit}>
            Submit request
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
