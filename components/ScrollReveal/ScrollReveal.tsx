"use client";

import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { useScrollReveal, type RevealVariant } from "@/hooks/useScrollReveal";
import styles from "./ScrollReveal.module.css";

type ScrollRevealProps<T extends ElementType> = {
  as?: T;
  variant?: RevealVariant;
  delayMs?: number;
  staggerIndex?: number;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "className">;

export function ScrollReveal<T extends ElementType = "div">({
  as,
  variant = "fadeUp",
  delayMs = 0,
  staggerIndex,
  className = "",
  children,
  style,
  ...rest
}: ScrollRevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const { ref, visible } = useScrollReveal();

  const delay =
    (delayMs ?? 0) + (staggerIndex != null ? staggerIndex * 110 : 0);

  const mergedStyle: CSSProperties = {
    ...(style as CSSProperties),
    transitionDelay: `${delay}ms`,
  };

  const variantClass = styles[variant] ?? styles.fadeUp;

  return (
    <Component
      {...rest}
      ref={ref as React.Ref<HTMLElement>}
      className={`${styles.reveal} ${variantClass} ${visible ? styles.visible : ""} ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
}
