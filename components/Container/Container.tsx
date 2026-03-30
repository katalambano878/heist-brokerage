import type { ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  as?: "div" | "section" | "article" | "header" | "footer";
};

export function Container({
  children,
  className = "",
  narrow = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`${styles.container} ${narrow ? styles.narrow : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
