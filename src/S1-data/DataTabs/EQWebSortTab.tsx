import React from "react";
import "../CSV/modal.css";
import S1DataSlice from "../../State/S1DataSlice";
import JsonQsortsCard from "../EQWebSort/JsonQsortsCard";
import IdDropdownSelect from "../EQWebSort/IdDropdownSelect";
import ProjectNameInput from "../CSV/ProjectNameInput";
import ForcedUnforcedRadio from "../CSV/ForcedUnforcedRadio";
import ForcedInput from "../CSV/ForcedInput";
import EqWebSortStatementsCard from "../EQWebSort/EqWebSortStatementsCard";
import downloadCSVdata from "../EQWebSort/downloadCSVdata";
import DownloadCsvModal from "../EQWebSort/DownloadCsvModal";

const stopProp = (e: any) => {
  e.stopPropagation();
};

const LoginOverlay = ({ removeOverlay }: any) => {
  const { csvErrorMessage1 } = S1DataSlice();

  return (
    <div className="overlay_background" onClick={(e) => removeOverlay()}>
      <div
        className="overlay_card p-8 min-h-[400px] min-w-[600px]"
        onClick={(e) => stopProp(e)}
      >
        <div className="mb-4 border-bottom">
          <span style={{ fontSize: 40, display: "block" }}>
            There was a file read error!
          </span>
        </div>
        <div className="m-4">
          <span style={{ fontSize: 30, display: "block" }}>
            {csvErrorMessage1}
          </span>
        </div>
        <span style={{ fontSize: 30, display: "block" }}>
          Please check your csv file data and try again
        </span>
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            removeOverlay();
          }}
        >
          <button className="btn btn-primary form_submit " type="submit">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

const EqWebSortTab = () => {
  const { showCsvErrorModal, setShowCsvErrorModal } = S1DataSlice();

  return (
    <div
      id="modal-root"
      className="flex flex-row bg-white p-8 min-w-[1100px] min-h-[570px]"
    >
      <EqWebSortStatementsCard />
      <JsonQsortsCard />
      <div className="flex flex-col bg-gray-300 w-[500px] h-[500px] p-2 rounded-md gap-2 w-11/12">
        <IdDropdownSelect />
        <ProjectNameInput />
        <ForcedUnforcedRadio />
        <ForcedInput />
      </div>

      <div className={showCsvErrorModal ? "overlay_shown" : "overlay_hidden"}>
        <LoginOverlay
          removeOverlay={() => {
            setShowCsvErrorModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default EqWebSortTab;
