import React, { Component } from 'react';
import { Feed, Icon, Segment, Modal } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withFirestore } from 'react-firestore';
import { withNavigation } from '../../contexts/Navigation';
import Timestamp from '../base/Timestamp';
import { withAccount } from '../../contexts/Account';

class WebhookItem extends Component {
  constructor(props) {
    super(props);
    this.deleteWebhook = this.deleteWebhook.bind(this);
  }

  async deleteWebhook() {
    const { webhook, firestore } = this.props;
    await firestore
      .collection('webhooks')
      .doc(webhook.id)
      .delete();
  }

  shortBody() {
    const { webhook } = this.props;
    let body = JSON.stringify(JSON.parse(webhook.body), null, 2);
    let lines = body.split(/\n/);
    if (lines.length > 5) {
      return lines
        .slice(0, 5)
        .concat('[...]', lines.slice(-1))
        .join('\r\n');
    }
    return body;
  }

  render() {
    const { webhook, account } = this.props;
    return (
      <Feed.Event>
        <Feed.Label>
          <Icon name="code" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            {`/${account.organisationName}/${webhook.path}`}
            <Feed.Date>
              <Timestamp timestamp={webhook.date} prefix="Received" />
            </Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            <Modal
              size="large"
              trigger={
                <Segment inverted>
                  <pre>
                    <code>{this.shortBody()}</code>
                  </pre>
                </Segment>
              }
            >
              <Modal.Header>Full message</Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  <Segment inverted>
                    <pre>
                      <code>
                        {JSON.stringify(JSON.parse(webhook.body), null, 2)}
                      </code>
                    </pre>
                  </Segment>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Feed.Extra>
          <Feed.Meta>
            <a name='delete-webhook-link' onClick={this.deleteWebhook}>
              <Icon name="remove" />
              Remove
            </a>
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
)(WebhookItem);
