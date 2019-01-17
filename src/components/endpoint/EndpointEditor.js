import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirestore } from 'react-firestore';
import { withFirebase } from '../../contexts/Firebase';
import { withAccount } from '../../contexts/Account';
import { withNavigation } from '../../contexts/Navigation';

class EndpointEditor extends Component {
  constructor(props) {
    super(props);
    let { endpoint } = this.props;
    if (!endpoint) {
      endpoint = this.generateNewEndpoint();
    }
    this.state = {
      id: endpoint.id,
      path: endpoint.path,
      defaultResponseBody: endpoint.defaultResponse.body,
      defaultResponseStatusCode: endpoint.defaultResponse.statusCode,
    };
  }

  generateNewEndpoint = () => ({
    path: '',
    defaultResponse: {
      statusCode: 200,
      body: JSON.stringify(
        {
          status: 'OK',
        },
        null,
        2,
      ),
    },
  });

  onStatusCodeChange = (statusCode) => {
    this.setState({
      defaultResponseStatusCode: statusCode,
    });
  }

  onUrlChange = (url) => {
    url = url
      .toLowerCase()
      .replace(/ /gi, '')
      .replace(/^\//, '');
    this.setState({
      path: url,
    });
  }

  onResponseBodyChange = (value) => {
    try {
      JSON.parse(value);
      this.setState({
        defaultResponseBody: value,
      });
    } catch (e) {}
  }

  save = async () => {
    const { firebase, firestore, account, navigate } = this.props;
    let endpoint = {
      account: firestore.collection('accounts').doc(account.id),
      path: this.state.path,
      lastActive: firebase.firestore.Timestamp.now(),
      defaultResponse: {
        statusCode: this.state.defaultResponseStatusCode,
        body: this.state.defaultResponseBody,
      },
    };
    if (this.state.id) {
      endpoint.id = this.state.id;
    }
    if (endpoint.id) {
      await firestore
        .collection('endpoints')
        .doc(endpoint.id)
        .set(endpoint);
    } else {
      await firestore.collection('endpoints').add(endpoint);
    }
    navigate({
      name: 'Endpoints',
    });
  }

  render() {
    const { children } = this.props;
    return children({
      endpoint: this.state,
      onResponseBodyChange: this.onResponseBodyChange,
      onUrlChange: this.onUrlChange,
      onStatusCodeChange: this.onStatusCodeChange,
      save: this.save,
    });
  }
}

export default compose(
  withFirebase,
  withFirestore,
  withNavigation,
  withAccount,
)(EndpointEditor);
