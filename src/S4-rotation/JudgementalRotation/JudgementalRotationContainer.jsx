import React from "react";
import JudgementalTitleDiv from "./JudgementalTitleDiv";
import S4DataSlice from "../../State/S4DataSlice";

const JudgementalRotationContainer = () => {
  const { shouldShowJudgeRotDiv } = S4DataSlice();

  return (
    <React.Fragment>
      {shouldShowJudgeRotDiv ? <JudgementalTitleDiv /> : null}
    </React.Fragment>
  );
};

export default JudgementalRotationContainer;
