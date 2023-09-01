import S1DataSlice from "../State/S1DataSlice";

export default function inputDataErrorMessage(message, explanation) {
  // catch input error
  S1DataSlice.setState({
    showErrorMessageBar: true,
    errorMessage: message,
    extendedErrorMessage: explanation,
    errorStackTrace: "no stack trace available",
  });
  return null;
}
