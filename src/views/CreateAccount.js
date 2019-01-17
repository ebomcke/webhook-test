import React from 'react';
import { Container } from 'semantic-ui-react';
import AccountEditor from '../components/account/AccountEditor';
import NewAccountWizard from '../components/account/NewAccountWizard';
import EndpointEditor from '../components/endpoint/EndpointEditor';

const CreateAccount = () => (
  <Container>
    <AccountEditor>
      {accountEditor => (
        <EndpointEditor>
          {endpointEditor => (
            <NewAccountWizard
              accountEditor={accountEditor}
              endpointEditor={endpointEditor}
            />
          )}
        </EndpointEditor>
      )}
    </AccountEditor>
  </Container>
);

export default CreateAccount;
