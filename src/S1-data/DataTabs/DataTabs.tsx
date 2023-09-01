import React from "react";
import { Tabs } from "react-simple-tabs-component";
import "./tabs.css";
import PQMethodTab from "./PQMethodTab";
import ExcelTab from "./ExcelTab";
// import EQWebSortTab from "./EQWebSortTab";
import DemoDataTab from "./DemoDataTab";
import KadeTab from "./KadeTab";

const tabs = [
  {
    label: "MS Excel",
    Component: ExcelTab,
  },

  {
    label: "PQMethod",
    Component: PQMethodTab,
  },
  {
    label: "KADE Zip",
    Component: KadeTab,
  },
  {
    label: "Demo",
    Component: DemoDataTab,
  },
];

const DataTabs = () => (
  // this is only top box of active names
  <div
    id="dataTabs"
    className="flex justify-center bg-gray-300 w-full rounded-md"
  >
    <div className="mt-6">
      <Tabs tabs={tabs} className="" /* Props */ />
    </div>
  </div>
);
export default DataTabs;

/*
{
    label: "EQ Web Sort",
    Component: EQWebSortTab,
  },
  */
