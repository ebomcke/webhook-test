import React, { Component } from 'react';
import { FirestoreDocument } from 'react-firestore';
import {
  Container,
  Segment,
  Placeholder,
  Message,
} from 'semantic-ui-react';
import { compose } from 'recompose';
import { withNavigation } from '../contexts/Navigation';
import EndpointEditor from '../components/endpoint/EndpointEditor';
import EditEndpoint from '../components/endpoint/EditEndpoint';

class Endpoint extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params, navigate } = this.props;
    return (
      <FirestoreDocument
        path={`/endpoints/${params.endpointId}`}
        render={({ isLoading, data: endpoint, error }) => (
          <Container>
            <Segment className="full-height">
              {!!error && (
                <Message
                  negative
                  icon="warning sign"
                  header="Something is wrong..."
                  content="I can't retrieve the webhooks for this endpoint. Maybe try again later ?"
                  onClick={() => console.log(error)}
                />
              )}
              {isLoading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              ) : (
                <EndpointEditor endpoint={endpoint}>
                  {endpointEditor => (
                    <EditEndpoint endpointEditor={endpointEditor} />
                  )}
                </EndpointEditor>
              )}
            </Segment>
          </Container>
        )}
      />
    );
  }
}

export default compose(withNavigation)(Endpoint);
