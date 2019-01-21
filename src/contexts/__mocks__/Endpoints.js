import React from 'react';

const endpoints = [{
    id: 'endpoint-1',
    path: 'unit-test-1',
    defaultResponse: {
      statusCode: 200,
      body: JSON.stringify({ unitTest: true})
    }
},{
    id: 'endpoint-2',
    path: 'unit-test-2',
    defaultResponse: {
      statusCode: 200,
      body: JSON.stringify({ unitTest: true})
    }
}];

export const withEndpoints = jest.fn(Component => props => {
  if (props.endpoints) {
    return (
      <Component
        {...props}
      />
    );
  }
  return (
    <Component
      {...props}
      endpoints={endpoints}
    />
  );
});
export default endpoints;
