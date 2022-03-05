import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import UserPosts from '../../src/components/profile/UserPosts.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';
import { PostsProvider } from '../../src/contexts/PostsContext';

const MockPosts = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <UserPosts
            isCurrentUser={true}
            setIsCurrentUser={() => {}}
            profileName={'rickkunz'}
          ></UserPosts>
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('UserPosts', () => {
  test('UserPosts component should exist', () => {
    render(<MockPosts />);
    //  expect(screen.getByRole('heading')).toBeInTheDocument;
    expect(screen.getAllByRole('postSelect')).toBeInTheDocument;
  });
});