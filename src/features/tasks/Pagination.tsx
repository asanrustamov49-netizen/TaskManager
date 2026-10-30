import { Button } from "@/components/ui/Button";
import { PAGE_SIZES } from "./constants";
import styles from "./Pagination.module.css";
import type { Pagination as PaginationData } from "./types";

type Props = {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function Pagination({ pagination, onPageChange, onLimitChange }: Props) {
  const { page, totalPages, total, limit } = pagination;

  return (
    <nav className={styles.pagination} aria-label="Страницы">
      <label className={styles.limit}>
        Показывать по
        <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.pages}>
        <Button variant="secondary" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          ← Назад
        </Button>
        <span className={styles.current}>
          {page} из {totalPages}
        </span>
        <Button variant="secondary" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          Вперёд →
        </Button>
      </div>

      <span className={styles.total}>Всего: {total}</span>
    </nav>
  );
}
