import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import excelType1 from "../../../images/excelType1Image.png";
import DropzoneExcel1 from "../../UploadFile/Dropzones/DropzoneExcel1";

const styles = {
    width: 250,
    height: 175,
    margin: 10
};

const ExcelType1Card = () => (
    <Card style={ { margin: 10 } }>
      <Image style={ styles } src={ excelType1 } />
      <Card.Content>
        <Card.Header>Type 1 - Q-sort Data in Columns</Card.Header>
        <Card.Meta />
        <Icon name="download" />
        <a href="https://docs.google.com/spreadsheets/d/1AgQj1Fd31oigDRLj_X6nYvQLcvSRzmZMOlwcpu2Yxik/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={ { targetNew: "tab", color: "firebrick", fontSize: 18 } }>
            Click here to get a sample file
          </a>
        <DropzoneExcel1 />
      </Card.Content>
      <Card.Content extra />
    </Card>
);

export default ExcelType1Card;
