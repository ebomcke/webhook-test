import React from 'react';
import { Menu } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withFirebase } from '../../contexts/Firebase';
import { withNavigation } from '../../contexts/Navigation';

const Header = ({ navigate, firebase, responseName }) => (
  <Menu stackable secondary size="huge">
    <Menu.Menu position="right">
      <Menu.Item
        as="a"
        name="Home"
        active={responseName === 'Home'}
        onClick={() =>
          navigate({
            name: 'Home',
          })
        }
      />
      <Menu.Item
        as="a"
        name="Endpoints"
        active={responseName === 'Endpoints'}
        onClick={() =>
          navigate({
            name: 'Endpoints',
          })
        }
      />
      <Menu.Item as="a" name="Logout" onClick={() => firebase.auth().signOut()}>
        Logout
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default compose(
  withNavigation,
  withFirebase,
)(Header);
