import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '../test-utils';
import Home from '../../src/pages/Home.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';



const MockHome = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <Home />
        </PlayerProvider>
      </PostsProvider >
    </UserInfoProvider>
  );
};



describe('WritePost', () => {

  //overwrite window.scroll
  window.scroll = (x, y) => {
    document.documentElement.scrollTop = y;
  };


  // write the tests under the render
  test('Home should exist', () => {
    render(<MockHome />);





  });




});
