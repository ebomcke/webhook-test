import React from 'react';
import WebhookFeed from '../components/webhook/WebhookFeed';
import { Container, Segment, Header } from 'semantic-ui-react';

const Activity = () => (
  <Container>
    <Segment className="full-height">
      <Header as="h1">My activity</Header>
      <WebhookFeed />
    </Segment>
  </Container>
);

export default Activity;
