import S3DataSlice from "../../../State/S3DataSlice";
import S4DataSlice from "../../../State/S4DataSlice";
import checkForHeywoodCaseInCommunalities from "./checkForHeywoodCommunalities";

const doHeywoodCheck = (communalityArray, respondentNames, hasHeywoodCase) => {
  const heywoodCaseInCommunalities = checkForHeywoodCaseInCommunalities(
    communalityArray,
    respondentNames
  );

  S3DataSlice.setState({
    heywoodAdjustedMatrix: heywoodCaseInCommunalities.communalityArray,
  });

  const heywoodParticipantsTextArray =
    heywoodCaseInCommunalities.heywoodParticipantsTextArray;

  S3DataSlice.setState({
    heywoodParticipantsTextJoin: heywoodParticipantsTextArray.join(", "),
  });

  const heywoodParticipants =
    heywoodCaseInCommunalities.heywoodParticipantsArray || [];

  // if heywood present, update state
  if (heywoodParticipants.length > 0) {
    S3DataSlice.setState({
      showHeywoodCaseNotifications: true,
      heywoodParticipantsArray:
        heywoodCaseInCommunalities.heywoodParticipantsArray,
      heywoodParticipantsCommunalityArray:
        heywoodCaseInCommunalities.heywoodParticipantsCommunalityArray,
      showUnrotatedFactorTable: false,
      showEigenvaluesTable: false,
      showScreePlot: false,
      showKeepFacForRotButton: false,
    });
    S4DataSlice.setState({
      showKeepFacForRotButton: false,
    });
  } else {
    S3DataSlice.setState({
      showUnrotatedFactorTable: true,
      showEigenvaluesTable: true,
      showScreePlot: true,
      showKeepFacForRotButton: true,
    });

    S4DataSlice.setState({
      showKeepFacForRotButton: true,
    });
  }
};

export default doHeywoodCheck;
