import React from "react";
import styles from "../../styles/Forms/Forms.module.css";

const ErrorMessage = ({errors, propertyName}) => {
  const errorMessage =
    errors[propertyName]?.message.length > 0 ?
    <span className={styles.errorMessage}>{errors[propertyName].message}</span> :
    <span></span>;

  return (errorMessage);
};

export default ErrorMessage;
