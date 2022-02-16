import { render, screen, cleanup } from '@testing-library/react';
import { HashRouter, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth0ProviderWithHistory from '../src/components/Authentication/Auth0.jsx';
import { useAuth0 } from '@auth0/auth0-react';

import { PlayerProvider } from '../src/contexts/player/playerContext.js';
import Home from '../src/pages/Home.jsx';
import WritePost from '../src/components/Home/WritePost.jsx';
import Post from '../src/components/Home/Post.jsx';

// if (!navigator.userAgent.includes('jsdom')) {
//   const client = new Auth0Client();
// }

describe('Authentication', () => {
  beforeEach(() => {
    const renderHome = render(
      <PlayerProvider>
        <HashRouter>
          {/* <Auth0ProviderWithHistory> */}
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          {/* </Auth0ProviderWithHistory> */}
        </HashRouter>
      </PlayerProvider>
    );
  });
  afterEach(() => { cleanup; });

  xit('is required to see WritePost component', async () => {
    // const { getByRole } = renderHome({ user: 'username' });
    console.log({ renderHome });
  });

  xit('is required when navigating to studio', () => {});

  xit('is required when clicking record button', () => {});

  xit('is required when clicking remix button', () => {});
});

describe('Posts', () => {
  xit('should allow user to navigate to profile when clicking on username or profile picture', () => {});

  xit('should send audio link to studio when user remixes', () => {});

  xit('should display hashtags as clickable links', () => {});

  xit('should play and pause post\'s song by clicking on play button', () => {});
});
