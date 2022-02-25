import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { PostsProvider } from './contexts/PostsContext.jsx';
import { PlayerProvider } from './contexts/player/playerContext';
import { UserInfoProvider } from './contexts/UserContext.jsx';
import Auth0ProviderWithHistory from './components/authentication/Auth0.jsx';

ReactDOM.render(
  <HashRouter>
    <Auth0ProviderWithHistory>
      <UserInfoProvider>
        <PostsProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </PostsProvider>
      </UserInfoProvider>
    </Auth0ProviderWithHistory>
  </HashRouter>,
  document.getElementById('root')
);
