import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import REACT_APP_AUTH0 from '../../config/.auth0.js';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = REACT_APP_AUTH0.DOMAIN;
  const clientId = REACT_APP_AUTH0.CLIENT_ID;
  // const audience = REACT_APP_AUTH0.AUDIENCE;

  // const navigate = useNavigate();

  // const onRedirectCallback = (appState) => {
  //   navigate(appState?.returnTo || window.location.pathname);
  // };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
      // audience={audience}
      // scope = "openid profile email"
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
