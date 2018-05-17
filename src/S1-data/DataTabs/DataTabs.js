import "./DataTabs.css";
import React from "react";
import { Tab } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import BuzzwordsDemoDataCard from "../DataTabs/BuzzwordsDemoDataCard";
import LipsetDemoDataCard from "../DataTabs/LipsetDemoDataCard";
import MotivationalDemoCard from "../DataTabs/MotivationDemoCard";
import PQMethodStatementCard from "./PQMethodData/PQMethodStatementCard";
import PQMethodQsortsCard from "./PQMethodData/PQMethodQsortsCard";
import ExcelType1Card from "./ExcelData/ExcelType1Card";
import ExcelType2Card from "./ExcelData/ExcelType2Card";
import ExcelType3Card from "./ExcelData/ExcelType3Card";
import CsvStatementsCard from "./CsvData/CsvStatementsCard";
import CsvQsortsCard from "./CsvData/CsvQsortsCard";
import JsonQsortsCard from "./JsonData/JsonQsortsCard";
import ForcedUnforcedRadio from "./CsvData/ForcedUnforcedRadio";
import ForcedInput from "./CsvData/ForcedInput";
import ProjectNameInput from "./CsvData/ProjectNameInput";
import IdDropdownSelect from "./JsonData/IdDropdownSelect";
import DownloadCsvModal from "./JsonData/DownloadCsvModal";
import Type1HelpButton from "./ExcelData/Type1HelpButton";
import Type2HelpButton from "./ExcelData/Type2HelpButton";
import Type3HelpButton from "./ExcelData/Type3HelpButton";
import ExcelErrorModal from "../UploadFile/ErrorChecking/ExcelErrorModal";
import CsvErrorModal from "../UploadFile/ErrorChecking/CsvErrorModal";
import UnforcedWarningModal from "../UploadFile/ErrorChecking/UnforcedWarningModal";
import JapaneseDemoDataCard from "../DataTabs/JapaneseDemoCard";
import CsvImportHelpButton from "./CsvData/CsvImportHelpButton";
import JsonImportHelpButton from "./JsonData/JsonImportHelpButton.jsx";
import PQMethodImportHelpButton from "./PQMethodData/PQMethodImportHelpButton";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    marginLeft: 10
  },
  csvHeadline: {
    fontSize: 22,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    marginLeft: 10
  },
  tabPane: {
    maxWidth: 1198,
    marginBottom: 50
  }
};

const panes = [
  {
    menuItem: "CSV",
    render: () => (
      <Tab.Pane style={ styles.tabPane }>
        <div className="tabDiv">
          <div>
            <h2 style={ styles.csvHeadline }>1. Load Statements TXT file</h2>
            <CsvStatementsCard />
          </div>
          <div>
            <h2 style={ styles.csvHeadline }>2. Load Q-sorts CSV file</h2>
            <CsvQsortsCard />
          </div>
          <div style={ { width: 450, margin: 30 } }>
            <ProjectNameInput />
            <ForcedUnforcedRadio />
            <ForcedInput style={ { marginTop: 25 } } />
            <CsvErrorModal />
            <UnforcedWarningModal />
            <hr />
            <CsvImportHelpButton />
          </div>
        </div>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Excel",
    render: () => (
      <Tab.Pane style={ styles.tabPane }>
        { " " }
        <div className="tabDiv">
          <ExcelType1Card />
          <ExcelType2Card />
          <ExcelType3Card />
          <div>
            <Type1HelpButton />
            <Type2HelpButton />
            <Type3HelpButton />
            <hr style={ { marginTop: 40 } } />
            <ForcedUnforcedRadio />
          </div>
        </div>
        <ExcelErrorModal />
        <UnforcedWarningModal />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Easy HTMLQ",
    render: () => (
      <Tab.Pane style={ styles.tabPane }>
        <div className="tabDiv">
          <div>
            <h2 style={ styles.csvHeadline }>1. Upload Statements TEXT file</h2>
            <PQMethodStatementCard />
          </div>
          <div>
            <h2 style={ styles.csvHeadline }>
                                                  2. Upload an <strong>Easy HTMLQ</strong> file
                                                </h2>
            <JsonQsortsCard />
          </div>
          <div style={ { margin: 10, width: 510 } }>
            <ProjectNameInput />
            <IdDropdownSelect />
            <ForcedUnforcedRadio />
            <ForcedInput />
            <hr style={ { marginTop: 10 } } />
            <div style={ { display: "flex" } }>
              <DownloadCsvModal />
              <JsonImportHelpButton />
            </div>
            <UnforcedWarningModal />
          </div>
        </div>
      </Tab.Pane>
    )
  },
  {
    menuItem: "PQMethod",
    render: () => (
      <Tab.Pane style={ styles.tabPane }>
        <div className="tabDiv">
          <div>
            <h2 style={ styles.headline }>
                                                  1. Upload a <strong>.STA File</strong>
                                                </h2>
            <PQMethodStatementCard />
          </div>
          <div>
            <h2 style={ styles.headline }>
                                                  2. Upload a <strong>.DAT File</strong>
                                                </h2>
            <PQMethodQsortsCard />
          </div>
          <div style={ { width: 250 } }>
            <ForcedUnforcedRadio />
            { /* </div>
                                                                              <br />
                                                                              <div style={ { marginTop: 250, marginRight: 45 } }> */ }
            <hr style={ { marginTop: 50 } } />
            <PQMethodImportHelpButton />
          </div>
        </div>
        <UnforcedWarningModal />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Demo Data",
    render: () => (
      <Tab.Pane style={ styles.tabPane }>
        <div className="tabDiv">
          <div>
            <LipsetDemoDataCard />
          </div>
          <div>
            <BuzzwordsDemoDataCard />
          </div>
          <div>
            <MotivationalDemoCard />
          </div>
          <div>
            <JapaneseDemoDataCard />
          </div>
        </div>
      </Tab.Pane>
    )
  }
];

const DataSourceTabs = () => <Tab className="tabDivCustom" panes={ panes } />;

export default easyComp(DataSourceTabs);
