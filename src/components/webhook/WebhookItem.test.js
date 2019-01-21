import React from 'react';
import { create } from 'react-test-renderer';
import WebhookItem from './WebhookItem';
jest.mock('../base/Timestamp');

import mockWebhooks from '../../contexts/Webhooks';

describe('Rendering tests', () => {
  test('Initial rendering - full body', () => {
    const webhookItem = create(<WebhookItem webhook={mockWebhooks[0]} />);
    expect(webhookItem.toJSON()).toMatchSnapshot();
  });

  test('Initial rendering - shortened body', () => {
    const webhookItem = create(<WebhookItem webhook={mockWebhooks[1]} />);
    expect(webhookItem.toJSON()).toMatchSnapshot();
  });
});
