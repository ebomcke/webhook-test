import React from 'react';
import { create } from 'react-test-renderer';
import Response from './Response';
import JsonEditor from '../../base/JsonEditor';

const endpointEditor = {
  onStatusCodeChange: jest.fn(),
  onResponseBodyChange: jest.fn(),
  endpoint: {
    defaultResponseStatusCode: 200,
    defaultResponseBody: JSON.stringify({
      status: 'OK',
    }),
  },
};

const nextButton = () => <div>Next button placeholder</div>;

describe('Rendering tests', () => {
  test('Without info message', () => {
    const response = create(
      <Response
        endpointEditor={endpointEditor}
        nextButton={nextButton}
        renderMessage={false}
      />,
    );
    expect(response.toJSON()).toMatchSnapshot();
  });

  test('With info message', () => {
    const response = create(
      <Response
        endpointEditor={endpointEditor}
        nextButton={nextButton}
        renderMessage={true}
      />,
    );
    expect(response.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  const response = create(
    <Response
      endpointEditor={endpointEditor}
      nextButton={nextButton}
      renderMessage={true}
    />,
  );

  afterEach(() => {
    endpointEditor.onStatusCodeChange.mockClear();
    endpointEditor.onResponseBodyChange.mockClear();
  });

  test('Changing the response status code updates the endpoint editor', () => {
    const statusCodeDropdown = response.root.findByProps({
      name: 'defaultResponseStatusCode',
    });
    statusCodeDropdown.props.onChange(null, {
      value: 201,
    });
    expect(endpointEditor.onStatusCodeChange.mock.calls.length).toBe(1);
    expect(endpointEditor.onStatusCodeChange.mock.calls[0][0]).toEqual(201);
  });

  test('Changing the response body updates the endpoint editor', () => {
    const jsonEditor = response.root.findByType(JsonEditor);
    const newBody = JSON.stringify({ from: 'unit-test' });
    jsonEditor.props.onChange(newBody);
    expect(endpointEditor.onResponseBodyChange.mock.calls.length).toBe(1);
    expect(endpointEditor.onResponseBodyChange.mock.calls[0][0]).toEqual(
      newBody,
    );
  });
});
