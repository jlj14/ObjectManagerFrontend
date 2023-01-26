import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as constants from "../../../constants/Constants.js";
import { toast } from "react-toastify";

const ParentSelect = ({
  selectedParentId,
  setSelectedParentId, // Callback to set the selected parentId
  excludeId, // Id to exclude in order to not show the self object
}) => {
  const [data, setData] = useState([]);

  // Fetch the data to fill the select
  useEffect(() => {
    fetch(constants.API_URL)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        toast.error(constants.GENERIC_ERROR_MESSAGE);
        console.error(err.message);
      });
  }, []);

  // Fill the options
  const options = data.map((appObject) => ({
    label: `${appObject.name} - ${appObject.type}`,
    value: appObject.id,
  }));

  // Adds an empty option
  options.unshift({ label: "None", value: null });

  // Removes the option with the corresponding id (to not show itself)
  if (excludeId != null) {
    const index = options.findIndex(item => item.value === excludeId);
    if (index > -1) {
      options.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  const selectedValue = options.filter(option => 
    option.value === selectedParentId);

  return <Select options={options} value={selectedValue} onChange={(selectedOption) => setSelectedParentId(selectedOption.value)} />;
};

export default ParentSelect;
