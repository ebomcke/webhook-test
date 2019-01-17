import React, { Component, Suspense } from 'react';
import { Form, Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { compose } from 'recompose';
import { withAccount } from '../../contexts/Account';
const JsonEditor = React.lazy(() =>
  import(/* webpackChunkName: "JsonEditor" */ '../base/JsonEditor'),
);
import EndpointChooser from '../endpoint/EndpointChooser';

class WebhookTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: JSON.stringify(
        {
          status: 'OK',
        },
        null,
        2,
      ),
      endpoint: props.endpoint,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleEndpointSelect = this.handleEndpointSelect.bind(this);
    this.handleJsonInputChange = this.handleJsonInputChange.bind(this);
  }

  async sendMessage() {
    const { account, onComplete } = this.props;
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `${process.env.API_URL}/webhook/${account.organisationName}/${
          this.state.endpoint.path
        }`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSON.parse(this.state.body)),
        },
      );
      if (response.status !== this.state.endpoint.defaultResponse.statusCode) {
        this.setState({ isLoading: false, isError: true });
      } else {
        onComplete && onComplete();
      }
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false, isError: true });
    }
  }

  handleEndpointSelect(endpoint) {
    this.setState({
      endpoint: endpoint,
    });
  }

  handleJsonInputChange(value) {
    try {
      JSON.parse(value);
      this.setState({
        body: value,
      });
    } catch (e) {}
  }

  render() {
    const { endpoint } = this.props;
    return (
      <Form>
        {!endpoint && (
          <Form.Field required>
            <label>Url</label>
            <EndpointChooser onChange={this.handleEndpointSelect} />
          </Form.Field>
        )}
        <Form.Field>
          <label>Body</label>
          <Suspense
            fallback={
              <Segment>
                <Dimmer active inverted>
                  <Loader size="big" inverted>
                    Loading
                  </Loader>
                </Dimmer>
              </Segment>
            }
          >
            <JsonEditor
              height="300px"
              value={this.state.body}
              onChange={this.handleJsonInputChange}
            />
          </Suspense>
        </Form.Field>
        <Button
          onClick={this.sendMessage}
          loading={this.state.isLoading}
          disabled={!this.state.endpoint}
        >
          Send
        </Button>
      </Form>
    );
  }
}

export default compose(withAccount)(WebhookTester);
