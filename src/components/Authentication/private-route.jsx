import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../Loading.jsx';

const PrivateRoute = ({ element, ...args }) => (
  <Route
    element={withAuthenticationRequired(element, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

export default PrivateRoute;