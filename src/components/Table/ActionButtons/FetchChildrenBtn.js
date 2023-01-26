import React, { useState } from "react";
import styles from "../../../styles/Table/Table.module.css";

const FetchChildrenBtn = ({
  id, // AppObject/row id
  setFetchChildDataForRowId, // Function to set the id of the row to fetch child data
  setClearChildDataForRowId, // Function to set the id of the row to clean child data
}) => {
  const [symbol, setSymbol] = useState("+");

  let btn = (
    <button
      className={styles.button}
      onClick={() => {
        if (symbol === "+") {
          setFetchChildDataForRowId(id); // Sets the id of the row which has to fetch and load child data
        } else {
          setClearChildDataForRowId(id); // Sets the id of the row which has to clean the child data
        }

        let newSymbol = symbol === "+" ? "-" : "+";
        setSymbol(newSymbol);
      }}
    >
      {symbol}
    </button>
  );

  return btn;
};

export default FetchChildrenBtn;
