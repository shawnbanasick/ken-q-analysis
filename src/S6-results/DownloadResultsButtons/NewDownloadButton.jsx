import store from "../../store";
import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { easyComp } from "react-easy-state";

class NewDownloadButton extends Component {
    state = {
        modalOpen: false
    };

    handleOpen = () => {
        let downloadTypeSelected = store.getState("downloadTypeSelected");
        if (downloadTypeSelected === false) {
            this.setState({
                modalOpen: true
            });
        }
    };

    handleClose = () => this.setState({
        modalOpen: false
    });

    render() {
        let isActive = store.getState("isActiveNewDownloadButton");
        let disabled = !isActive;
        return (
            <Modal trigger={ <a id="downloadAnchor">
                   <Button id="newDownloadButton" className="instagram" size={ "large" } toggle disabled={ disabled } onClick={ this.handleOpen }>
                     Download
                   </Button>
                 </a> } open={ this.state.modalOpen } onClose={ this.handleClose } basic size="small">
              <Header icon="browser" content="Analysis Output" />
              <Modal.Content>
                <h3>Please select the output type (Excel or CSV) first.</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button id="closeModalButton" color="green" onClick={ this.handleClose } inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
            );
    }
}


export default easyComp(NewDownloadButton);
