import React from "react";
import JapaneseButton from "../DemoData/JapaneseButton";
import { Card, Icon } from "semantic-ui-react";

const JapaneseDemoDataCard = () => (
  <Card style={{ margin: 10 }}>
    <Card.Content>
      <Card.Header>iPad Survey</Card.Header>
      <Card.Meta>
        <span className="date">60 statements (Japanese)</span>
      </Card.Meta>
      <Card.Description>
        <Icon name="user" /> 80 Participants
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <JapaneseButton />
    </Card.Content>
  </Card>
);

export default JapaneseDemoDataCard;
