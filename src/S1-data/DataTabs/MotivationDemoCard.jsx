import React from "react";
import { Card, Icon } from "semantic-ui-react";
import MotivationButton from "../DemoData/MotivationalButton";

const MotivationDemoDataCard = () => (
    <Card style={ { margin: 10 } }>
      <Card.Content>
        <Card.Header>Motivational</Card.Header>
        <Card.Meta>
          <span className="date">80 statements</span>
        </Card.Meta>
        <Card.Description>
          <Icon name="user" /> 120 Participants
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <MotivationButton />
      </Card.Content>
    </Card>
);

export default MotivationDemoDataCard;
