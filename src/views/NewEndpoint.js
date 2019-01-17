import React from 'react';
import { Container } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withNavigation } from '../contexts/Navigation';
import EndpointEditor from '../components/endpoint/EndpointEditor';
import NewEndpointWizard from '../components/endpoint/NewEndpointWizard';

const NewEndpoint = () => (
  <Container>
      <EndpointEditor>
        {(endpointEditor) => (
          <NewEndpointWizard
            endpointEditor={endpointEditor}
          />
        )}
      </EndpointEditor>
  </Container>
);

export default compose(withNavigation)(NewEndpoint);
