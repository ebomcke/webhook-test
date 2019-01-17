import React from 'react';
import Header from './Header';
import renderer from 'react-test-renderer';

describe('Rendering tests', () => {
  test('No active link', () => {
    const header = renderer.create(<Header />);
    let tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Home link active', () => {
    const header = renderer.create(<Header responseName={'Home'} />);
    let tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Endpoints link active', () => {
    const header = renderer.create(<Header responseName={'Endpoints'} />);
    let tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  const navigate = jest.fn();
  const signOut = jest.fn();
  const firebase = {
      auth: () => ({
          signOut
      })
  };
  const header = renderer.create(
    <Header responseName={'Home'} navigate={navigate} firebase={firebase} />,
  );

  afterEach(() => {
    navigate.mockClear();
  });

  test('Click on Home link navigates to Home view', () => {
    const homeLink = header.root.findByProps({ name: 'Home' });
    homeLink.props.onClick();

    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toEqual({
      name: 'Home',
    });
  });

  test('Click on Endpoints link navigates to Endpoints view', () => {
    const endpointsLink = header.root.findByProps({ name: 'Endpoints' });
    endpointsLink.props.onClick();

    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toEqual({
      name: 'Endpoints',
    });
  });

  test('Click on Logout link triggers firebase auth logout', () => {
    const endpointsLink = header.root.findByProps({ name: 'Logout' });
    endpointsLink.props.onClick();

    expect(signOut.mock.calls.length).toBe(1);
  });
});
