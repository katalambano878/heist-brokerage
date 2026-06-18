"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { postJson } from "@/lib/publicApi";
import styles from "./BrochureGate.module.css";

type BrochureGateProps = {
  brochureUrl: string;
  title: string;
  /** Class applied to the trigger so it matches the surrounding buttons. */
  className?: string;
  children: ReactNode;
};

type FormState = { fullName: string; email: string; phone: string };
const initial: FormState = { fullName: "", email: "", phone: "" };

export function BrochureGate({
  brochureUrl,
  title,
  className,
  children,
}: BrochureGateProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "unlocked">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
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
  }, [open, close]);

  const set =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setStatus("submitting");
    try {
      await postJson("/api/v1/leads", {
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: `Brochure request: ${title}`,
        source: "OTHER",
      });
      setStatus("unlocked");
    } catch {
      setStatus("idle");
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const previewSrc = `${brochureUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <>
      <button
        type="button"
        className={`${className ?? ""} ${styles.trigger}`}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>

      {open && typeof window !== "undefined"
        ? createPortal(
            <div
              className={styles.overlay}
              role="presentation"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <div
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-label={`Download the ${title} brochure`}
              >
                <button
                  type="button"
                  className={styles.close}
                  onClick={close}
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                <div className={styles.body}>
                  <div className={styles.previewWrap}>
                    <iframe
                      className={styles.preview}
                      src={previewSrc}
                      title={`${title} brochure preview`}
                    />
                    {status !== "unlocked" ? (
                      <div className={styles.previewVeil} aria-hidden>
                        <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
                          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        <span>Preview — unlock to download</span>
                      </div>
                    ) : null}
                  </div>

                  <div className={styles.side}>
                    {status === "unlocked" ? (
                      <div className={styles.success}>
                        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="10" stroke="var(--color-accent)" strokeWidth="1.5" />
                          <path d="M8 12.5l2.5 2.5L16 9" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h3 className={styles.heading}>You&apos;re all set</h3>
                        <p className={styles.lead}>
                          Thanks{values.fullName ? `, ${values.fullName.split(" ")[0]}` : ""}.
                          Your brochure is ready to download.
                        </p>
                        <a
                          href={brochureUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.downloadBtn}
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
                            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Download {title} brochure
                        </a>
                      </div>
                    ) : (
                      <form className={styles.form} onSubmit={onSubmit} noValidate>
                        <h3 className={styles.heading}>Get the full brochure</h3>
                        <p className={styles.lead}>
                          Tell us where to send it and download {title}&apos;s
                          brochure instantly.
                        </p>

                        <label className={styles.field}>
                          <span className={styles.label}>Full name</span>
                          <input
                            className={styles.input}
                            name="fullName"
                            autoComplete="name"
                            value={values.fullName}
                            onChange={set("fullName")}
                            aria-invalid={errors.fullName ? true : undefined}
                          />
                          {errors.fullName ? (
                            <span className={styles.error}>{errors.fullName}</span>
                          ) : null}
                        </label>

                        <label className={styles.field}>
                          <span className={styles.label}>Email</span>
                          <input
                            className={styles.input}
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={set("email")}
                            aria-invalid={errors.email ? true : undefined}
                          />
                          {errors.email ? (
                            <span className={styles.error}>{errors.email}</span>
                          ) : null}
                        </label>

                        <label className={styles.field}>
                          <span className={styles.label}>
                            Phone <span className={styles.optional}>(optional)</span>
                          </span>
                          <input
                            className={styles.input}
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={values.phone}
                            onChange={set("phone")}
                          />
                        </label>

                        {submitError ? (
                          <p className={styles.error}>{submitError}</p>
                        ) : null}

                        <button
                          type="submit"
                          className={styles.submit}
                          disabled={status === "submitting"}
                        >
                          {status === "submitting"
                            ? "Unlocking…"
                            : "Unlock & download"}
                        </button>
                        <p className={styles.fineprint}>
                          We&apos;ll only use your details to follow up about this
                          development.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
