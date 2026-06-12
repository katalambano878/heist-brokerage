"use client";

import { useState, type FormEvent } from "react";
import styles from "./SaveBuyForm.module.css";

type FormState = {
  fullName: string;
  gender: string;
  nationality: string;
  phone: string;
  whatsapp: string;
  email: string;
  incomeRange: string;
};

const initial: FormState = {
  fullName: "",
  gender: "",
  nationality: "",
  phone: "",
  whatsapp: "",
  email: "",
  incomeRange: "",
};

export function SaveBuyForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.gender) next.gender = "Please select your gender.";
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
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
          <h3 className={styles.successTitle}>Registration Received</h3>
          <p className={styles.successText}>
            Thank you for registering for our Save &amp; Buy Program. A member
            of our team will be in touch within 24 hours to discuss next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate>
      <h3 className={styles.formTitle}>Save &amp; Buy Registration</h3>
      <p className={styles.formLead}>
        Complete the form below to begin your flexible ownership journey.
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
            Gender <span className={styles.required}>*</span>
          </span>
          <select
            className={styles.input}
            name="gender"
            value={values.gender}
            onChange={set("gender")}
            aria-invalid={errors.gender ? true : undefined}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className={styles.error}>{errors.gender}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Nationality</span>
          <input
            className={styles.input}
            name="nationality"
            value={values.nationality}
            onChange={set("nationality")}
          />
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
          <span className={styles.label}>WhatsApp Number</span>
          <input
            className={styles.input}
            type="tel"
            name="whatsapp"
            value={values.whatsapp}
            onChange={set("whatsapp")}
          />
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

        <label className={`${styles.field} ${styles.fieldFull}`}>
          <span className={styles.label}>Monthly Income Range</span>
          <select
            className={styles.input}
            name="incomeRange"
            value={values.incomeRange}
            onChange={set("incomeRange")}
          >
            <option value="">Select</option>
            <option value="below-3000">Below GHS 3,000</option>
            <option value="3000-5000">GHS 3,000 – 5,000</option>
            <option value="5000-10000">GHS 5,000 – 10,000</option>
            <option value="10000-20000">GHS 10,000 – 20,000</option>
            <option value="above-20000">Above GHS 20,000</option>
          </select>
        </label>
      </div>

      <button type="submit" className={styles.submit}>
        Register for Save &amp; Buy
      </button>
    </form>
  );
}
