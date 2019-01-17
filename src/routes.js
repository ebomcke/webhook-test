import { prepareRoutes } from '@curi/router';

import SignIn from './views/SignIn';
import Endpoints from './views/Endpoints';
import Endpoint from './views/Endpoint';
import NewEndpoint from './views/NewEndpoint';
import CreateAccount from './views/CreateAccount';
import Activity from './views/Activity';

export default prepareRoutes([
  {
    name: 'SignIn',
    path: 'sign-in',
    response: () => ({
      body: SignIn,
    }),
  },
  {
    name: 'Home',
    path: '',
    response: () => ({
      body: Activity,
    }),
  },
  {
    name: 'CreateAccount',
    path: 'create-account',
    response: () => ({
      body: CreateAccount,
    }),
  },
  {
    name: 'Endpoints',
    path: 'endpoint',
    response: () => ({
      body: Endpoints,
    }),
  },
  {
    name: 'NewEndpoint',
    path: 'endpoint/new',
    response: () => ({
      body: NewEndpoint,
    }),
  },
  {
    name: 'Endpoint',
    path: 'endpoint/:endpointId',
    response: () => ({
      body: Endpoint,
    }),
  },
  {
    name: 'Catch All',
    path: '(.*)',
    response: () => ({
      body: Endpoints,
    }),
  },
]);
