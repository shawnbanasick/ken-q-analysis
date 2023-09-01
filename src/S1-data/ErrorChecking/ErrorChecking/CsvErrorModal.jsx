import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import "./styles.css";
import S1DataSlice from "../../../State/S1DataSlice";

const modalElement = document.getElementById("modal-root");

export function Modal({ children, fade = false, defaultOpened = false }, ref) {
  const { showCsvErrorModal } = S1DataSlice();
  // const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? "modal-fade" : ""}`}>
        <div className="modal-overlay" onClick={close} />
        <span
          role="button"
          className="modal-close"
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(Modal);

/*
    handleClose = () => {
        store.setState({
            showCsvErrorModal: false
        });
    };

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
        return (
          <div>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
      </div>
      );
      */
