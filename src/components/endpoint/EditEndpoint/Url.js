import React from 'react';
import { compose } from 'recompose';
import { withAccount } from '../../../contexts/Account';
import { Form, Input } from 'semantic-ui-react';

const Url = ({ endpointEditor, account, nextButton, disabled }) => (
  <Form>
    <Form.Field required>
      <label>URL</label>
      <Input
        disabled={disabled}
        label={`${process.env.API_URL}/webhook/${account.organisationName}/`}
        placeholder="my/custom/url"
        name="path"
        value={endpointEditor.endpoint.path}
        onChange={(event, data) => endpointEditor.onUrlChange(data.value)}
      />
    </Form.Field>
    {!!nextButton && nextButton()}
  </Form>
);

export default compose(withAccount)(Url);
