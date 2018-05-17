import React from "react";
import LipsetButton from "../DemoData/LipsetButton";
import { Card, Icon } from "semantic-ui-react";

const LipsetDemoDataCard = () => (
    <Card style={ { margin: 10 } }>
      <Card.Content>
        <Card.Header>Lipset</Card.Header>
        <Card.Meta>
          <span className="date">33 statements</span>
        </Card.Meta>
        <Card.Description>
          <Icon name="user" /> 9 Participants
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LipsetButton />
      </Card.Content>
    </Card>
);

export default LipsetDemoDataCard;
