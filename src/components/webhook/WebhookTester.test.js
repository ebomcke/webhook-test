import React from 'react';
import { create } from 'react-test-renderer';
import WebhookTester from './WebhookTester';
import EndpointChooser from '../endpoint/EndpointChooser';
import JsonEditor from '../base/JsonEditor';

describe('Rendering tests', () => {
  test('No endpoint provided - dropdown rendered', () => {
    const webhookTester = create(<WebhookTester />);
    expect(webhookTester.toJSON()).toMatchSnapshot();
  });

  test('Endpoint provided - no dropdown rendered', () => {
    const endpoint = {
      path: 'unit-test',
    };
    const webhookTester = create(<WebhookTester endpoint={endpoint} />);
    expect(webhookTester.toJSON()).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  let webhookTester;
  beforeEach(() => {
    webhookTester = create(<WebhookTester />);
  });
  test('Selecting endpoint updates the state', () => {
    const endpointChooser = webhookTester.root.findByType(EndpointChooser);
    const endpoint = {
      path: 'selected-endpoint',
    };
    endpointChooser.props.onChange(endpoint);
    const instance = webhookTester.root.children[0].instance;
    expect(instance.state.endpoint).toEqual(endpoint);
  });

  test('Updating JSON body updates the state', () => {
    const jsonEditor = webhookTester.root.findByType(JsonEditor);
      const newBody = JSON.stringify({
          updated: 'value',
      });
    jsonEditor.props.onChange(
      newBody,
    );
    const instance = webhookTester.root.children[0].instance;
    expect(instance.state.body).toEqual(newBody);
  });

  test('Updating JSON body does not update the state if json is invalid', () => {
    const jsonEditor = webhookTester.root.findByType(JsonEditor);
    const instance = webhookTester.root.children[0].instance;
    const body = instance.state.body;
    jsonEditor.props.onChange('{ "invalid": json');
    expect(instance.state.body).toEqual(body);
  });
});
