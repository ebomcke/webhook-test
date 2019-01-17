import React from 'react';
import {
  Container,
  Segment,
  Header,
} from 'semantic-ui-react';
import EndpointFeed from '../components/endpoint/EndpointFeed';

const Endpoints = () => (
  <Container>
    <Segment className="full-height">
      <Header as="h1">My endpoints</Header>
      <EndpointFeed />
    </Segment>
  </Container>
);

export default Endpoints;