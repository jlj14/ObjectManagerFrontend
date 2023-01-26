import React, { useState } from "react";
import styles from "../../../styles/Forms/Forms.module.css";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage.js";
import ParentSelect from "./ParentSelect.js";
import * as constants from "../../../constants/Constants.js";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AppObjectsCreateUpdateForm = () => {
  const appObjectToEdit = useLocation().state?.data;
  const isAnEdition = appObjectToEdit != null;
  const apiUrl = isAnEdition ? `${constants.API_URL}/${appObjectToEdit.id}` : constants.API_URL;
  const httpVerb = isAnEdition ? "PUT" : "POST";
  const [selectedParentId, setSelectedParentId] = useState(isAnEdition ? appObjectToEdit.parentId : null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: appObjectToEdit?.name,
      type: appObjectToEdit?.type,
      description: appObjectToEdit?.description,
    },
  });

  const onSubmit = (formData) => {
    // If a parentId has been selected, it is added to the form data
    if (selectedParentId != null) {
      formData.parentId = selectedParentId;
    }

    fetch(apiUrl, {
      method: httpVerb,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.pathname = "/appObjects";
        }
      })
      .catch((err) => {
        toast.error(constants.GENERIC_ERROR_MESSAGE);
        console.error(err.message);
      });
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input {...register("name", { required: "Name is required" })} />
        <ErrorMessage errors={errors} propertyName={"name"} />

        <label>Type:</label>
        <input {...register("type", { required: "Type is required" })} />
        <ErrorMessage errors={errors} propertyName={"type"} />

        <label>Description:</label>
        <input
          {...register("description", { required: "Description is required" })}
        />
        <ErrorMessage errors={errors} propertyName={"description"} />

        <label>Parent Id:</label>
        <ParentSelect
          selectedParentId={selectedParentId}
          setSelectedParentId={setSelectedParentId}
          excludeId={appObjectToEdit?.id}
        />

        <input className={styles.button} type="submit" />
      </form>
    </div>
  );
};

export default AppObjectsCreateUpdateForm;
