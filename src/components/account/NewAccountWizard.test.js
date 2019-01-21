import React from 'react';
import { create } from 'react-test-renderer';
import NewAccountWizard from './NewAccountWizard';

jest.mock('./AccountEditor');
import { mockAccountEditor } from './AccountEditor';
jest.mock('../endpoint/EndpointEditor');
import { mockEndpointEditor } from '../endpoint/EndpointEditor';

describe('Rendering tests', () => {
  test('Step 1 - organisation name', () => {
    const newAccountWizard = create(
      <NewAccountWizard
        accountEditor={mockAccountEditor}
        endpointEditor={mockEndpointEditor}
      />,
    );
    expect(newAccountWizard.toJSON()).toMatchSnapshot();
  });

  test('Step 2 - endpoint url', () => {
    const newAccountWizard = create(
      <NewAccountWizard
        accountEditor={mockAccountEditor}
        endpointEditor={mockEndpointEditor}
      />,
    );
    const nextButton = newAccountWizard.root.findByProps({
      wizardIdentifier: 'next-done-button',
    });
    nextButton.props.onClick();
    expect(newAccountWizard.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  afterEach(() => {
    mockAccountEditor.save.mockClear();
    mockEndpointEditor.save.mockClear();
  });
  test('Save triggers account & endpoint save and navigates home', async () => {
    const navigate = jest.fn();
    const newAccountWizard = create(
      <NewAccountWizard
        accountEditor={mockAccountEditor}
        endpointEditor={mockEndpointEditor}
        navigate={navigate}
      />,
    );
    const nextButton = newAccountWizard.root.findByProps({
      wizardIdentifier: 'next-done-button',
    });
    nextButton.props.onClick();
    const doneButton = newAccountWizard.root.findByProps({
      wizardIdentifier: 'next-done-button',
    });
    await doneButton.props.onClick();
    expect(mockAccountEditor.save.mock.calls.length).toBe(1);
    expect(mockEndpointEditor.save.mock.calls.length).toBe(1);
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toEqual({
      name: 'Home',
    });
  });
});
