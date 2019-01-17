import React from 'react';
import {
  Segment,
  Dimmer,
  Loader,
  Container,
  Placeholder,
} from 'semantic-ui-react';

export const Loading = () => (
  <Container className="login-container">
    <Segment className="segment-center">
      <Dimmer active>
        <Loader size="huge">Loading</Loader>
      </Dimmer>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
  </Container>
);
