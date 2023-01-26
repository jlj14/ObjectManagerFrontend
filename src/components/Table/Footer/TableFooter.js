import React from "react";
import styles from "../../../styles/Table/Table.module.css";

const TableFooter = ({
  pageNumber,
  setPageNumber,
  setPageSize,
  totalPages,
}) => {
  // Only show first page button if there is more than 3 pages
  let firstPageBtn;
  if (totalPages > 3) {
    firstPageBtn = (
      <button
        className={`${styles.button} ${styles.inactiveButton}`}
        onClick={() => setPageNumber(1)}
      >
        &lt;&lt;
      </button>
    );
  }

  // Only show last page button if there is more than 3 pages
  let lastPageBtn;
  if (totalPages > 3) {
    lastPageBtn = (
      <button
        className={`${styles.button} ${styles.inactiveButton}`}
        onClick={() => setPageNumber(totalPages)}
      >
        &gt;&gt;
      </button>
    );
  }

  let decrementPageBtn = (
    <button
      className={`${styles.button} ${styles.inactiveButton}`}
      onClick={() => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
      }}
    >
      &lt;
    </button>
  );

  let incrementPageBtn = (
    <button
      className={`${styles.button} ${styles.inactiveButton}`}
      onClick={() => {
        if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
      }}
    >
      &gt;
    </button>
  );

  let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  let pagesBtn = pages.map((page, index) => (
    <button
      key={index}
      className={`${styles.button} ${
        pageNumber === page ? styles.activeButton : styles.inactiveButton
      }`}
      onClick={() => setPageNumber(page)}
    >
      {page}
    </button>
  ));

  let sizes = [10, 25, 50];
  let pageSizeSelect = (
    <select
      className={styles.button}
      onChange={(event) => setPageSize(event.target.value)}
    >
      {sizes.map((size, index) => (
        <option key={index} value={size}>
          {size}
        </option>
      ))}
    </select>
  );

  return (
    <div className={styles.tableFooter}>
      {pageSizeSelect}
      {firstPageBtn}
      {decrementPageBtn}
      {pagesBtn}
      {incrementPageBtn}
      {lastPageBtn}
    </div>
  );
};

export default TableFooter;
