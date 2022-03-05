import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import UserProfile from '../../src/components/profile/UserProfile.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';
import { PostsProvider } from '../../src/contexts/PostsContext';

const MockProfile = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <UserProfile
            isCurrentUser={true}
            setIsCurrentUser={() => {}}
            profileName={'rickkunz'}
            setProfileName={() => {}}
          ></UserProfile>
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('Profile', () => {
  test('Profile should exist', () => {
    render(<MockProfile />);
    expect(screen.getAllByRole('profilePicture')).toBeInTheDocument;
  });
});