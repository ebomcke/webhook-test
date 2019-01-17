import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirestore } from 'react-firestore';

const AccountContext = React.createContext({});

class AccountProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.registerUserWatcher = this.registerUserWatcher.bind(this);
    this.unregisterUserWatcher = this.unregisterUserWatcher.bind(this);
  }

  componentDidMount() {
    this.registerUserWatcher(this.props.account);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.unregisterUserWatcher();
      this.registerUserWatcher(nextProps.account);
    }
  }

  componentWillUnmount() {
    this.unregisterUserWatcher()
  }

  unregisterUserWatcher() {
    if (this.unsubscribe) {
        this.unsubscribe();
      }  
  }

  async registerUserWatcher(account) {
    if (account && account.uid) {
      const { firestore } = this.props;
      this.accountRef = firestore.collection('accounts').doc(account.uid);
      this.unsubscribe = this.accountRef.onSnapshot(acc => {
        let account = acc.data();
        account.id = acc.id;
        this.setState(account);
      });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <AccountContext.Provider
        value={{
          account: this.state,
        }}
      >
        {children}
      </AccountContext.Provider>
    );
  }
}

export default compose(withFirestore)(AccountProvider);

export const withAccount = Component => props => (
  <AccountContext.Consumer>
    {({ account }) => (
      <Component {...props} account={account} />
    )}
  </AccountContext.Consumer>
);
