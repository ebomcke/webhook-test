import React from 'react';
import { create } from 'react-test-renderer';
import EndpointItem from './EndpointItem';

jest.mock('../base/Timestamp');

const endpoint = {
  id: 'endpoint',
  path: 'unit-test',
  lastActive: 'last-active',
  defaultResponse: {
    statusCode: 200,
    body: JSON.stringify({ unitTest: true }),
  },
};

describe('Rendering tests', () => {
  test('Response under threshold should be displayed in full', () => {
    const endpointItem = create(<EndpointItem endpoint={endpoint} />);
    expect(endpointItem.toJSON()).toMatchSnapshot();
  });

  test('Response over threshold should be shortened', () => {
    const endpointItem = create(
      <EndpointItem
        endpoint={Object.assign({}, endpoint, {
          defaultResponse: {
            body: JSON.stringify({
              first: 'line',
              second: 'line',
              third: 'line',
              fourth: 'line',
              fifth: 'line',
              sixth: 'line',
              seventh: 'line',
            }),
          },
        })}
      />,
    );
    expect(endpointItem.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  test('Clicking on the endpoint path should navigate to the endpoint view', () => {
    const navigate = jest.fn();
    const endpointItem = create(
      <EndpointItem endpoint={endpoint} navigate={navigate} />,
    );
    const openDetailsLink = endpointItem.root.findByProps({
      name: 'open-endpoint-link',
    });
    openDetailsLink.props.onClick();
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toEqual({
      name: 'Endpoint',
      params: {
        endpointId: endpoint.id,
      },
    });
  });
});
