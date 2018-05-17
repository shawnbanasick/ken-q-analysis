import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import excelType2 from "../../../images/excelType2Image.png";
import DropzoneExcel2 from "../../UploadFile/Dropzones/DropzoneExcel2";

const styles = {
  width: 250,
  height: 175,
  margin: 10
};

const ExcelType2Card = () => (
  <Card id="type2Card" style={{ margin: 10 }}>
    <Image style={styles} src={excelType2} />
    <Card.Content>
      <Card.Header>Type 2 - Q-sort Data in Rows</Card.Header>
      <Card.Meta />
      <Icon name="download" />
      <a
        href="https://docs.google.com/spreadsheets/d/1mFnUSbqtQxJgBhlZbeKSo-xMSUDNpBD9JElI1k9xAg4/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        style={{ targetNew: "tab", color: "firebrick", fontSize: 18 }}
      >
        Click here to get a sample file
      </a>
      <DropzoneExcel2 />
    </Card.Content>
    <Card.Content extra />
  </Card>
);

export default ExcelType2Card;
