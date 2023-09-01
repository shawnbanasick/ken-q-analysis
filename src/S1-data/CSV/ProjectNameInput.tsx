import React from "react";
import S1DataSlice from "../../State/S1DataSlice";

const ProjectNameInput = () => {
  const { setProjectName } = S1DataSlice();

  const handleChange = function (e: any) {
    setProjectName(e.target.value);
    // projectHistoryArray: [e.target.value + " data loaded from CSV file"],
  };

  return (
    <div className="form-control bg-gray-300 rounded-md text-left p-4 w-full">
      <label className="label">
        <span className="">Project name?</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered rounded-md"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default ProjectNameInput;
