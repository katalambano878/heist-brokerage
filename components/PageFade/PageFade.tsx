"use client";

import type { ReactNode } from "react";
import styles from "./PageFade.module.css";

export function PageFade({ children }: { children: ReactNode }) {
  return <div className={styles.wrap}>{children}</div>;
}
