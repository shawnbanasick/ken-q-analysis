import React from "react";
import S6DataSlice from "../../State/S6DataSlice";

const CustomFileNameLocation = () => {
  const {
    setCustomFileNameLocation,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  const handleChange = (e) => {
    setUpdateFactorVisualizationsButtonColor("bg-orange-300");
  };

  return (
    <div className="pl-[18px]">
      <form className="flex flex-row justify-center">
        <p>"Custom name position"</p>
        <label>
          <input
            type="radio"
            style={{ marginLeft: 16, fontSize: 20 }}
            name="radioGroup"
            value="prepend"
            checked={setCustomFileNameLocation("prepend")}
            onChange={handleChange}
          />
          Prepend
        </label>
        <label>
          <input
            type="radio"
            style={{ marginLeft: 16, fontSize: 20 }}
            name="radioGroup"
            value="append"
            checked={setCustomFileNameLocation("append")}
            onChange={handleChange}
          />
          Append
        </label>
        <label>
          <input
            type="radio"
            style={{ marginLeft: 16, fontSize: 20 }}
            name="radioGroup"
            value="replace"
            checked={setCustomFileNameLocation("replace")}
            onChange={handleChange}
          />
          Replace
        </label>
      </form>
    </div>
  );
};
export default CustomFileNameLocation;

/*
.ui.radio.checkbox label {
    padding-left: 18px !important;
}

const HolderDiv = styled.div`
label {
  padding-left: 18px !important;
}
`;
*/
