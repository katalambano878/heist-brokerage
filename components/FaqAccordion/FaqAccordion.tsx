"use client";

import { useId, useState } from "react";
import styles from "./FaqAccordion.module.css";

const items = [
  {
    id: "faq-1",
    q: "How does the Save & Buy Program work?",
    a: "Choose your property, make an initial deposit, and complete payments through agreed installments. Once payments are complete, you take ownership with confidence — transparent agreements, no hidden costs.",
  },
  {
    id: "faq-2",
    q: "Can I finance construction in stages?",
    a: "Yes. Our Build in Stages Plan lets you finance construction progressively — design, foundation, structural, roofing, and finishing — with full visibility and control at every milestone.",
  },
  {
    id: "faq-3",
    q: "What services does Heist offer?",
    a: "Real estate sales and acquisitions, construction, renovation and demolition, the Save & Buy Program, interior and exterior design, and global product sourcing.",
  },
  {
    id: "faq-4",
    q: "How quickly can we book a strategy call?",
    a: "Most strategy calls are confirmed within 24 hours. Reach us by phone, WhatsApp, or the form above and we'll respond with a clear next step.",
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
