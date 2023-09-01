import React from "react";
import S4DataSlice from "../../../State/S4DataSlice";

const ParticipantPopUp = () => {
  const { participantDataObject } = S4DataSlice();

  let respondent;
  let factor1Value;
  let factor2Value;

  respondent = participantDataObject.respondent;
  factor1Value = participantDataObject.factor1;
  factor2Value = participantDataObject.factor2;

  if (participantDataObject.respondent === "doNotDisplay") {
    return (
      <div className="flex flex-row bg-gray-300">
        Hover over circle to view participant data
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-row bg-gray-300">
        <div className="mr-2">{respondent}</div>
        <div className="mr-2">{factor1Value},</div>
        <div>{factor2Value}</div>
      </div>
    </div>
  );
};

export default ParticipantPopUp;

/*
const PopupDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: max-content;
  min-width: 250px;
  color: whitesmoke;
  background: black;
  border-radius: 4px;
  padding: 10px;
`;
*/
