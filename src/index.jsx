import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { PlayerProvider } from './contexts/player/playerContext';
import { HashRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './components/authentication/Auth0.jsx';

ReactDOM.render(
  <HashRouter>
    <Auth0ProviderWithHistory>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </Auth0ProviderWithHistory>
  </HashRouter>,
  document.getElementById('root')
);
