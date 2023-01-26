import React, { useState, useEffect } from "react";
import CreateButton from "../ActionButtons/CreateButton.js";
import AppObjectsRows from "./AppObjectsRows";
import TableContent from "../Content/TableContent";
import TableFooter from "../Footer/TableFooter";
import * as constants from "../../../constants/Constants.js";
import { toast } from "react-toastify";

const AppObjectsTable = () => {
  const [data, setData] = useState([]); // Data to show (parent/roots data)
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchChildDataForRowId, setFetchChildDataForRowId] = useState(0); // Id of the child which data has to be fetched
  const [clearChildDataForRowId, setClearChildDataForRowId] = useState(0); // Id of the child which data has to be cleaned

  // This callback will be invoked when the pageNumber or the pageSize changes
  let fetchDataCallback = React.useCallback(() => {
    fetch(`${constants.API_URL}/roots?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        setTotalPages(response.totalPages);
        // To decrement a page if data is empty due to deleting actions
        if (response.data.length === 0 && pageNumber > 1) {
          setPageNumber(pageNumber - 1);
        }
      })
      .catch((err) => {
        toast.error(constants.GENERIC_ERROR_MESSAGE);
        console.error(err.message);
      });
  }, [pageNumber, pageSize]);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  let columNames = ["Name", "Type", "Description", "Actions"];

  let rows = (
    <AppObjectsRows
      rootData={data} // Root data, only with root app objects (which are not child of anyone)
      fetchChildDataForRowId={fetchChildDataForRowId} // Id of the row to fetch child data
      setFetchChildDataForRowId={setFetchChildDataForRowId} // Function to set the id of the row to fetch child data
      clearChildDataForRowId={clearChildDataForRowId} // Id of the row to clean child data
      setClearChildDataForRowId={setClearChildDataForRowId} // Function to set the id of the row to clean child data
      refreshDataCallback={fetchDataCallback} // Function callback to refresh the root data
      childLevel={0} // 0 because these are the root (objects with no parents) rows
    />
  );

  return (
    <React.Fragment>
      <CreateButton />
      <TableContent columNames={columNames} rows={rows} />
      <TableFooter
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
      />
    </React.Fragment>
  );
};

export default AppObjectsTable;
