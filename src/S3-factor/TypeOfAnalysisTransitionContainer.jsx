import React from "react";
import store from "../store";
import { easyComp } from "react-easy-state";
import { Transition } from 'semantic-ui-react';
import ResetAnalysisButton from "./ResetAnalysisButton";
import PcaButton from "./factorSelection/ExtractPrinCompButton";
import NoFacSelectedModal from "./factorSelection/NoFacSelectedModal";
import CentroidDropDownMenu from "./factorSelection/CentroidSelectDropdown";

class TypeOfAnalysisTransitionContainer extends React.Component {

    render() {
        let showFactorExtractionButtons = store.getState(
            "showFactorExtractionButtons"
        );

        return (
            <Transition visible={ showFactorExtractionButtons } animation="fade" duration={ 1000 }>
              <div>
                <div className="centroidContainer">
                  <div style={ { display: "flex" } }>
                    <CentroidDropDownMenu />
                    <NoFacSelectedModal />
                  </div>
                  <PcaButton />
                  <ResetAnalysisButton />
                </div>
              </div>
            </Transition>
            );
    }
}


export default easyComp(TypeOfAnalysisTransitionContainer);