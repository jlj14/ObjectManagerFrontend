import React from "react";
import styles from "../../../styles/Table/Table.module.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";

const CreateButton = () => {
  return (
    <Link to="/appObjects/create">
      <button className={styles.actionButtonWithText}>
        <AddCircleOutlineOutlinedIcon />
        <span style={{ marginLeft: "5px" }}>Add new object</span>
      </button>
    </Link>
  );
};

export default CreateButton;
