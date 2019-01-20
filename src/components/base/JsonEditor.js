import React, { Suspense } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import(/* webpackChunkName: "JsonEditor" */ 'brace');
import(/* webpackChunkName: "JsonEditor" */ 'brace/mode/json');
import(/* webpackChunkName: "JsonEditor" */ 'brace/theme/github');
const AceEditor = React.lazy(() =>
  import(/* webpackChunkName: "JsonEditor" */ 'react-ace'),
);

const JsonEditor = ({ height, value, onChange }) => (
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
    <AceEditor
      mode="json"
      theme="github"
      wrapEnabled={true}
      width="100%"
      height={height}
      value={value}
      onChange={onChange}
    />
  </Suspense>
);

export default JsonEditor;
