import React from 'react';

module.exports = {
  withAccount: jest.fn(Component => props => {
    if (props.account) {
      return Component;
    }
    return (
      <Component
        {...props}
        account={{
          organisationName: 'unit-test-org',
        }}
      />
    );
  }),
};
