import React from 'react';
import { compose } from 'recompose';
import { withAccount } from '../../contexts/Account';
import { Dropdown } from 'semantic-ui-react';
import { withEndpoints } from '../../contexts/Endpoints';

const EndpointChooser = ({ account, endpoints, onChange }) => (
  <Dropdown
    selection
    search
    options={endpoints.map(endpoint => ({
      text: `/${account.organisationName}/${endpoint.path}`,
      value: endpoint.id,
    }))}
    onChange={(event, data) =>
      onChange(endpoints.find(e => e.id === data.value))
    }
  />
);
export default compose(
  withAccount,
  withEndpoints,
)(EndpointChooser);
