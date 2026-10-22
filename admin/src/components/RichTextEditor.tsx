import { useState } from "react";
import {
  parseFormattedText,
  serializeFormattedText,
  type TextBlock,
} from "../../../lib/formattedText";

type DraftBlock = TextBlock & { id: string };

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function withIds(blocks: TextBlock[]): DraftBlock[] {
  const draft = blocks.map((block) => ({ ...block, id: crypto.randomUUID() }));
  return draft.length > 0 ? draft : [{ id: crypto.randomUUID(), type: "paragraph", text: "" }];
}

function wrapSelection(textarea: HTMLTextAreaElement, onValue: (next: string) => void) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end) || "text";
  const next = `${textarea.value.slice(0, start)}**${selected}**${textarea.value.slice(end)}`;
  onValue(next);
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [blocks, setBlocks] = useState<DraftBlock[]>(() => withIds(parseFormattedText(value)));

  function commit(next: DraftBlock[]) {
    const safe = next.length > 0 ? next : [{ id: crypto.randomUUID(), type: "paragraph" as const, text: "" }];
    setBlocks(safe);
    onChange(serializeFormattedText(safe));
  }

  function update(id: string, block: DraftBlock) {
    commit(blocks.map((item) => (item.id === id ? block : item)));
  }

  function insert(type: DraftBlock["type"]) {
    const block: DraftBlock =
      type === "list"
        ? { id: crypto.randomUUID(), type: "list", items: [""] }
        : { id: crypto.randomUUID(), type, text: "" };
    commit([...blocks, block]);
  }

  function remove(id: string) {
    commit(blocks.filter((block) => block.id !== id));
  }

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar" role="toolbar" aria-label="Formatting">
        <button type="button" onClick={() => insert("paragraph")}>Paragraph</button>
        <button type="button" onClick={() => insert("heading")}>Heading</button>
        <button type="button" onClick={() => insert("list")}>Bullet list</button>
      </div>

      <div className="rich-editor-blocks">
        {blocks.map((block) => (
          <div key={block.id} className={`rich-block rich-block-${block.type}`}>
            <div className="rich-block-bar">
              <span>{block.type === "list" ? "Bullets" : block.type === "heading" ? "Heading" : "Paragraph"}</span>
              <button type="button" onClick={() => remove(block.id)} aria-label="Remove block">
                Remove
              </button>
            </div>
            {block.type === "list" ? (
              <div className="rich-list">
                {block.items.map((item, index) => (
                  <input
                    key={`${block.id}-${index}`}
                    value={item}
                    placeholder="List item"
                    onChange={(event) => {
                      const items = block.items.map((entry, i) => (i === index ? event.target.value : entry));
                      update(block.id, { ...block, items });
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        const items = [...block.items];
                        items.splice(index + 1, 0, "");
                        update(block.id, { ...block, items });
                      }
                    }}
                  />
                ))}
                <button
                  type="button"
                  className="rich-add"
                  onClick={() => update(block.id, { ...block, items: [...block.items, ""] })}
                >
                  Add bullet
                </button>
              </div>
            ) : (
              <textarea
                rows={block.type === "heading" ? 1 : 3}
                value={block.text}
                placeholder={placeholder}
                onChange={(event) => update(block.id, { ...block, text: event.target.value })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && block.type === "paragraph") {
                    event.preventDefault();
                    const index = blocks.findIndex((item) => item.id === block.id);
                    const next = [...blocks];
                    next.splice(index + 1, 0, { id: crypto.randomUUID(), type: "paragraph", text: "" });
                    commit(next);
                  }
                  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
                    event.preventDefault();
                    wrapSelection(event.currentTarget, (text) => update(block.id, { ...block, text }));
                  }
                }}
              />
            )}
          </div>
        ))}
      </div>
      <p className="hint">
        Paragraphs, headings, and bullets stay separated on the public site. Select text and press ⌘B or Ctrl+B for bold.
      </p>
    </div>
  );
}
