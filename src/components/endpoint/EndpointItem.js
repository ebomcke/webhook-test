import React, { Component } from 'react';
import { Feed, Segment, Icon, Modal } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withNavigation } from '../../contexts/Navigation';
import Timestamp from '../base/Timestamp';
import { withFirestore } from 'react-firestore';
import { withAccount } from '../../contexts/Account';
import WebhookTester from '../webhook/WebhookTester';

class EndpointItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testWebhookModalOpen: false,
    };
  }

  handleOpen = () => this.setState({ testWebhookModalOpen: true });

  handleClose = () => this.setState({ testWebhookModalOpen: false });

  openEndpoint = () => {
    this.props.navigate({
      name: 'Endpoint',
      params: {
        endpointId: this.props.endpoint.id,
      },
    });
  }

  shortResponse = () => {
    const { endpoint } = this.props;
    let response = JSON.stringify(
      JSON.parse(endpoint.defaultResponse.body),
      null,
      2,
    );
    let lines = [`HTTP ${endpoint.defaultResponse.statusCode}:`].concat(
      response.split(/\n/),
    );
    if (lines.length > 6) {
      lines = lines.slice(0, 6).concat('[...]', lines.slice(-1));
    }
    return lines.join('\r\n');
  }

  deleteEndpoint = async () => {
    const { endpoint, firestore } = this.props;
    await firestore
      .collection('endpoints')
      .doc(endpoint.id)
      .delete();
  }

  render() {
    const { endpoint, account } = this.props;
    return (
      <Feed.Event className="endpoint-feed-item">
        <Feed.Label>
          <Icon name="at" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <a onClick={this.openEndpoint}>{endpoint.path}</a>
            <Feed.Date>
              <Timestamp timestamp={endpoint.lastActive} prefix="Last active" />
            </Feed.Date>
          </Feed.Summary>
          <Feed.Extra>
            <p>
              URL:{' '}
              {`${process.env.API_URL}/webhook/${account.organisationName}/${
                endpoint.path
              }`}
            </p>
          </Feed.Extra>
          <Feed.Extra text>
            <div>Response:</div>
            <Segment inverted>
              <pre>
                <code>{this.shortResponse()}</code>
              </pre>
            </Segment>
          </Feed.Extra>
          <Feed.Meta>
            <a onClick={this.deleteEndpoint}>
              <Icon name="remove" />
              Remove
            </a>
            <Modal
              open={this.state.testWebhookModalOpen}
              onClose={this.handleClose}
              trigger={
                <a onClick={this.handleOpen}>
                  <Icon name="send" />
                  Send test message
                </a>
              }
            >
              <Modal.Header>Send test message</Modal.Header>
              <Modal.Content>
                <WebhookTester
                  endpoint={endpoint}
                  onComplete={this.handleClose}
                />
              </Modal.Content>
            </Modal>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default compose(
  withNavigation,
  withFirestore,
  withAccount,
)(EndpointItem);
