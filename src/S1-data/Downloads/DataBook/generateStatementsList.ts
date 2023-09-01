import { Paragraph, HeadingLevel } from "docx";

const generateStatementsList = (
  statements: string[],
  projectName: string,
  respondentNames: string[]
) => {
  let currentdate = new Date();
  let minutes = currentdate.getMinutes();
  let newMinutes;
  if (minutes < 10) {
    newMinutes = `0${minutes}`;
  } else {
    newMinutes = minutes;
  }

  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    newMinutes;

  const statementsList = [
    new Paragraph({
      text: `Project: ${projectName}`,
      heading: HeadingLevel.HEADING_1,
      spacing: {
        after: 100,
      },
    }),
    new Paragraph({
      text: `Downloaded: ${datetime}`,
      spacing: {
        after: 50,
      },
    }),
    new Paragraph({
      text: `${statements.length} statements, ${respondentNames.length} participants`,
      spacing: {
        after: 400,
      },
    }),
    new Paragraph({
      text: "Statements",
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      spacing: {
        after: 400,
      },
    }),
  ];

  for (let i = 0; i < statements.length; i++) {
    let text = new Paragraph({
      text: statements[i].trim(),
      numbering: {
        reference: "my-number-numbering-reference",
        level: 0,
      },
    });
    statementsList.push(text);
  }

  return statementsList;
};
export default generateStatementsList;
