import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from './test-utils';
import App from '../src/App.jsx';
import { PostsProvider } from '../src/contexts/PostsContext';
import { UserInfoProvider } from '../src/contexts/UserContext';
import { PlayerProvider } from '../src/contexts/player/playerContext';

const MockApp = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('App', () => {

  // // this test doesn't improve the coverage

  //   test('NavBar should exist', () => {
  //     render(<MockApp />);

  //     expect(screen.getByText(/SoundTok/i)).toBeInTheDocument();
  //   });


  test('landing on a bad page', () => {
    render(<MockApp />, { initialRoutes: ["/random"] });
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });


  // test("renders hashtag page", () => {
  //   render(<MockApp />, { initialRoutes: ["/hashtag?q=cat"] });
  //   expect(screen.getByText(/#Hashtag: cat/i)).toBeInTheDocument();
  // });

});