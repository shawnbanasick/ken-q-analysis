import store from '../../../store';
import React, { Component } from 'react'
import { easyComp } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class CsvErrorModal extends Component {

    handleClose = () => {
        store.setState({
            showCsvErrorModal: false
        });
    };

    render() {
        let showCsvErrorModal = store.getState("showCsvErrorModal");
        let errormessage1 = store.getState("csvErrorMessage1");
        if (showCsvErrorModal) {
            return (
                <Modal open={ showCsvErrorModal } onClose={ this.handleClose }>
                  <Header icon="browser" content="Error Checking" />
                  <Modal.Content>
                    <span style={ { fontSize: 30, display: "block" } }>
                                           { errormessage1 }
                                         </span>
                    <span style={ { fontSize: 22, display: "block" } }>
                                         Please check your csv file data and try again
                                      </span>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button id="csvErrorModalGotItButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
                      <Icon name="checkmark" /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>

            )
        } else {
            return null;
        }
    }
}
export default easyComp(CsvErrorModal);