import React, { Component } from 'react';
import { FirestoreProvider } from 'react-firestore';
import firebase, { FirebaseProvider } from './contexts/Firebase';
import { NavigationProvider } from './contexts/Navigation';
import AccountProvider from './contexts/Account';
import EndpointsProvider from './contexts/Endpoints';
import WebhooksProvider from './contexts/Webhooks';
import Header from './components/base/Header';
import SignIn from './views/SignIn';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      account: {},
    };
  }

  componentDidMount() {
    this.registerAuthObserver();
  }

  componentWillUnmount() {
    if (this.unregisterAuthObserver) this.unregisterAuthObserver();
  }

  registerAuthObserver = () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          {
            account: {
              uid: user.uid,
              name: user.displayName,
              photo: user.photoURL,
            },
          },
          this.createOrGetAccount,
        );
      } else {
        this.setState({ authenticated: false, account: null });
        this.props.router.history.navigate('/sign-in', 'REPLACE');
      }
    });
  }

  createOrGetAccount = async () => {
    const accountRef = firebase
      .firestore()
      .collection('accounts')
      .doc(this.state.account.uid);
    const accountSnapshot = await accountRef.get();
    let account;
    if (!accountSnapshot.exists) {
      account = this.state.account;
      account.confirmed = false;
      account.date = firebase.firestore.Timestamp.now();
      await accountRef.set(account);
    } else {
      account = accountSnapshot.data();
    }
    this.setState({
      authenticated: true,
      account,
    });
    if (!account.confirmed) {
      this.props.router.history.navigate('/create-account', 'REPLACE');
    } else {
      this.props.router.history.navigate(this.getNextLocation(), 'REPLACE');
    }
  }

  getNextLocation = () => {
    const { location } = this.props.response;
    let next = location.pathname !== '/sign-in' ? location.pathname : '/';
    return next;
  }

  render() {
    const { response, router } = this.props;
    const { body: Body, location } = response;
    return (
      <FirebaseProvider>
        <FirestoreProvider firebase={firebase} useTimestampsInSnapshots={true}>
          <AccountProvider account={this.state.account}>
            <EndpointsProvider account={this.state.account}>
              <WebhooksProvider account={this.state.account}>
                <NavigationProvider router={router} response={response}>
                  {this.state.authenticated ? (
                    <React.Fragment>
                      <header>
                        <Header />
                      </header>
                      <main>
                        <Body
                          response={response}
                          router={router}
                          location={location}
                        />
                      </main>
                    </React.Fragment>
                  ) : (
                    <SignIn />
                  )}
                </NavigationProvider>
              </WebhooksProvider>
            </EndpointsProvider>
          </AccountProvider>
        </FirestoreProvider>
      </FirebaseProvider>
    );
  }
}
