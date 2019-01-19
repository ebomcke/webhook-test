import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { FirebaseAuth } from 'react-firebaseui';
import { compose } from 'recompose';
import { withFirebase } from '../contexts/Firebase';
import './SignIn.scss';

const SignIn = ({ firebase, uiConfig }) => (
  <Container>
    <div className="login-container">
      <Segment raised compact className="segment-center">
        <Header as="h2">Welcome to TestMyWebhook</Header>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Segment>
    </div>
  </Container>
);

export default compose(withFirebase)(SignIn);
