import React, { useEffect, useState, useCallback } from "react";
import FactorViz from "./FactorViz";
import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";
import S6DataSlice from "../../State/S6DataSlice";

const styles = {
  width: "100%",
  height: 1200,
  padding: 30,
  margin: 10,
};

// todo - need to calculate dynamic height here for styles

const FactorVizDispatch = () => {
  const { factorVizOptions, displayFactorVisualizations } = S6DataSlice();

  const [state, setState] = useState([]);

  const factorData = useCallback(async () => {
    const data = createFactorVizDataObjectForProps(factorVizOptions);
    setState(data);
  }, [factorVizOptions]);

  useEffect(() => {
    factorData();
  }, [factorData]);

  if (displayFactorVisualizations) {
    return (
      <div>
        {state.map((i, index) => (
          <div key={`fact${index.toString()}`}>
            <FactorViz key={`viz${index}`} {...state[index]} {...styles} />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default FactorVizDispatch;
