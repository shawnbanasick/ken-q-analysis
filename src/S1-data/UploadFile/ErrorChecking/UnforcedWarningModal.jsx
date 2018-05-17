import store from "../../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class UnforcedWarningModal extends Component {
  handleClose = () => {
    store.setState({
      showUnforcedWarningModal: false
    });
  };

  render() {
    let showUnforcedWarningModal = store.getState("showUnforcedWarningModal");
    let unforcedQsortsArrayText = store.getState("unforcedQsorts");
    if (showUnforcedWarningModal) {
      return (
        <Modal open={ showUnforcedWarningModal } onClose={ this.handleClose }>
          <Header icon="browser" content="Error Checking" />
          <Modal.Content>
            <span style={ { fontSize: 30, display: "block" } }>
                      Confirm unforced Q sorts:
                    </span>
            <span style={ { fontSize: 22, display: "block" } }>
                      { unforcedQsortsArrayText }
                    </span>
          </Modal.Content>
          <Modal.Actions>
            <Button id="unforcedWarningModalGotItButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
              <Icon name="checkmark" /> OK
            </Button>
          </Modal.Actions>
        </Modal>
        );
    } else {
      return null;
    }
  }
}
export default easyComp(UnforcedWarningModal);
