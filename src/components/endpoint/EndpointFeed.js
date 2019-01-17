import React from 'react';
import { Feed, Button } from 'semantic-ui-react';
import EndpointItem from './EndpointItem';
import { compose } from 'recompose';
import { withNavigation } from '../../contexts/Navigation';
import { withEndpoints } from '../../contexts/Endpoints';

const EndpointFeed = ({ endpoints, navigate }) => (
  <Feed>
    <Button
      size="big"
      content="New endpoint"
      icon="plus"
      onClick={() =>
        navigate({
          name: 'NewEndpoint',
        })
      }
    />
    {endpoints.map(endpoint => (
      <EndpointItem key={endpoint.id} endpoint={endpoint} />
    ))}
  </Feed>
);

export default compose(withNavigation, withEndpoints)(EndpointFeed);
