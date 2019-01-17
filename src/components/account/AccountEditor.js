import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirestore } from 'react-firestore';
import { withFirebase } from '../../contexts/Firebase';
import { withAccount } from '../../contexts/Account';

class AccountEditor extends Component {
  constructor(props) {
    super(props);
    let { account } = this.props;
    this.state = account;
  }

  handleInputChange = ({ event, name, data }) => {
    const target = event.target;
    let value;
    if (data) {
      value = data.value;
    } else {
      value = target.type === 'checkbox' ? target.checked : target.value;
    }
    if (!name) {
      name = target.name;
    }

    this.setState({
      [name]: value,
    });
  }

  save = async () => {
    const { firebase, firestore } = this.props;
    if (!this.state.confirmed) {
      this.state.confirmed = firebase.firestore.Timestamp.now();
    }
    await firestore
      .collection('accounts')
      .doc(this.state.id)
      .set(this.state);
    return this.state.id;
  }

  render() {
    const { children } = this.props;
    return children({
      account: this.state,
      handleInputChange: this.handleInputChange,
      save: this.save,
    });
  }
}

export default compose(
  withFirebase,
  withFirestore,
  withAccount
)(AccountEditor);
