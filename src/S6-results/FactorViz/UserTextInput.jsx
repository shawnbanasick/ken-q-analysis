import React from "react";
import S6DataSlice from "../../State/S6DataSlice";

const UserTextInput = (props) => {
  const {
    factorVizOptionsHolder,
    setFactorVizOptionsHolder,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  const handleChange = (e) => {
    const key = props.name;
    factorVizOptionsHolder[key] = e.target.value;
    setFactorVizOptionsHolder(factorVizOptionsHolder);
    setUpdateFactorVisualizationsButtonColor("bg-orange-300");
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={handleChange}
      className={`pl-1 ${props.left} ${props.width}`}
    />
  );
};

export default UserTextInput;
