"use client";

import { useId, useState } from "react";
import styles from "./FaqAccordion.module.css";

const items = [
  {
    id: "faq-1",
    q: "How quickly can we schedule private showings?",
    a: "Most requests are confirmed within 24 hours, subject to seller availability, security desks, and building policies.",
  },
  {
    id: "faq-2",
    q: "Do you represent international buyers?",
    a: "Yes. We coordinate counsel, currency considerations, and time zones with a single lead advisor so decisions stay coherent across markets.",
  },
  {
    id: "faq-3",
    q: "What documents should sellers prepare in advance?",
    a: "We share a concise checklist that typically covers financial statements, alteration history, and board correspondence where applicable.",
  },
];

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className={styles.root}>
      {items.map((item) => {
        const expanded = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const headerId = `${baseId}-${item.id}-header`;
        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.questionWrap}>
              <button
                type="button"
                id={headerId}
                className={styles.trigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenId(expanded ? null : item.id)}
              >
                <span className={styles.question}>{item.q}</span>
                <span
                  className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`${styles.panel} ${expanded ? styles.panelOpen : ""}`}
              hidden={!expanded}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
