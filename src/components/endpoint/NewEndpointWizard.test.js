import React from 'react';
import { create } from 'react-test-renderer';
import NewEndpointWizard from './NewEndpointWizard';

jest.mock('./EndpointEditor');
import { mockEndpointEditor } from './EndpointEditor';

describe('Rendering tests', () => {
  test('Step 1 - endpoint url', () => {
    const newEndpointWizard = create(
      <NewEndpointWizard endpointEditor={mockEndpointEditor} />,
    );
    expect(newEndpointWizard.toJSON()).toMatchSnapshot();
  });

  test('Step 2 - default response', () => {
    const newEndpointWizard = create(
      <NewEndpointWizard endpointEditor={mockEndpointEditor} />,
    );
    newEndpointWizard.root
      .findByProps({
        wizardIdentifier: 'next-done-button',
      })
      .props.onClick();
    expect(newEndpointWizard.toJSON()).toMatchSnapshot();
  });

  test('Step 3 - done', () => {
    const newEndpointWizard = create(
      <NewEndpointWizard endpointEditor={mockEndpointEditor} />,
    );
    newEndpointWizard.root
      .findByProps({
        wizardIdentifier: 'next-done-button',
      })
      .props.onClick();
    newEndpointWizard.root
      .findByProps({
        wizardIdentifier: 'next-done-button',
      })
      .props.onClick();
    expect(newEndpointWizard.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  afterEach(() => {
    mockEndpointEditor.save.mockClear();
  });
  test('Save triggers endpoint save', async () => {
    const newEndpointWizard = create(
      <NewEndpointWizard endpointEditor={mockEndpointEditor} />,
    );
    await newEndpointWizard.root
      .findByProps({
        wizardIdentifier: 'next-done-button',
      })
      .props.onClick();
    await newEndpointWizard.root
      .findByProps({
        wizardIdentifier: 'next-done-button',
      })
      .props.onClick();
    await newEndpointWizard.root
      .findByProps({
        wizardIdentifier: 'next-done-button',
      })
      .props.onClick();
    expect(mockEndpointEditor.save.mock.calls.length).toBe(1);
  });
});
