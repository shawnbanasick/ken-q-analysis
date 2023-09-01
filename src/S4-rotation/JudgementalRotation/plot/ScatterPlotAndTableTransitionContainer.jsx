import React, { useEffect, useState, useMemo } from "react";
import ScatterPlot from "./ScatterPlot";
import ParticipantPopUp from "./ParticipantPopUp";
import ClockwiseButtons from "../FactorSelect/ClockwiseButtons";
import RotationTable from "../rotationTable/RotationTable";
import RotationButtons from "../FactorSelect/RotationButtons";
import SaveRotationButton from "../FactorSelect/SaveRotationButton";
import cloneDeep from "lodash/cloneDeep";
import S4DataSlice from "../../../State/S4DataSlice";

const ScatterPlotAndTableTransitionContainer = (props) => {
  const {
    showScatterPlotTableDiv,
    rotColDefsFactorTable,
    rotRowDataFactorTable,
    rotationDegrees,
    newRotationVectors,
  } = S4DataSlice();

  const degreesText = `${rotationDegrees}\u00B0`;

  const data = useMemo(
    () => cloneDeep(newRotationVectors),
    [newRotationVectors]
  );
  const colDefs = useMemo(
    () => cloneDeep(rotColDefsFactorTable),
    [rotColDefsFactorTable]
  );
  const rowData = useMemo(
    () => cloneDeep(rotRowDataFactorTable),
    [rotRowDataFactorTable]
  );

  /*
  const [localStore, setLocalStore] = useState({
    width: getWidthHeight(),
    height: getWidthHeight(),
  });
  */

  // sets scatterplot width and height
  function getWidthHeight() {
    let windowWidth = window.innerWidth - 533;
    const windowHeight = window.innerHeight - 275;

    if (windowWidth > windowHeight) {
      return windowHeight;
    }
    if (windowWidth > 1100) {
      windowWidth = 1100;
    }
    return windowWidth;
  }

  const [width, setWidth] = useState(getWidthHeight());
  const [height, setHeight] = useState(getWidthHeight());

  // ...

  useEffect(() => {
    const handleResize = () => {
      const size = getWidthHeight();
      setWidth(size);
      setHeight(size);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
  const localStore = store({
    width: getWidthHeight(),
    height: getWidthHeight(),
  });
  */

  const scatterPlotStyles = {
    padding: 30,
    marginBottom: 10,
  };

  /*
  // don't delete - needed for first render on reload
  const size = getWidthHeight();
  let tempObj = { width: size, height: size };
  setLocalStore(tempObj);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const size = getWidthHeight();
      localStore.width = size;
      localStore.height = size;
    });

    return () => {
      window.removeEventListener("resize", () => {
        const size = getWidthHeight();
        localStore.width = size;
        localStore.height = size;
      });
    };
  }, [localStore]);
  */

  const leftContWidth = getWidthHeight();
  const maxTableHeight = window.innerHeight - 300;

  if (showScatterPlotTableDiv) {
    return (
      <div className="flex flex-col  items-center">
        <div className="flex flex-row items-center mb-6 mt-6 ">
          <p className="text-2xl mr-2">Rotate axes</p>
          <RotationButtons />
          <ClockwiseButtons baselineData={props.baselineData} />
          <div className="w-[150px]">
            {" "}
            <p className="text-5xl ml-4">{degreesText}</p>
          </div>
          <SaveRotationButton />
        </div>
        <div
          id="scatterPlotDiv"
          className="grid grid-cols-2 place-items-center"
        >
          <div style={{ width: leftContWidth }}>
            <ParticipantPopUp />
            <ScatterPlot
              data={data}
              width={width}
              height={height}
              {...props}
              {...scatterPlotStyles}
            />
          </div>
          <div id="rotFactorsTableDiv">
            <RotationTable
              colDefs={colDefs}
              maxHeight={maxTableHeight}
              rowData={rowData}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ScatterPlotAndTableTransitionContainer;

/*
const DegreesText = styled.div`
  text-align: center;
  height: 60px;
  font-size: 50px;
  width: 105px;
  margin-left: 10px;
  margin-right: 17px;
`;

const PlotAndChartDiv = styled.div`
  display: flex;
  width: calc(100wv - 523);
  height: calc(100vh - 255);
  margin-top: 10px;
`;

const TextButton = styled.div`
  font-size: 20px;
  background-color: white;
`;

const DegreesDiv = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  margin-top: 5;
  margin-bottom: 20;
`;
*/
