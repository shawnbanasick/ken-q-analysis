import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import excelType2 from "../../../images/kenqSampleImage.png";
import DropzoneExcel3 from "../../UploadFile/Dropzones/DropzoneExcel3";

const styles = {
  width: 250,
  height: 175,
  margin: 10
};

const ExcelType3Card = () => (
  <Card id="type3Card" style={{ margin: 10 }}>
    <Image style={styles} src={excelType2} />
    <Card.Content>
      <Card.Header>Type 3 - Ken-Q</Card.Header>
      <Card.Meta />
      <Card.Description>
        <Icon name="file excel outline" /> Data from a previous Ken-Q session
      </Card.Description>
      <DropzoneExcel3 />
    </Card.Content>
    <Card.Content extra />
  </Card>
);

export default ExcelType3Card;
