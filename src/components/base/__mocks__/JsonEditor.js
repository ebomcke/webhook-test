import React from 'react';

const JsonEditor = props => (
  <div>
    This is a placeholder for the JSON editor.
    <pre>
      <code>{JSON.stringify(props)}</code>
    </pre>
  </div>
);

export default JsonEditor;