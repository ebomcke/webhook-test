import React, { Component } from 'react';
import { Segment, Header, Icon, Message } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withNavigation } from '../../contexts/Navigation';
import { withAccount } from '../../contexts/Account';
import Wizard from '../base/Wizard';
import { EditEndpointUrl, EditEndpointResponse } from './EditEndpoint';

class NewEndpointWizard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { endpointEditor } = this.props;
    const {
      endpoint,
    } = endpointEditor;
    const steps = [
      {
        key: 'url',
        icon: 'at',
        title: 'URL',
        description: 'Choose a URL',
        render: nextButton => (
          <EditEndpointUrl
            endpointEditor={endpointEditor}
            nextButton={nextButton}
          />
        ),
        nextDisabled: () => !endpoint.path,
      },
      {
        key: 'response',
        icon: 'code',
        title: 'Response',
        description: 'Set the default response',
        render: nextButton => (
          <EditEndpointResponse renderMessage={true}
            endpointEditor={endpointEditor}
            nextButton={nextButton}
          />
        ),
      },
      {
        key: 'done',
        title: "You're done",
        render: nextButton => (
          <div>
            <Message icon positive>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>Congratulations !</Message.Header>
                <p>You are now ready to receive your first webhook.</p>
              </Message.Content>
            </Message>
            {nextButton()}
          </div>
        ),
      },
    ];
    return (
      <Segment className="full-height">
        <Header as="h1">New endpoint</Header>
        <Wizard steps={steps} onComplete={endpointEditor.save} />
      </Segment>
    );
  }
}

export default compose(
  withNavigation,
  withAccount,
)(NewEndpointWizard);
