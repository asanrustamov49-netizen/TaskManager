"use client";

// Модальное окно на встроенном в браузер элементе <dialog>.
// Показывайте его условно: {isOpen && <Modal title="..." onClose={...}>...</Modal>}
// Окно закрывается по Escape, по клику на затемнённый фон и по крестику. Во всех случаях вызывается onClose.

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // showModal() открывает окно поверх страницы и не даёт нажимать на то, что под ним.
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="modal-title"
      // Escape: браузер шлёт событие cancel. Отменяем его и закрываем окно сами через onClose.
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      // Клик по фону попадает в сам <dialog>, а клик по содержимому — во внутренний div.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
