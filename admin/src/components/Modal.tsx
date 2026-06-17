import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  xl?: boolean;
};

export function Modal({ title, onClose, children, wide, xl }: ModalProps) {
  const sizeClass = xl ? "modal-xl" : wide ? "modal-wide" : "";
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={title}
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
