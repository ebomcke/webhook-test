import React from 'react';
import { Form, Message, Icon } from 'semantic-ui-react';
import JsonEditor from '../../base/JsonEditor';

const Response = ({ endpointEditor, nextButton, renderMessage }) => (
  <div>
    {!!renderMessage && (
      <Message icon>
        <Icon name="help" />
        <Message.Content>
          <Message.Header>This is optional</Message.Header>
          <p>
            If you're not sure what the default response should be you can
            safely leave this default value.
          </p>
        </Message.Content>
      </Message>
    )}
    <Form>
      <Form.Field>
        <Form.Select
          fluid
          name="defaultResponseStatusCode"
          onChange={(event, data) =>
            endpointEditor.onStatusCodeChange(data.value)
          }
          label="Status code"
          options={[
            { key: 1, text: '200 - OK', value: 200 },
            { key: 2, text: '201 - Created', value: 201 },
          ]}
          value={endpointEditor.endpoint.defaultResponseStatusCode}
        />
      </Form.Field>
      <Form.Field>
        <label>Response body</label>
        <JsonEditor
          height="300px"
          value={endpointEditor.endpoint.defaultResponseBody}
          onChange={endpointEditor.onResponseBodyChange}
        />
      </Form.Field>
      {nextButton()}
    </Form>
  </div>
);

export default Response;
