import React from "react";
import styles from "../../../styles/Table/Table.module.css";

const TableContent = ({ columNames, rows }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableRowHeader}>
        <tr>
          {columNames.map((header, index) => (
            <th key={index} className={styles.tableHeader}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableContent;
