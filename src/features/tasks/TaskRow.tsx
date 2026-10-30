import { Button } from "@/components/ui/Button";
import { PRIORITY_LABELS } from "./constants";
import styles from "./TaskRow.module.css";
import type { Task } from "./types";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const dateFormat = new Intl.DateTimeFormat("ru", { day: "numeric", month: "short", year: "numeric" });

export function TaskRow({ task, onEdit, onDelete }: Props) {
  return (
    <li className={styles.row} data-priority={task.priority}>
      <div className={styles.main}>
        <h3 className={styles.title}>{task.title}</h3>
        {task.description && <p className={styles.description}>{task.description}</p>}
      </div>

      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
        {task.category && <span className={styles.category}>#{task.category}</span>}
        <time className={styles.date} dateTime={task.createdAt}>
          {dateFormat.format(new Date(task.createdAt))}
        </time>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" iconOnly onClick={() => onEdit(task)} aria-label="Редактировать" title="Редактировать">
          <PencilIcon />
        </Button>
        <Button variant="ghost" iconOnly onClick={() => onDelete(task)} aria-label="Удалить" title="Удалить" className={styles.deleteButton}>
          <TrashIcon />
        </Button>
      </div>
    </li>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </svg>
  );
}
