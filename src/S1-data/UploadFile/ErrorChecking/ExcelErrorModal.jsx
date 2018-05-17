import store from '../../../store';
import React, { Component } from 'react'
import { easyComp } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class ExcelErrorModal extends Component {

    handleClose = () => {
        store.setState({
            showExcelErrorModal: false
        });
    };

    render() {
        let showExcelErrorModal = store.getState("showExcelErrorModal");
        let errormessage1 = store.getState("excelErrorMessage1");
        if (showExcelErrorModal) {
            return (
                <Modal open={ showExcelErrorModal } onClose={ this.handleClose }>
                  <Header icon="browser" content="Error Checking" />
                  <Modal.Content>
                    <span style={ { fontSize: 30, display: "block" } }>
                                                                                                                                                                        { errormessage1 }
                                                                                                                                                                      </span>
                    <span style={ { fontSize: 22, display: "block" } }>
                                                                                                                                                                        Please check your Excel file data and try again
                                                                                                                                                                      </span>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button id="excelErrorModalGotItButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
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
export default easyComp(ExcelErrorModal);