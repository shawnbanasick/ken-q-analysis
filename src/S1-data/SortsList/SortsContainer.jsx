import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import SortsHeader from "../SortsHeader/SortsHeader";
import SortsList from "./SortsList";
import StartAnalysisModalButton from "../StartAnalysisModalButton";

class qSortsContainer extends Component {
    render() {
        let sortsDisplayText = store.getState("sortsDisplayText");

        let isVisible = false;
        if (sortsDisplayText) {
            isVisible = true;
        }
        return (
            <Transition visible={ isVisible } animation="fade" duration={ 1000 }>
              <div>
                <SortsHeader />
                <SortsList sortsDisplayText={ sortsDisplayText } />
                <StartAnalysisModalButton />
              </div>
            </Transition>
            );
    }
}

export default easyComp(qSortsContainer);
