import { parseFormattedText } from "@/lib/formattedText";
import styles from "./FormattedCopy.module.css";

type FormattedCopyProps = {
  text: string;
  className?: string;
};

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function FormattedCopy({ text, className }: FormattedCopyProps) {
  const blocks = parseFormattedText(text);
  if (blocks.length === 0) return null;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3 key={index} className={styles.heading}>
              <Inline text={block.text} />
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className={styles.list}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className={styles.paragraph}>
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
