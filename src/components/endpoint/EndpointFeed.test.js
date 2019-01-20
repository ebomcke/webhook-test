import React from 'react';
import { create } from 'react-test-renderer';
import EndpointFeed from './EndpointFeed';
import { Button } from 'semantic-ui-react';
jest.mock('./EndpointItem');

describe('Rendering tests', () => {
  test('Basic', () => {
    const endpointFeed = create(<EndpointFeed />);
    expect(endpointFeed.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  test('Click on new endpoints button navigates to new endpoint view', () => {
    const navigate = jest.fn();
    const endpointFeed = create(<EndpointFeed navigate={navigate} />);
    const button = endpointFeed.root.findByType(Button);
    button.props.onClick();
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toEqual({
      name: 'NewEndpoint',
    });
  });
});
