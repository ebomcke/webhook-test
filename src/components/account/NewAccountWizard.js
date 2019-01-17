import React, { Component } from 'react';
import { Segment, Header, Icon, Message, Form, Input } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withNavigation } from '../../contexts/Navigation';
import Wizard from '../base/Wizard';
import { EditEndpointUrl } from '../endpoint/EditEndpoint';

class NewAccountWizard extends Component {
  constructor(props) {
    super(props);
  }

  save = async () => {
    const { accountEditor, endpointEditor, navigate } = this.props;
    await accountEditor.save();
    await endpointEditor.save();
    navigate({
      name: 'Home',
    });
  };

  render() {
    const { accountEditor, endpointEditor } = this.props;
    const { account, handleInputChange } = accountEditor;
    const { endpoint, onUrlChange } = endpointEditor;
    const steps = [
      {
        key: 'organisation',
        title: 'Organisation name',
        description: 'Choose a name for your organisation',
        nextDisabled: () => !account.organisationName,
        message: () => (
          <Message icon>
            <Icon name="help" />
            <Message.Content>
              <Message.Header>Why do I need this?</Message.Header>
              <p>
                The organisation name that you choose will be used to create a
                unique URL prefix where you can send your webhooks.
              </p>
            </Message.Content>
          </Message>
        ),
        render: nextButton => (
          <Form>
            <Form.Field>
              <Form.Input
                label="Organisation name"
                fluid
                placeholder="mybrilliantcompany"
                name="organisationName"
                value={account.organisationName}
                onChange={event =>
                  handleInputChange({ event, name: 'organisationName' })
                }
              />
            </Form.Field>
            {nextButton()}
          </Form>
        ),
      },
      {
        key: 'url',
        icon: 'at',
        title: 'URL',
        description: 'Create your first URL',
        nextDisabled: () => !endpoint.path,
        render: nextButton => (
          <EditEndpointUrl
            endpointEditor={endpointEditor}
            nextButton={nextButton}
          />
        ),
      },
    ];
    return (
      <Segment className="full-height">
        <Header as="h1">Good to see you, {account.name}</Header>
        <Wizard steps={steps} onComplete={this.save} />
      </Segment>
    );
  }
}

export default compose(withNavigation)(NewAccountWizard);
