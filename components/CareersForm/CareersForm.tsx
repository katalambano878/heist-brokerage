"use client";

import { useState, type FormEvent } from "react";
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

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  portfolio: "",
  message: "",
};

const positions = [
  "Real Estate Sales Agent",
  "Marketing & Social Media Coordinator",
  "Construction Site Supervisor",
  "Client Relations Officer",
  "General Application",
];

export function CareersForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

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
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    if (!values.position) next.position = "Please select a position.";
    if (values.message.trim().length < 12) {
      next.message = "Tell us a little about yourself (at least 12 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
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
            Thank you for your interest in joining Heist. Our team will review
            your application and reach out if there&apos;s a fit. We keep
            promising candidates in mind for future openings too.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate>
      <h3 className={styles.formTitle}>Apply to join Heist</h3>
      <p className={styles.formLead}>
        Complete the form below and tell us why you&apos;d be a great fit. All
        fields marked with <span className={styles.required}>*</span> are
        required.
      </p>

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
          <select
            className={styles.input}
            name="position"
            value={values.position}
            onChange={set("position")}
            aria-invalid={errors.position ? true : undefined}
          >
            <option value="">Select a role</option>
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
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
          <span className={styles.label}>Years of Experience</span>
          <select
            className={styles.input}
            name="experience"
            value={values.experience}
            onChange={set("experience")}
          >
            <option value="">Select</option>
            <option value="0-1">Less than 1 year</option>
            <option value="1-3">1 – 3 years</option>
            <option value="3-5">3 – 5 years</option>
            <option value="5-10">5 – 10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>CV / Portfolio Link</span>
          <input
            className={styles.input}
            type="url"
            name="portfolio"
            placeholder="https://… (LinkedIn, Drive, or website)"
            value={values.portfolio}
            onChange={set("portfolio")}
          />
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

      <button type="submit" className={styles.submit}>
        Submit Application
      </button>
    </form>
  );
}
