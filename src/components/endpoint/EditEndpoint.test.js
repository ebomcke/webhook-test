import React from 'react';
import { create } from 'react-test-renderer';
import EditEndpoint from './EditEndpoint';

const endpointEditor = {
  save: jest.fn(),
  endpoint: {
    defaultResponseStatusCode: 200,
    defaultResponseBody: JSON.stringify({
      status: 'OK',
    }),
    path: 'unit-test-path',
  },
};

describe('Rendering tests', () => {
  test('Basic', () => {
    const editEndpoint = create(
      <EditEndpoint endpointEditor={endpointEditor} />,
    );
    expect(editEndpoint.toJSON()).toMatchSnapshot();
  });
});
