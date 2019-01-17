import React from 'react';
import firebase from './firebase';

const FirebaseContext = React.createContext({});

export const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider
    value={{
      firebase: firebase,
      uiConfig: {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      },
    }}
  >
    {children}
  </FirebaseContext.Provider>
);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {({ firebase, uiConfig }) => (
      <Component {...props} firebase={firebase} uiConfig={uiConfig} />
    )}
  </FirebaseContext.Consumer>
);

export default firebase;
