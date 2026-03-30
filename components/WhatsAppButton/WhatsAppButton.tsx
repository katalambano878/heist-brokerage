import styles from "./WhatsAppButton.module.css";

const WHATSAPP_HREF =
  "https://wa.me/233245550198?text=Hello%20Luxury%20Estate%2C%20I%20would%20like%20to%20discuss%20a%20property.";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_HREF}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className={styles.glyph} aria-hidden>
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
          <path
            d="M16 3C9.4 3 4 8.2 4 14.6c0 2.4.7 4.7 2 6.6L4 29l8.2-2.1c1.8 1 3.9 1.6 6.1 1.6H16c6.6 0 12-5.2 12-11.6S22.6 3 16 3zm0 21.2h-.2c-2 0-4-.5-5.7-1.5l-.4-.2-4.9 1.3 1.3-4.7-.3-.5c-1.1-1.8-1.7-3.9-1.7-6 0-6.2 5-11.2 11.2-11.2s11.3 5 11.3 11.2-5.1 11.4-11.3 11.4zm6.4-8.7c-.4-.2-2.3-1.1-2.7-1.2-.4-.2-.7-.2-1 .4-.4.4-1.4 1.2-1.7 1.4-.3.2-.6.3-1-.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.3 0-.5-.1-.7l-1.2-2.9c-.3-.8-.6-.7-.8-.7h-.7c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.2 1.8 4.5c.3.3 3 4.6 7.3 6.4 1 .4 1.8.7 2.4.9 1 .3 1.9.3 2.6.2.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
