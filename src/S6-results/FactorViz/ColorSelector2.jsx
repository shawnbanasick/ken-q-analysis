import React, { useState } from "react";
import S6DataSlice from "../../State/S6DataSlice";

const ColorSelector = (props) => {
  const {
    factorVizOptionsHolder,
    setFactorVizOptionsHolder,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  const [color, setColor] = useState("#d9effe");
  console.log("color: ", color);

  function handleChange(e) {
    setColor(e.target.value);
    const colorProperty = e.target.id;
    factorVizOptionsHolder[colorProperty] = e.target.value;
    setFactorVizOptionsHolder(factorVizOptionsHolder);
    setUpdateFactorVisualizationsButtonColor("bg-orange-300");
  }

  return (
    <input
      id={props.id}
      type="color"
      defaultValue={props.defaultColor}
      onChange={handleChange}
    />
  );
};

export default ColorSelector;
