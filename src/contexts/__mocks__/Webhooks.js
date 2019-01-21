import React from 'react';

const webhooks = [{
    id: 'webhook-1',
    path: 'webhook-path-1',
    body: JSON.stringify({
        unitTest: true
    }),
    date: 'webhook-date-1',
},{
    id: 'webhook-2',
    path: 'webhook-path-2',
    body: JSON.stringify({
        unitTest: true
    }),
    date: 'webhook-date-2',
}];

export const withWebhooks = jest.fn(Component => props => {
  if (props.webhooks) {
    return (
        <Component
          {...props}
        />
      );
  }
  return (
    <Component
      {...props}
      webhooks={webhooks}
    />
  );
});
export default webhooks;
