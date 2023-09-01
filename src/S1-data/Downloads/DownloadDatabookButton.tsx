import React, { useState } from "react";
import * as docx from "docx";
import * as FileSaver from "file-saver";
import generateSortMaps from "./DataBook/generateSortMaps";

import generateStatementsList from "./DataBook/generateStatementsList";
import {
  Document,
  convertInchesToTwip,
  AlignmentType,
  LevelFormat,
} from "docx";
import S1DataSlice from "../../State/S1DataSlice";
import ExportGeneralButton from "../../ReusableComponents/ExportGeneralButton";

const DownloadDatabookButton = () => {
  const {
    qSortPattern,
    respondentNames,
    mainDataObject,
    statementNumArray,
    multiplierArray,
    statements,
    projectName,
  } = S1DataSlice();

  const [buttonColor, setButtonColor] = useState(
    "bg-gray-200 hover:bg-gray-400"
  );

  const handleClick = async () => {
    const generatedString: any = await generateSortMaps(
      qSortPattern,
      respondentNames,
      mainDataObject,
      statementNumArray,
      multiplierArray
    );

    /*
    console.log(qSortPattern);
    console.log(respondentNames);
    console.log(mainDataObject);
    console.log(statementNumArray);
    console.log(multiplierArray);
    console.log(statements.length);
    console.log(projectName);
    console.log(statementNumArray);
    */

    const statementsList = generateStatementsList(
      statements,
      projectName,
      respondentNames
    );

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              font: "Courier New",
              size: 24,
            },
          },
        ],
      },
      numbering: {
        config: [
          {
            levels: [
              {
                level: 0,
                format: LevelFormat.UPPER_ROMAN,
                text: "%1",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
            ],
            reference: "my-crazy-reference",
          },
          {
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: "%1",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.3),
                      hanging: convertInchesToTwip(0.3),
                    },
                  },
                },
              },
            ],
            reference: "my-number-numbering-reference",
          },
          {
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL_ZERO,
                text: "[%1]",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
            ],
            reference: "padded-numbering-reference",
          },
        ],
      },
      sections: [
        {
          children: statementsList,
        },
        {
          children: generatedString,
        },
      ],
    });

    let currentdate = new Date();
    let datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      "_" +
      currentdate.getHours() +
      "-" +
      currentdate.getMinutes();

    docx.Packer.toBlob(doc).then((blob) => {
      // console.log(blob);
      FileSaver.saveAs(blob, `Ken-Q - ${projectName} - ${datetime}.docx`);
      console.log("Document created successfully");
    });
    setButtonColor("bg-green-300 hover:bg-green-400");
  };

  return (
    <ExportGeneralButton
      handleClick={handleClick}
      buttonText={"Download Databook docx"}
      buttonColor={buttonColor}
    />
  );
};
export default DownloadDatabookButton;
