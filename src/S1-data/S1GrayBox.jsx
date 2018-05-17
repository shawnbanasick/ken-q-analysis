import S1Header from "./S1Header";
import React, { Component } from "react";
import DataTabs from "./../S1-data/DataTabs/DataTabs";
import ProjectName from "./ProjectInfo/ProjectName";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import StatementsContainer from "./StatementList/StatementsContainer";
import SortsContainer from "./SortsList/SortsContainer";

class S1GrayBox extends Component {
    render() {
        return (
            <div className="section">
              <S1Header />
              <DataTabs />
              <ProjectName />
              <ProjectInfo />
              <StatementsContainer />
              <SortsContainer />
            </div>
            );
    }
}

export default S1GrayBox;
