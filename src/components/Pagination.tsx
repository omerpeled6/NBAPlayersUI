import React from 'react';
import styles from '../styles/Pagination.module.css';

interface PaginationProps {
  handlePrev: () => void;
  handleNext: () => void;
  nextCursor: string | null;
  cursorHistory: (string | null)[];
}

const Pagination: React.FC<PaginationProps> = ({
  handlePrev,
  handleNext,
  nextCursor,
  cursorHistory,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={handlePrev} disabled={cursorHistory.length === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={!nextCursor}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
