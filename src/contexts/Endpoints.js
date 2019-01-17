import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirestore } from 'react-firestore';
import { withAccount } from './Account';

const EndpointsContext = React.createContext({});

class EndpointsProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoints: [],
    };
  }

  componentDidMount() {
    this.registerEndpointsWatcher(this.props.account);
  }

  componentWillUnmount() {
    this.unregisterEndpointsWatcher();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.unregisterEndpointsWatcher();
      this.registerEndpointsWatcher(nextProps.account);
    }
  }

  unregisterEndpointsWatcher = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  registerEndpointsWatcher = async account => {
    if (account && account.uid) {
      const { firestore } = this.props;
      const accountRef = firestore.collection('accounts').doc(account.uid);
      this.unsubscribe = firestore
        .collection('endpoints')
        .where('account', '==', accountRef)
        .orderBy('lastActive', 'desc')
        .onSnapshot(snapshot => {
          const endpoints = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({
            endpoints,
          });
        });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <EndpointsContext.Provider
        value={{
          endpoints: this.state.endpoints,
        }}
      >
        {children}
      </EndpointsContext.Provider>
    );
  }
}

export default compose(
  withFirestore,
  withAccount,
)(EndpointsProvider);

export const withEndpoints = Component => props => (
  <EndpointsContext.Consumer>
    {({ endpoints }) => <Component {...props} endpoints={endpoints} />}
  </EndpointsContext.Consumer>
);
