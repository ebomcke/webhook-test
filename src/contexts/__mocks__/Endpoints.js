import React from 'react';

const endpoints = [{
    id: 'endpoint-1',
    path: 'unit-test-1'
},{
    id: 'endpoint-2',
    path: 'unit-test-2'
}];

export const withEndpoints = jest.fn(Component => props => {
  if (props.endpoints) {
    return Component;
  }
  return (
    <Component
      {...props}
      endpoints={endpoints}
    />
  );
});
export default endpoints;
