import React from "react";
import displayJsonData from "./displayJsonData";
// import "./IdDropdownSelect.css";
import S1DataSlice from "../../State/S1DataSlice";

const IdDropdownSelect = () => {
  // state = {};

  const { jsonObj, projectName } = S1DataSlice();
  const {
    setProjectHistoryArray,
    setNumQsorts,
    setQSortPattern,
    setSortsDisplayText,
    setMainDataObject,
    setRespondentNames,
    setMultiplierArray,
    setShowJsonFileLoadedMessage,
    setDataOrigin,
    jsonParticipantId,
  } = S1DataSlice();

  const handleChange = (e) => {
    /*
    let selection = {
      value,
    };
    */

    if (e.target.value !== undefined) {
      let selection = e.target.value;
      console.log(e.target.value);
      let data = displayJsonData(selection, jsonObj, projectName);

      console.log(JSON.stringify(data.multiplierArray));

      setProjectHistoryArray(...data.projectHistoryArray);
      setNumQsorts(data.numQsorts);
      setQSortPattern(...data.qSortPattern);
      setSortsDisplayText(...data.sortsDisplayText);
      setMainDataObject(...data.mainDataObject);
      setRespondentNames(...data.respondentNames);
      setMultiplierArray(...data.multiplierArray);
      setShowJsonFileLoadedMessage(false);
      setDataOrigin("json");
    }

    /* 
    this.setState({
      value
    });
    */
  };
  // console.log(jsonParticipantId);

  // const options = jsonParticipantId;

  // const { value } = this.state;

  return (
    <div className="min-w-[250px] mt-4 ml-4">
      <div>
        <select
          className="select select-bordered rounded-md w-full max-w-[450px] font-normal"
          onClick={handleChange}
          defaultValue={"Select Participant Id"}
        >
          <option disabled>Select Participant Id</option>
          {jsonParticipantId.map((item) => item)}
        </select>
      </div>
    </div>
  );
};

export default IdDropdownSelect;
