import React from 'react';
import { create } from 'react-test-renderer';
import WebhookFeed from './WebhookFeed';
jest.mock('../base/Timestamp');

describe('Rendering tests', () => {
  test('Initial rendering - populated list', () => {
    const webhookFeed = create(<WebhookFeed filters={[]} />);
    expect(webhookFeed.toJSON()).toMatchSnapshot();
  });

  test('Initial rendering - empty list', () => {
    const webhookFeed = create(<WebhookFeed webhooks={[]} filters={[]} />);
    expect(webhookFeed.toJSON()).toMatchSnapshot();
  });
});
