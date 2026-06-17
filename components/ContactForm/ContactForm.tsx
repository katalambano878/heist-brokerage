"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  intent: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  intent: "buy",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) next.phone = "Please enter a phone number.";
    if (values.message.trim().length < 12) {
      next.message = "Add a few more details (at least 12 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Full name</span>
          <input
            className={styles.input}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) =>
              setValues((v) => ({ ...v, name: e.target.value }))
            }
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name ? (
            <span className={styles.error}>{errors.name}</span>
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
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email ? (
            <span className={styles.error}>{errors.email}</span>
          ) : null}
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Phone</span>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, phone: e.target.value }))
            }
            aria-invalid={errors.phone ? true : undefined}
          />
          {errors.phone ? (
            <span className={styles.error}>{errors.phone}</span>
          ) : null}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>You are looking to</span>
          <select
            className={styles.input}
            name="intent"
            value={values.intent}
            onChange={(e) =>
              setValues((v) => ({ ...v, intent: e.target.value }))
            }
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
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) =>
            setValues((v) => ({ ...v, message: e.target.value }))
          }
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message ? (
          <span className={styles.error}>{errors.message}</span>
        ) : null}
      </label>
      <button type="submit" className={styles.submit}>
        Send message
      </button>
      {submitted ? (
        <p className={styles.success} role="status">
          Thank you. Your message has been recorded for this demo experience.
        </p>
      ) : null}
    </form>
  );
}
