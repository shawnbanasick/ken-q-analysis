import store from "../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { mainCorrCalcs } from "../S2-corr/corrLogic/mainCorrCalcs";
import doInputErrorCheck from "./UploadFile/ErrorChecking/doInputErrorCheck";

const style = {
  margin: 12
};

let checkForErrors = [[""], [["", "", ""]], [""]];

class StartAnalysisButtonModal extends Component {
  store = {
    modalOpen: false,
    errorMessage1: "",
    errorMessage2: "",
    errorMessage3: "",
    errorMessage4: ""
  };

  handleOpen = () => {
    checkForErrors = doInputErrorCheck();
    // returns multiple values
    if (checkForErrors[0] === true) {
      this.store.errorMessage1 = checkForErrors[1][0];
      this.store.errorMessage2 = checkForErrors[1][1];
      this.store.errorMessage3 = checkForErrors[1][2];
      this.store.errorMessage4 = checkForErrors[3];
      this.store.modalOpen = true;
    } else {
      // start analysis with delay to show spinner
      store.setState({isLoadingBeginAnalysis: true});
      setTimeout(() => {
        let respondentNames = checkForErrors[4];
        let rawSortsArray = checkForErrors[5];
        mainCorrCalcs(respondentNames, rawSortsArray);
        store.setState({
          showFactorExtractionButtons: true
        });
      }, 10);
    }
  };

  handleClose = () => {
    this.store.modalOpen = false;
  };

  render() {
    let isActive = store.getState("activeStartAnalysisButton");
    let isLoadingBeginAnalysis = store.getState("isLoadingBeginAnalysis")
    return (
      <Modal
        trigger={
          <Button
            id="factorsKeptSubmitButton"
            className="instagram"
            loading={isLoadingBeginAnalysis}
            size={"big"}
            toggle
            active={isActive}
            style={style} // loading={isLoadingFactorsKept} //
            onClick={this.handleOpen}
          >
            Begin Analysis
          </Button>
        }
        open={this.store.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="browser" content="Error Checking" />
        <Modal.Content>
          <span style={{ fontSize: 30, display: "block" }}>
            {this.store.errorMessage1}
          </span>
          <span style={{ fontSize: 22, display: "block" }}>
            {this.store.errorMessage2}
          </span>
          <hr />
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="startAnalysisModalGotItButton"
            color="green"
            style={{ margin: 15 }}
            floated="right"
            onClick={this.handleClose}
            inverted
          >
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
        <Modal.Content>
          <span style={{ fontSize: 30, display: "block", marginTop: 35 }}>
            {this.store.errorMessage3}
          </span>
          <span style={{ fontSize: 22, display: "block", marginTop: 15 }}>
            {this.store.errorMessage4}
          </span>
        </Modal.Content>
      </Modal>
    );
  }
}

export default easyComp(StartAnalysisButtonModal);
