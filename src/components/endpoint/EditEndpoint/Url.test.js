import React from 'react';
import { create } from 'react-test-renderer';
import Url from './Url';

const endpointEditor = {
  onUrlChange: jest.fn(),
  endpoint: {
    path: 'unit-test-path',
  },
};

const nextButton = () => <div>Next button placeholder</div>;

describe('Rendering tests', () => {
  test('Without next button', () => {
    const url = create(
      <Url
        endpointEditor={endpointEditor}
        nextButton={false}
      />,
    );
    expect(url.toJSON()).toMatchSnapshot();
  });

  test('With next button', () => {
    const url = create(
      <Url
        endpointEditor={endpointEditor}
        nextButton={nextButton}
      />,
    );
    expect(url.toJSON()).toMatchSnapshot();
  });

  test('With url input disabled', () => {
    const url = create(
      <Url
        endpointEditor={endpointEditor}
        nextButton={nextButton}
        disabled={true}
      />,
    );
    expect(url.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  const url = create(
    <Url
      endpointEditor={endpointEditor}
      nextButton={nextButton}
      disabled={true}
    />,
  );
  
  test('Changing the url updates the endpoint editor', () => {
    const urlInput = url.root.findByProps({ name: 'path' });
    const newPath = 'unit-test-updated-path';
    urlInput.props.onChange(null, { value: newPath });
    expect(endpointEditor.onUrlChange.mock.calls.length).toBe(1);
    expect(endpointEditor.onUrlChange.mock.calls[0][0]).toEqual(
      newPath,
    );
  });
});
