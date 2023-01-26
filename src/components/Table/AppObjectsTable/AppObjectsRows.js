import React, { useState, useEffect } from "react";
import styles from "../../../styles/Table/Table.module.css";
import FetchChildrenBtn from "../ActionButtons/FetchChildrenBtn";
import UpdateDeleteButtons from "../ActionButtons/UpdateDeleteButtons.js";
import { toast } from "react-toastify";
import * as constants from "../../../constants/Constants.js";

const AppObjectsRows = ({
  id, // AppObject/row id
  rootData, // Root data, only with root app objects (which are not child of anyone)
  fetchChildDataForRowId, // Id of the row to fetch child data
  setFetchChildDataForRowId, // Function to set the id of the row to fetch child data
  clearChildDataForRowId, // Id of the row to clean child data
  setClearChildDataForRowId, // Function to set the id of the row to clean child data
  refreshDataCallback, // Function callback to refresh the component
  childLevel // Child level
}) => {
  const [childData, setChildData] = useState([]); // Child data

  // This will be invoked when a child id for fetching or cleaning is changed
  useEffect(() => {
    // If this is the child component, its data is cleaned 
    if (id === clearChildDataForRowId) {
      setChildData([]);
      setClearChildDataForRowId(0);
    }

    // If this is the child component, its data is fetched and loaded
    if (id === fetchChildDataForRowId) {
      fetch(`${constants.API_URL}/${id}/children`)
        .then((response) => response.json())
        .then((response) => {
          setChildData(response);
        })
        .catch((err) => {
          toast.error(constants.GENERIC_ERROR_MESSAGE);
          console.error(err.message);
        });
      setFetchChildDataForRowId(0);
    }
  }, [fetchChildDataForRowId, clearChildDataForRowId]);

  let padding = childLevel * 50 + "px"; // Incremental padding
  let dataToShow = rootData != null ? rootData : childData; // If there is rootData, it will be loaded; otherwise, child data will be

  // Rows to show in the table
  return dataToShow.map((appObject) => (
    <React.Fragment key={appObject.id}>
      <tr className={styles.tableRowItems}>
        <td className={styles.tableCell} style={{ paddingLeft: padding }}>
          <FetchChildrenBtn
            id={appObject.id} // AppObject/row id
            setFetchChildDataForRowId={setFetchChildDataForRowId} // Function to set the id of the row to fetch child data
            setClearChildDataForRowId={setClearChildDataForRowId} // Function to set the id of the row to clean child data
          />
          {appObject.name}
        </td>
        <td className={styles.tableCell}>{appObject.type}</td>
        <td className={styles.tableCell}>{appObject.description}</td>
        <td className={styles.tableCell}>
          <UpdateDeleteButtons
            appObject={appObject} // AppObject data to load in the edit view and more
            refreshDataCallback={refreshDataCallback} // Refresh function used when a row is deleted
          />
        </td>
      </tr>

      {/* Adds child rows without data (the data will be loaded when it will be required) */}
      <AppObjectsRows
        id={appObject.id} // AppObject/row id
        data={undefined} // Data for child rows is not provided
        fetchChildDataForRowId={fetchChildDataForRowId} // Id of the row to fetch child data
        setFetchChildDataForRowId={setFetchChildDataForRowId} // Function to set the id of the row to fetch child data
        clearChildDataForRowId={clearChildDataForRowId} // Id of the row to clean child data
        setClearChildDataForRowId={setClearChildDataForRowId} // Function to set the id of the row to clean child data
        refreshDataCallback={setFetchChildDataForRowId} // Function to refresh data in component (in this case is the set fetch child data for row id)
        childLevel={childLevel + 1} // Increments a child level each time
      />
    </React.Fragment>
  ));
};

export default AppObjectsRows;
