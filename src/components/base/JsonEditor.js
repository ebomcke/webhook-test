import React from 'react';
import brace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import AceEditor from 'react-ace';

const JsonEditor = ({ height, value, onChange }) => (
  <AceEditor
    mode="json"
    theme="github"
    wrapEnabled={true}
    width="100%"
    height={height}
    value={value}
    onChange={onChange}
  />
);

export default JsonEditor;