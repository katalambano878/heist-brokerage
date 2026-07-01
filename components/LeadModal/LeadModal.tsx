"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { postJson } from "@/lib/publicApi";
import styles from "./LeadModal.module.css";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
};

const intentLabels: Record<string, string> = {
  buy: "Purchase a home",
  land: "Purchase a land",
  build: "Build a house",
  sell: "Sell a property",
  rent: "Lease a residence",
  invest: "Invest with guidance",
  "joint-venture": "Joint Venture",
};

export function LeadModal({ open, onClose }: LeadModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("buy");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const intentLabel = intentLabels[intent] ?? intent;
      await postJson("/api/v1/leads", {
        name: name.trim(),
        email: email.trim(),
        source: "LEAD_MODAL",
        message: `Book a strategy call — looking to: ${intentLabel}`,
      });
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

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
    setName("");
    setEmail("");
    setIntent("buy");
    setStatus("idle");
    setError(null);
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
        {status === "done" ? (
          <p className={styles.lead} role="status">
            Thank you, {name.split(" ")[0] || "there"}. Your request has been
            received — a specialist will reply within one business day.
          </p>
        ) : (
          <>
            <p className={styles.lead}>
              Leave your details and a specialist will reply within one business
              day with next steps tailored to your search or sale.
            </p>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <label className={styles.field}>
                <span className={styles.label}>Full name</span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>You are looking to</span>
                <select
                  className={styles.input}
                  name="intent"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                >
                  <option value="buy">Purchase a home</option>
                  <option value="land">Purchase a land</option>
                  <option value="build">Build a house</option>
                  <option value="sell">Sell a property</option>
                  <option value="rent">Lease a residence</option>
                  <option value="invest">Invest with guidance</option>
                  <option value="joint-venture">Joint Venture</option>
                </select>
              </label>
              {error ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Submit request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
