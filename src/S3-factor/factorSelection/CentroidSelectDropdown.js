import React from "react";
import S3DataSlice from "../../State/S3DataSlice";
import CentroidSelectButton from "./CentroidSelectButton";

const DropdownMultipleSelection = () => {
  const { setNumCentroidFactors, setNumFacsExtracted } = S3DataSlice();

  const saveDropdownValueToState = (event, data) => {
    setNumCentroidFactors(+event.target.value);
    setNumFacsExtracted(+event.target.value);
  };

  return (
    <div className="flex flex-row items-center text-2xl">
      <p>Extract</p>
      <select
        className="select select-bordered rounded-md max-w-xs ml-2 mr-2 hover:bg-gray-400 h-[30px] border border-gray-400"
        onChange={saveDropdownValueToState}
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
      </select>
      <CentroidSelectButton />
    </div>
  );
};

export default DropdownMultipleSelection;

/*


<span style={ { marginRight: 10 } }>Extract</span>
      <Button.Group size={ "big" } color="black" basic>
        <Dropdown id="centroidSelectDropdown" placeholder={ "?" } defaultValue={ 7 } onChange={ saveDropdownValueToState } openOnFocus={ true } button simple item options={ options }
        />
      </Button.Group>
*/
