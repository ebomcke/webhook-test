import React from 'react';
import { Message, Icon, Feed } from 'semantic-ui-react';
import WebhookItem from './WebhookItem';
import WebhookTester from './WebhookTester';
import { compose } from 'recompose';
import { withWebhooks } from '../../contexts/Webhooks';
import SearchDropdown from './SearchDropdown';

const WebhookFeed = ({ webhooks, filters, updateFilters, endpoint }) => (
  <div>
    {webhooks.length > 0 || filters.length > 0 ? (
      <div>
        <SearchDropdown filters={filters} updateFilters={updateFilters} />
        <Feed>
          {webhooks.map(webhook => (
            <WebhookItem key={webhook.id} webhook={webhook} />
          ))}
        </Feed>
        {webhooks.length == 0 && (
          <Message icon>
            <Icon name="info" />
            <Message.Content>
              <Message.Header>
                I can't find any webhooks with these search criteria
              </Message.Header>
              Try to use less restrictive search criteria.
            </Message.Content>
          </Message>
        )}
      </div>
    ) : (
      <div>
        <Message icon>
          <Icon name="help" />
          <Message.Content>
            <Message.Header>
              Looks like I haven't received any webhook yet
            </Message.Header>
            If you'd like to test that everything works fine you can send a test
            webhook using the form below.
          </Message.Content>
        </Message>
        <WebhookTester endpoint={endpoint} />
      </div>
    )}
  </div>
);

export default compose(withWebhooks)(WebhookFeed);
