import CsvStatementsCard from "./CsvStatementsCard";
import CsvQsortsCard from "./CsvQsortsCard";
import ProjectNameInput from "./ProjectNameInput";
import ForcedUnforcedRadio from "./ForcedUnforcedRadio";
import ForcedInput from "./ForcedInput";
// import UnforcedWarningModal from "../UploadFile/ErrorChecking/UnforcedWarningModal";
import CsvImportHelpButton from "./CsvImportHelpButton";
import React from "react";
import "./modal.css";
import S1DataSlice from "../../State/S1DataSlice";

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

const CsvTab = () => {
  const { showCsvErrorModal, setShowCsvErrorModal } = S1DataSlice();

  console.log(showCsvErrorModal);

  return (
    <div
      id="modal-root"
      className="flex flex-row w-full bg-white p-8 border-l-4 border-r-8 border-b-8 border-#dee2e6-300 mb-8"
    >
      <div>
        <CsvStatementsCard />
      </div>
      <CsvQsortsCard />
      <div className="bg-gray-300 ml-4 rounded-md w-[800px]">
        <div className="flex flex-row">
          <ProjectNameInput />
          <CsvImportHelpButton />
        </div>
        <ForcedUnforcedRadio />
        <ForcedInput />
        <div className="flex_column">
          <div
            className={showCsvErrorModal ? "overlay_shown" : "overlay_hidden"}
          >
            <LoginOverlay
              removeOverlay={() => {
                setShowCsvErrorModal(false);
              }}
            />
          </div>
        </div>
        {/*<CsvErrorModal />
         <UnforcedWarningModal />
        <hr />
  */}
      </div>
    </div>
  );
};

export default CsvTab;
