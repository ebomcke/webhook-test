import React from 'react';
import ReactDOM from 'react-dom';
import { curi } from '@curi/router';
import { parse, stringify } from 'qs';
import Hash from '@hickory/hash';
import { curiProvider } from '@curi/react-dom';

import routes from './routes';
import App from './App';

const history = Hash({
  query: { parse, stringify },
});
const router = curi(history, routes);
const Router = curiProvider(router);

router.once(() => {
  ReactDOM.render(
    <Router>
      {({ response, router }) => {
        return <App router={router} response={response} />;
      }}
    </Router>,
    document.getElementById('root'),
  );
});
