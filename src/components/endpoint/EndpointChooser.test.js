import React from 'react';
import { create } from 'react-test-renderer';
import EndpointChooser from './EndpointChooser';
import endpoints from '../../contexts/Endpoints';
import { Dropdown } from 'semantic-ui-react';

const onChange = jest.fn();

describe('Rendering tests', () => {
  test('Basic', () => {
    const endpointChooser = create(<EndpointChooser />);
    expect(endpointChooser.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  afterEach(() => {
    onChange.mockClear();
  });

  test('Selecting an endpoint calls onchange with the right endpoint object', () => {
    const endpointChooser = create(<EndpointChooser onChange={onChange}/>);
    const dropdown = endpointChooser.root.findByType(Dropdown);
    dropdown.props.onChange(null, {
      value: endpoints[0].id,
    });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(endpoints[0]);
  });
});
