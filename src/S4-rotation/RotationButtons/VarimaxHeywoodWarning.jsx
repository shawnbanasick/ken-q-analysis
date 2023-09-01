import React from "react";
import doContinueAnalysis from "../VarimaxHeywoodAdjust/doContinueAnalysis";
import doAdjustValue from "../VarimaxHeywoodAdjust/doAdjustValue";
import doAdjustValuePqmethod from "../VarimaxHeywoodAdjust/doAdjustValuePqmethod";
import S4DataSlice from "../../State/S4DataSlice";
// import S5DataSlice from "../../State/S5DataSlice";
// varimaxButtonDisabled,

const RotationButtonGroup = () => {
  const {
    /*
    variContinueButtonActive,
    variContinueButtonDisabled,
    variAdjustButtonActive,
    variAdjustButtonDisabled,
    variPqmAdjustButtonActive,
    variPqmAdjustButtonDisabled,
    */
    varimaxHeywoodWarningParticipants,
    showVarimaxHeywoodWarning,
    setVariAdjustButtonActive,
    setVariContinueButtonActive,
    setVariContinueButtonDisabled,
    setVariAdjustButtonDisabled,
    setVariPqmAdjustButtonActive,
    setVariPqmAdjustButtonDisabled,
  } = S4DataSlice();

  // const { bipolarDisabled } = S5DataSlice();

  const onVariContClick = (event) => {
    doContinueAnalysis();
    setVariContinueButtonActive(true);
    setVariContinueButtonDisabled(true);
    setVariAdjustButtonActive(false);
    setVariAdjustButtonDisabled(true);
    setVariPqmAdjustButtonActive(false);
    setVariPqmAdjustButtonDisabled(true);
    return;
  };

  const onVariAdjustClick = (event) => {
    doAdjustValue();
    setVariContinueButtonActive(false);
    setVariContinueButtonDisabled(true);
    setVariAdjustButtonActive(true);
    setVariAdjustButtonDisabled(true);
    setVariPqmAdjustButtonActive(false);
    setVariPqmAdjustButtonDisabled(true);
    return;
  };

  const onVariPqmAdjustClick = (event) => {
    doAdjustValuePqmethod();

    setVariContinueButtonActive(false);
    setVariContinueButtonDisabled(true);
    setVariAdjustButtonActive(false);
    setVariAdjustButtonDisabled(true);
    setVariPqmAdjustButtonActive(true);
    setVariPqmAdjustButtonDisabled(true);
    return;
  };

  const shouldDisplay = showVarimaxHeywoodWarning;
  // const isDisabled = bipolarDisabled;

  /*
  let buttonDisabled = false;
  if (varimaxButtonDisabled === true || isDisabled === true) {
    buttonDisabled = true;
  }
  */

  const textTrans1 =
    "A 'Heywood case' occurs when a participant in the project has a communality estimate greater than 1";

  const textTrans2 =
    "This can happen when too many or too few factors have been extracted";

  const textTrans3 =
    "You can continue the analysis with the current factors (including Heywood case), re-select the number of factors, or proportionally adjust the factor loadings for the Heywood case participants so that their communality estimates will equal 1";

  if (shouldDisplay) {
    return (
      <React.Fragment>
        <p>{`${textTrans1}. ${textTrans2}. ${textTrans3}.`}</p>
        <h4>{`Factor loading > 1: ${varimaxHeywoodWarningParticipants}`}</h4>
        <div>
          <button id="VariContinueButton" onClick={onVariContClick}>
            Continue Analysis
          </button>
          <button id="VariAdjustButton" onClick={onVariAdjustClick}>
            Adjust Value to 0.99
          </button>
          <button id="VariPqmAdjustButton" onClick={onVariPqmAdjustClick}>
            Adjust to PQMethod-style Value
          </button>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default RotationButtonGroup;

// return <p style={{ fontSize: 22 }}>Continue with Analysis</p>;

/*
isActive={variContinueButtonActive}
            disabled={variContinueButtonDisabled}

            isActive={variAdjustButtonActive}
            disabled={variAdjustButtonDisabled}

isActive={variPqmAdjustButtonActive}
            disabled={variPqmAdjustButtonDisabled}

const ContainerDiv = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
`;

const VarHeywoodButton = styled(GeneralButton)`
  margin-right: 10px;
`;

const TextDiv = styled.div`
  margin-top: 30px;
  width: 750px;
  font-size: 14px;
`;
*/
