import React from 'react';
import { create } from 'react-test-renderer';
import { Dropdown } from 'semantic-ui-react';
import SearchDropdown from './SearchDropdown';

const filterContent = {
  type: 'content',
  value: 'unit-test',
};
const filterEndpoint = {
  type: 'path',
  value: 'unit-test-1',
};

describe('Rendering tests', () => {
  test('No filters', () => {
    const searchDropdown = create(<SearchDropdown filters={[]} />);
    expect(searchDropdown.toJSON()).toMatchSnapshot();
  });

  test('Content filter', () => {
    const searchDropdown = create(<SearchDropdown filters={[filterContent]} />);
    expect(searchDropdown.toJSON()).toMatchSnapshot();
  });

  test('Path filter', () => {
    const searchDropdown = create(
      <SearchDropdown filters={[filterEndpoint]} />,
    );
    expect(searchDropdown.toJSON()).toMatchSnapshot();
  });

  test('Both filters', () => {
    const searchDropdown = create(
      <SearchDropdown filters={[filterEndpoint, filterContent]} />,
    );
    expect(searchDropdown.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  let searchDropdown;
  const updateFilters = jest.fn();

  beforeEach(() => {
    searchDropdown = create(
      <SearchDropdown
        filters={[filterEndpoint, filterContent]}
        updateFilters={updateFilters}
      />,
    );
    updateFilters.mockClear();
  });

  test('Select endpoint adds an endpoint filter and preserves content filters only', () => {
    searchDropdown.root.findByType(Dropdown).props.onChange(null, {
      value: ['endpoint-2', 'unit-test'],
    });
    expect(updateFilters.mock.calls.length).toBe(1);
    expect(updateFilters.mock.calls[0][0]).toMatchSnapshot();
  });

  test('Add item adds a content filter and preserves existing filters', () => {
    searchDropdown.root.findByType(Dropdown).props.onAddItem(null, {
      value: 'new-filter',
    });
    expect(updateFilters.mock.calls.length).toBe(1);
    expect(updateFilters.mock.calls[0][0]).toMatchSnapshot();
  });

  test('Remove endpoint updates filters', () => {
    // Mock event and value as semantic UI library relies on it
    const label = searchDropdown.root.findByProps({ value: 'endpoint-1' });
    label.findByProps({ className: 'delete icon' }).props.onClick(
      {
        stopPropagation: jest.fn(),
      },
      {
        value: 'endpoint-1',
      },
    );
    expect(updateFilters.mock.calls.length).toBe(1);
    expect(updateFilters.mock.calls[0][0]).toMatchSnapshot();
  });

  test('Remove content updates filters', () => {
    // Mock event and value as semantic UI library relies on it
    const label = searchDropdown.root.findByProps({ value: 'unit-test' });
    label.findByProps({ className: 'delete icon' }).props.onClick(
      {
        stopPropagation: jest.fn(),
      },
      {
        value: 'endpoint-1',
      },
    );
    expect(updateFilters.mock.calls.length).toBe(1);
    expect(updateFilters.mock.calls[0][0]).toMatchSnapshot();
  });
});
