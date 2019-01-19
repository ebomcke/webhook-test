import React from 'react';
import AccountEditor from './AccountEditor';
import renderer from 'react-test-renderer';

describe('Rendering tests', () => {
  test('Child inherits relevant props', () => {
    const account = {};
    const accountEditor = renderer.create(
      <AccountEditor account={account}>
        {accountEditor => <div accountEditor={accountEditor} />}
      </AccountEditor>,
    );
    let tree = accountEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  test('onOrganisationNameChange updates state value', () => {
    const account = {};
    const accountEditor = renderer.create(
      <AccountEditor account={account}>
        {accountEditor => <div hasEditor={true} accountEditor={accountEditor} />}
      </AccountEditor>,
    );

    accountEditor.root.children[0].props.accountEditor.onOrganisationNameChange('test-value');
    let tree = accountEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
