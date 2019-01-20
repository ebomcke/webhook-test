import React from 'react';
import EndpointEditor from './EndpointEditor';
import renderer from 'react-test-renderer';

describe('Rendering tests', () => {
  test('New endpoint', () => {
    const endpointEditor = renderer.create(
      <EndpointEditor>
        {endpointEditor => <div endpointEditor={endpointEditor} />}
      </EndpointEditor>,
    );
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Existing endpoint', () => {
    const endpointEditor = renderer.create(
      <EndpointEditor
        endpoint={{
          id: 'existing-endpoint',
          path: 'existing-endpoint-path',
          defaultResponse: {
            statusCode: 418,
            body: JSON.stringify({ unitTest: 'true' }),
          },
        }}
      >
        {endpointEditor => <div endpointEditor={endpointEditor} />}
      </EndpointEditor>,
    );
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Interactions tests', () => {
  let endpointEditor;

  beforeEach(() => {
    endpointEditor = renderer.create(
        <EndpointEditor>
          {endpointEditor => (
            <div hasEditor={true} endpointEditor={endpointEditor} />
          )}
        </EndpointEditor>,
      );
  })

  test('onStatusCodeChange updates state value', () => {
    endpointEditor.root
      .findByProps({ hasEditor: true })
      .props.endpointEditor.onStatusCodeChange(418);
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onUrlChange updates state value', () => {
    endpointEditor.root
      .findByProps({ hasEditor: true })
      .props.endpointEditor.onUrlChange('new-url-value');
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onUrlChange validates url before updating state', () => {
    endpointEditor.root
      .findByProps({ hasEditor: true })
      .props.endpointEditor.onUrlChange('/NEW url Value');
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onResponseBodyChange updates state value', () => {
    endpointEditor.root
      .findByProps({ hasEditor: true })
      .props.endpointEditor.onResponseBodyChange(JSON.stringify({
          newBody: 'true'
      }));
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onResponseBodyChange validates JSON before updating state', () => {
    endpointEditor.root
      .findByProps({ hasEditor: true })
      .props.endpointEditor.onResponseBodyChange("{ 'incomplete': 'JSON");
    let tree = endpointEditor.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
