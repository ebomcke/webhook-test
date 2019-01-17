import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirestore } from 'react-firestore';
import { withAccount } from './Account';

const WebhooksContext = React.createContext({});

class WebhooksProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      webhooks: [],
    };
  }

  componentDidMount() {
    this.registerWebhooksWatcher(this.props.account);
  }

  componentWillUnmount() {
    this.unregisterWebhooksWatcher();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.unregisterWebhooksWatcher();
      this.registerWebhooksWatcher(nextProps.account);
    }
  }

  unregisterWebhooksWatcher = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  registerWebhooksWatcher = async account => {
    if (account && account.uid) {
      const { firestore } = this.props;
      const accountRef = firestore.collection('accounts').doc(account.uid);
      this.unsubscribe = firestore
        .collection('webhooks')
        .where('account', '==', accountRef)
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
          const webhooks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({
            webhooks,
          });
        });
    }
  };

  filteredWebhooks = () => {
    const { webhooks, filters } = this.state;
    let filteredWebhooks = webhooks.slice();
    if (filters.length > 0) {
      const pathFilters = filters.filter(f => f.type === 'path');
      const contentFilters = filters.filter(f => f.type === 'content');
      filteredWebhooks = filteredWebhooks.filter(
        webhook =>
          (pathFilters.length === 0 ||
            pathFilters.some(search => webhook.path.includes(search.value))) &&
          (contentFilters.length === 0 ||
            contentFilters.every(search =>
              webhook.body.includes(search.value),
            )),
      );
    }
    return filteredWebhooks;
  };

  updateFilters = filters => {
    this.setState({ filters });
  };

  render() {
    const { children } = this.props;
    return (
      <WebhooksContext.Provider
        value={{
          webhooks: this.filteredWebhooks(),
          filters: this.state.filters,
          updateFilters: this.updateFilters,
        }}
      >
        {children}
      </WebhooksContext.Provider>
    );
  }
}

export default compose(
  withFirestore,
  withAccount,
)(WebhooksProvider);

export const withWebhooks = Component => props => (
  <WebhooksContext.Consumer>
    {({ webhooks, filters, updateFilters }) => (
      <Component
        {...props}
        webhooks={webhooks}
        filters={filters}
        updateFilters={updateFilters}
      />
    )}
  </WebhooksContext.Consumer>
);
