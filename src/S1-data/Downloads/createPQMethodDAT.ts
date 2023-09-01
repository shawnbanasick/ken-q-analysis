import checkUniqueParticipantName from "./checkUniqueParticipantName";

const createPQMethodDAT = (
  mainDataOject: any,
  multiplierArray: any,
  projectName: any,
  numStatements: number,
  respondentNames: string[]
) => {
  // project name = max 60 characters
  let projectNameText = projectName.substring(0, 60);
  let numSortsText = mainDataOject.length.toString().padStart(3, " ");
  let numStatementsText = numStatements.toString().padStart(3, " ");
  // min max value
  let refArray = [
    -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ];
  let minMaxArray: number[] = [];
  multiplierArray.forEach((value: any, index: any) => {
    if (value !== 0) {
      minMaxArray.push(refArray[index]);
    }
    return;
  });
  let minValueText = Math.min(...minMaxArray)
    .toString()
    .padStart(3, " ");
  let maxValueText = Math.max(...minMaxArray)
    .toString()
    .padStart(3, " ");
  let multiplierArrayText: string = ``;
  multiplierArray.forEach((value: any, index: any) => {
    multiplierArrayText += value.toString().padStart(3, " ");
  });

  let participantNames2 = respondentNames.map((name) => {
    return name.substring(0, 8);
  });

  let sortsTextArray: string[] = [];
  mainDataOject.forEach((item: any) => {
    let sortText = ``;
    item.rawSort.forEach((value: any) => {
      sortText += value.toString().padStart(2, " ");
    });
    sortsTextArray.push(sortText);
  });

  let participantNames = checkUniqueParticipantName(participantNames2);
  let participantNamesText: string[] = [];
  mainDataOject.forEach((participant: any, index: number) => {
    participantNamesText.push(
      `${participantNames[index].padEnd(10, " ")}${sortsTextArray[index]}\n`
    );
  });

  let firstRow =
    `  0${numSortsText}${numStatementsText} ${projectNameText}\n` +
    `${minValueText}${maxValueText}${multiplierArrayText}\n`;

  sortsTextArray.forEach((sortText, index) => {
    firstRow += `${participantNamesText[index]}`;
  });

  return firstRow;
};

export default createPQMethodDAT;
