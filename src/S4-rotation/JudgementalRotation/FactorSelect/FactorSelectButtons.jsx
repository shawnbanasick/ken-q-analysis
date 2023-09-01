import React, { useState, useEffect } from "react";
import includes from "lodash/includes";
import cloneDeep from "lodash/cloneDeep";
import data from "../plot/data";
import doD3ChartDataPrep from "../rotationLogic/doD3ChartDataPrep";
import rotationTablePrep from "../rotationTable/rotationTablePrep";
import displaySelectedFactorsOnPlot from "./displaySelectedFactorsOnPlot";
import calculateCommunalities from "../../varimaxLogic/2calculateCommunalities";
import calculatefSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import transposeMatrix from "../../../Utils/transposeMatrix";
import S3DataSlice from "../../../State/S3DataSlice";
import S4DataSlice from "../../../State/S4DataSlice";
import OnGrayGeneralButton from "../../../ReusableComponents/OnGrayGeneralButton";

const FactorSelectButtons = (props) => {
  let { abFactors, userSelectedRotFactors } = S4DataSlice();

  const [buttonColorObject, setButtonColorObject] = useState({
    factor0: "bg-gray-100",
    factor1: "bg-gray-100",
    factor2: "bg-gray-100",
    factor3: "bg-gray-100",
    factor4: "bg-gray-100",
    factor5: "bg-gray-100",
    factor6: "bg-gray-100",
    factor7: "bg-gray-100",
    factor8: "bg-gray-100",
  });

  const clearAllObj = {
    factor0: "bg-gray-100",
    factor1: "bg-gray-100",
    factor2: "bg-gray-100",
    factor3: "bg-gray-100",
    factor4: "bg-gray-100",
    factor5: "bg-gray-100",
    factor6: "bg-gray-100",
    factor7: "bg-gray-100",
    factor8: "bg-gray-100",
  };

  const {
    shouldDisplayRotFactorButtons,
    numFactorsKeptForRot,
    showRotFactorSelectWarning,
    shouldClearRotButHigh,
    setShowRotFactorSelectWarning,
    setShowScatterPlotTableDiv,
    setRotationDegrees,
    setAbFactors,
    setUserSelectedRotFactors,
    setD3RotChartData,
    setTempRotFacStateArray,
    setShouldClearRotButHigh,
  } = S4DataSlice();
  const { factorMatrix } = S3DataSlice();

  const handleSubmit = () => {
    userSelectedRotFactors = cloneDeep(userSelectedRotFactors);
    if (userSelectedRotFactors.length < 2) {
      setShowRotFactorSelectWarning(true);
    } else {
      // show scatter plot and table
      setShowRotFactorSelectWarning(false);
      setShowScatterPlotTableDiv(true);
    }
  };

  const clearAllFactors = () => {
    setButtonColorObject(clearAllObj);
    setRotationDegrees(0);
    setUserSelectedRotFactors([]);
    setAbFactors([]);
    setShowScatterPlotTableDiv(false);
    setShouldClearRotButHigh(false);
  };

  useEffect(() => {
    if (shouldClearRotButHigh) {
      clearAllFactors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldClearRotButHigh]);

  // passing in baseline data from props
  const handleClick = (event) => {
    let factor = event.target.id;
    factor = factor.split(" ").join("");

    // getState
    userSelectedRotFactors = cloneDeep(userSelectedRotFactors);
    abFactors = cloneDeep(abFactors);

    if (userSelectedRotFactors.length < 2) {
      if (!includes(userSelectedRotFactors, factor)) {
        userSelectedRotFactors.push(factor);
        buttonColorObject[factor] = "bg-green-300";
        setButtonColorObject(buttonColorObject);

        // add button clicked id to userselected factors
        // add id to ab factors array
        const idValue = factor.substr(factor.length - 1);
        abFactors.push(parseInt(idValue, 10));
        abFactors.sort((a, b) => a - b);

        setUserSelectedRotFactors(userSelectedRotFactors);
        setAbFactors(abFactors);
      }
    }
    // if length = 2, fire calculations
    if (userSelectedRotFactors.length === 2) {
      // matrix in factor  format
      const factorMatrix1 = cloneDeep(factorMatrix);

      // transpose matrix to table display format
      const factorMatrixTransposed = transposeMatrix(factorMatrix1);

      // expects bare full array - required to calc significance levels for table/circles
      const arrayWithCommunalities = calculateCommunalities(
        factorMatrixTransposed
      );

      // gets array for fSig testing from LS of calculateCommunalities
      // - sets fSigCriterionResults for this factor matrix
      calculatefSigCriterionValues("flag");

      // returns dataValuesArray for D3 chart
      const d3Prep = doD3ChartDataPrep(arrayWithCommunalities);

      // mutate state
      setD3RotChartData(d3Prep);
      setTempRotFacStateArray(factorMatrixTransposed);

      // format table data and paint 2-factor table
      rotationTablePrep(d3Prep, props.baselineData);

      // call to update D3 plot data
      data();
      displaySelectedFactorsOnPlot();
    }
  };

  // getState
  const numFactorsKeptForRotation = numFactorsKeptForRot;

  const buttonsToRenderArray = [];
  for (let i = 0; i < 8; i++) {
    if (i < numFactorsKeptForRotation) {
      buttonsToRenderArray.push(true);
    } else {
      buttonsToRenderArray.push(false);
    }
  }

  const show1 = buttonsToRenderArray[0];
  const show2 = buttonsToRenderArray[1];
  const show3 = buttonsToRenderArray[2];
  const show4 = buttonsToRenderArray[3];
  const show5 = buttonsToRenderArray[4];
  const show6 = buttonsToRenderArray[5];
  const show7 = buttonsToRenderArray[6];
  const show8 = buttonsToRenderArray[7];

  if (shouldDisplayRotFactorButtons) {
    return (
      <div className="flex align-center">
        {show1 && (
          <OnGrayGeneralButton
            otherFormatting="m-1"
            buttonId={"factor 1"}
            handleClick={handleClick}
            buttonText="1"
            buttonColor={buttonColorObject["factor1"]}
          />
        )}
        {show2 && (
          <OnGrayGeneralButton
            buttonId={"factor 2"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="2"
            buttonColor={buttonColorObject["factor2"]}
          />
        )}
        {show3 && (
          <OnGrayGeneralButton
            buttonId={"factor 3"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="3"
            buttonColor={buttonColorObject["factor3"]}
          />
        )}
        {show4 && (
          <OnGrayGeneralButton
            buttonId={"factor 4"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="4"
            buttonColor={buttonColorObject["factor4"]}
          />
        )}
        {show5 && (
          <OnGrayGeneralButton
            buttonId={"factor 5"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="5"
            buttonColor={buttonColorObject["factor5"]}
          />
        )}
        {show6 && (
          <OnGrayGeneralButton
            buttonId={"factor 6"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="6"
            buttonColor={buttonColorObject["factor6"]}
          />
        )}
        {show7 && (
          <OnGrayGeneralButton
            buttonId={"factor 7"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="7"
            buttonColor={buttonColorObject["factor7"]}
          />
        )}
        {show8 && (
          <OnGrayGeneralButton
            buttonId={"factor 8"}
            otherFormatting="m-1"
            handleClick={handleClick}
            buttonText="8"
            buttonColor={buttonColorObject["factor8"]}
          />
        )}
        <OnGrayGeneralButton
          otherFormatting="m-1"
          buttonColor={"bg-gray-100"}
          buttonText="Clear"
          handleClick={clearAllFactors}
        />
        <OnGrayGeneralButton
          otherFormatting="m-1"
          buttonColor={"bg-gray-100"}
          buttonText="Display"
          handleClick={handleSubmit}
        />

        {showRotFactorSelectWarning && (
          <div className="btn rounded-md mt-[5px] bg-red-400 w-[200px]">
            <button className="text-xl text-center text-white w-[150px] h-[35px] ">
              Select 2 factors
            </button>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default FactorSelectButtons;
