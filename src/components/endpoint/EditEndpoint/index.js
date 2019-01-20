import React from 'react';
import { Form, Header } from 'semantic-ui-react';
import Url from './Url';
import Response from './Response';

const EditEndpoint = ({ endpointEditor }) => (
  <div>
    <Header as="h1">Edit endpoint</Header>
    <Url endpointEditor={endpointEditor} disabled={true} />
    <p />
    <Response
      renderMessage={false}
      endpointEditor={endpointEditor}
      nextButton={() => (
        <Form.Button name="endpoint-editor-save" onClick={endpointEditor.save}>
          Save
        </Form.Button>
      )}
    />
  </div>
);

export const EditEndpointUrl = Url;
export const EditEndpointResponse = Response;

export default EditEndpoint;
