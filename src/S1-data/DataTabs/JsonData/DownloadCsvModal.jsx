import store from "../../../store";
import React, { Component } from "react";
import downloadCSVdata from "./downloadCSVdata";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import './customCssModal.css';

class DownloadCsvModal extends Component {
    state = {
        modalOpen: false
    };

    handleOpen = () => {
        let isCsvDataUploaded = store.getState("csvData");
        if (isCsvDataUploaded === false) {
            this.setState({
                modalOpen: true
            });
        } else {
            console.log("download called here");
            downloadCSVdata();
        }
    };

    handleClose = () => this.setState({
        modalOpen: false
    });

    render() {
        return (
            <Modal trigger={ <Button id="downloadCsvModalButton" icon labelPosition="left" style={ { marginTop: 20 } } onClick={ this.handleOpen }>
                   <Icon name="download" />Export data as CSV
                 </Button> } open={ this.state.modalOpen } onClose={ this.handleClose } basic size="small">
              <Header icon="download" content="Export Error" />
              <Modal.Content>
                <span style={ { fontSize: 20 } }>
                                    No data to export. Upload a file first.
                                  </span>
              </Modal.Content>
              <Modal.Actions>
                <Button id="downloadCsvModalGotItButton" color="green" onClick={ this.handleClose } inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
            );
    }
}
export default DownloadCsvModal;
