"use client";

import { useState, type FormEvent } from "react";
import { postForm, postJson } from "@/lib/publicApi";
import { careerOpenings } from "@/lib/data";
import { portfolioProblem } from "@/lib/portfolio";
import styles from "./CareersForm.module.css";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  message: string;
};

export const CAREER_POSITIONS = [
  ...careerOpenings.map((job) => job.title),
  "General Application",
];

type CareersFormProps = {
  /** Pre-selected role; when set the position field is locked. */
  defaultPosition?: string;
  /** Hide the intro heading (e.g. when shown inside a modal that has its own title). */
  hideHeading?: boolean;
};

export function CareersForm({ defaultPosition, hideHeading }: CareersFormProps) {
  const lockPosition = Boolean(defaultPosition);
  const initial: FormState = {
    fullName: "",
    email: "",
    phone: "",
    position: defaultPosition ?? "",
    experience: "",
    portfolio: "",
    message: "",
  };

  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [portraitUrl, setPortraitUrl] = useState("");
  const [portraitPreview, setPortraitPreview] = useState("");
  const [portraitError, setPortraitError] = useState<string | null>(null);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const [cvName, setCvName] = useState("");
  const [uploadingCv, setUploadingCv] = useState(false);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (values.phone.replace(/\D/g, "").length < 9) {
      next.phone = "Enter a valid phone number.";
    }
    if (!values.position) next.position = "Please select a position.";
    if (!values.experience) next.experience = "Years of experience is required.";
    if (uploadingPortrait) {
      setPortraitError("Wait for the photo to finish uploading.");
    } else if (!portraitUrl) {
      setPortraitError("A portrait photo is required.");
    } else {
      setPortraitError(null);
    }
    const cvProblem = uploadingCv
      ? "Wait for the CV to finish uploading."
      : portfolioProblem(values.portfolio);
    if (cvProblem) next.portfolio = cvProblem;
    if (values.message.trim().length < 12) {
      next.message = "Tell us a little about yourself (at least 12 characters).";
    }
    setErrors(next);
    return (
      Object.keys(next).length === 0 &&
      Boolean(portraitUrl) &&
      !uploadingPortrait &&
      !uploadingCv
    );
  };

  const onCv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const name = file.name.toLowerCase();
    if (!/\.(pdf|docx?)$/.test(name)) {
      setErrors((current) => ({
        ...current,
        portfolio: "Upload a PDF or Word file.",
      }));
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        portfolio: "CV must be under 12 MB.",
      }));
      return;
    }
    setUploadingCv(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const uploaded = await postForm<{ url: string }>("/api/v1/uploads/cv", body);
      setCvName(file.name);
      setValues((current) => ({ ...current, portfolio: uploaded.url }));
      setErrors((current) => ({ ...current, portfolio: undefined }));
    } catch (err) {
      setCvName("");
      setValues((current) => ({ ...current, portfolio: "" }));
      setErrors((current) => ({
        ...current,
        portfolio: err instanceof Error ? err.message : "CV upload failed.",
      }));
    } finally {
      setUploadingCv(false);
    }
  };

  const onPortrait = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      setPortraitError("Use a JPEG, PNG, or WebP photo.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setPortraitError("Photo must be under 8 MB.");
      return;
    }
    setPortraitError(null);
    setPortraitPreview(URL.createObjectURL(file));
    setUploadingPortrait(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const uploaded = await postForm<{ url: string }>("/api/v1/uploads/portrait", body);
      setPortraitUrl(uploaded.url);
    } catch (err) {
      setPortraitUrl("");
      setPortraitError(err instanceof Error ? err.message : "Photo upload failed.");
    } finally {
      setUploadingPortrait(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setStatus("submitting");
    try {
      await postJson("/api/v1/applications", {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        position: values.position,
        experience: values.experience,
        portfolio: values.portfolio.trim(),
        portraitUrl,
        message: values.message.trim(),
      });
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setSubmitError(
        err instanceof Error
          ? "We couldn't submit your application. Please try again or email us directly."
          : "Submission failed.",
      );
    }
  };

  if (status === "done") {
    return (
      <div className={styles.card}>
        <div className={styles.success} role="status">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="var(--color-accent)" strokeWidth="1.5" />
            <path
              d="M8 12.5l2.5 2.5L16 9"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className={styles.successTitle}>Application Received</h3>
          <p className={styles.successText}>
            Thank you for applying{values.position ? ` for ${values.position}` : ""}.
            Our team will review your application and reach out if there&apos;s a
            fit. We keep promising candidates in mind for future openings too.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate>
      {!hideHeading && (
        <>
          <h3 className={styles.formTitle}>
            {lockPosition ? `Apply: ${defaultPosition}` : "Apply to join Heist"}
          </h3>
          <p className={styles.formLead}>
            Complete the form below and tell us why you&apos;d be a great fit.
            Fields marked <span className={styles.required}>*</span> are required.
          </p>
        </>
      )}

      <div className={`${styles.field} ${styles.fieldFull}`} style={{ marginBottom: "1rem" }}>
        <span className={styles.label}>
          Portrait photo <span className={styles.required}>*</span>
        </span>
        <div className={styles.portraitRow}>
          <div className={styles.portraitFrame}>
            {portraitPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portraitPreview} alt="Portrait preview" />
            ) : (
              <span className={styles.portraitHint}>3:4 portrait</span>
            )}
          </div>
          <div className={styles.portraitCopy}>
            <p>Upload a clear head-and-shoulders photo. A portrait frame works best.</p>
            <label className={styles.portraitBtn}>
              {uploadingPortrait ? "Uploading…" : portraitUrl ? "Replace photo" : "Choose photo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={onPortrait}
                disabled={uploadingPortrait}
              />
            </label>
          </div>
        </div>
        {portraitError ? <span className={styles.error}>{portraitError}</span> : null}
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>
            Full Name <span className={styles.required}>*</span>
          </span>
          <input
            className={styles.input}
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={set("fullName")}
            aria-invalid={errors.fullName ? true : undefined}
          />
          {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            Position <span className={styles.required}>*</span>
          </span>
          {lockPosition ? (
            <input
              className={`${styles.input} ${styles.inputLocked}`}
              name="position"
              value={values.position}
              readOnly
            />
          ) : (
            <select
              className={styles.input}
              name="position"
              value={values.position}
              onChange={set("position")}
              aria-invalid={errors.position ? true : undefined}
            >
              <option value="">Select a role</option>
              {CAREER_POSITIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          )}
          {errors.position && <span className={styles.error}>{errors.position}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </span>
          <input
            className={styles.input}
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            Phone Number <span className={styles.required}>*</span>
          </span>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={errors.phone ? true : undefined}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            Years of Experience <span className={styles.required}>*</span>
          </span>
          <select
            className={styles.input}
            name="experience"
            value={values.experience}
            onChange={set("experience")}
            aria-invalid={errors.experience ? true : undefined}
          >
            <option value="">Select</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1 – 3 years">1 – 3 years</option>
            <option value="3 – 5 years">3 – 5 years</option>
            <option value="5 – 10 years">5 – 10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
          {errors.experience && <span className={styles.error}>{errors.experience}</span>}
        </label>

        <label className={`${styles.field} ${styles.fieldFull}`}>
          <span className={styles.label}>
            CV / Portfolio <span className={styles.required}>*</span>
          </span>
          <input
            className={styles.input}
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onCv}
          />
          {cvName ? <span className={styles.hint}>Uploaded {cvName}</span> : null}
          <input
            className={styles.input}
            type="url"
            name="portfolio"
            placeholder="Or a Google Drive or PDF link"
            value={cvName ? "" : values.portfolio}
            onChange={(e) => {
              setCvName("");
              set("portfolio")(e);
            }}
            aria-invalid={errors.portfolio ? true : undefined}
          />
          <span className={styles.hint}>PDF, Word, or a Google Drive link. LinkedIn and website links are not accepted.</span>
          {errors.portfolio && <span className={styles.error}>{errors.portfolio}</span>}
        </label>

        <label className={`${styles.field} ${styles.fieldFull}`}>
          <span className={styles.label}>
            Why do you want to join Heist?{" "}
            <span className={styles.required}>*</span>
          </span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="message"
            rows={5}
            value={values.message}
            onChange={set("message")}
            aria-invalid={errors.message ? true : undefined}
          />
          {errors.message && <span className={styles.error}>{errors.message}</span>}
        </label>
      </div>

      {submitError && <p className={styles.error} style={{ marginBottom: "0.75rem" }}>{submitError}</p>}

      <button type="submit" className={styles.submit} disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
