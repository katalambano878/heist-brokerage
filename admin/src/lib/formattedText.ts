// Keep in sync with /lib/formattedText.ts. The admin image only contains this folder.
export type TextBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const BULLET = /^[•\-*]\s+(.*)$/;

function isHeading(line: string): boolean {
  const text = line.trim();
  if (!text || text.length > 60) return false;
  if (/[.!?:]$/.test(text)) return false;
  if (text.split(/\s+/).length > 8) return false;
  return true;
}

/** Turns saved plain text into paragraphs, short headings, and bullet lists. */
export function parseFormattedText(raw: string): TextBlock[] {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  const blocks: TextBlock[] = [];
  for (const chunk of text.split(/\n\s*\n/)) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    let paragraph: string[] = [];
    let list: string[] = [];

    const flushParagraph = () => {
      if (paragraph.length === 0) return;
      const joined = paragraph.join(" ").replace(/\s+/g, " ").trim();
      if (paragraph.length === 1 && isHeading(joined)) {
        blocks.push({ type: "heading", text: joined });
      } else if (joined) {
        blocks.push({ type: "paragraph", text: joined });
      }
      paragraph = [];
    };

    const flushList = () => {
      if (list.length === 0) return;
      blocks.push({ type: "list", items: [...list] });
      list = [];
    };

    for (const line of lines) {
      const match = line.match(BULLET);
      if (match) {
        flushParagraph();
        const item = match[1].trim();
        if (item) list.push(item);
      } else {
        flushList();
        paragraph.push(line);
      }
    }
    flushParagraph();
    flushList();
  }

  return blocks;
}

export function serializeFormattedText(blocks: TextBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "list") {
        return block.items
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item) => `• ${item}`)
          .join("\n");
      }
      return block.text.trim();
    })
    .filter(Boolean)
    .join("\n\n");
}
