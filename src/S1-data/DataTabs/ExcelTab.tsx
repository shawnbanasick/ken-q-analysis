import React from "react";
import "../CSV/modal.css";
import S1DataSlice from "../../State/S1DataSlice";
import ExcelType1Card from "../Excel1/ExcelType1Card";
import ExcelType2Card from "../Excel2/ExcelType2Card";

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

  /*
  useEffect(() => {
    console.log("loaded");
  });
  */
  return (
    <div
      id="modal-root"
      className="flex flex-row bg-gray-300 p-8 pt-2 min-w-[700px] min-h-[600px]"
    >
      <div>
        <ExcelType1Card />
      </div>
      <ExcelType2Card />
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

export default CsvTab;
