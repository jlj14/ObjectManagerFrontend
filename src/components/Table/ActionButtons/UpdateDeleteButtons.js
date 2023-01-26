import React from "react";
import styles from "../../../styles/Table/Table.module.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import * as constants from "../../../constants/Constants.js";
import { toast } from "react-toastify";

const UpdateDeleteButtons = ({
  appObject, // AppObject data to load in the edit view and more
  refreshDataCallback, // Callback to refresh the data
}) => {
  return (
    <React.Fragment>
      <Link to={`/appObjects/${appObject.id}`} state={{ data: appObject }}>
        <button className={styles.actionButton}>
          <EditOutlinedIcon />
        </button>
      </Link>
      <button
        className={styles.actionButton}
        onClick={() =>
          fetch(`${constants.API_URL}/${appObject.id}`, { method: "DELETE" })
            .then((response) => {
              if (response.ok) {
                refreshDataCallback(appObject.parentId); // Refresh the data component in order to not show the deleted row
              }
              // Check if response is 409
              if (response.status === 409) {
                toast.warn(constants.NO_CASCADE_DELETE_MESSAGE);
              }
            })
            .catch((err) => {
              toast.error(constants.GENERIC_ERROR_MESSAGE);
              console.error(err.message);
            })
        }
      >
        <DeleteForeverOutlinedIcon />
      </button>
    </React.Fragment>
  );
};

export default UpdateDeleteButtons;
