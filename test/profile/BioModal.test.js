import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import BioModal from '../../src/components/profile/BioModal.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import dummyProfile from '../../src/components/profile/dummyProfile.jsx';

const MockProfileUpdate = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <BioModal
            isOpen={true}
            currentBio={dummyProfile.bio}
            closeModal={() => {}}
            handleUpdateProfile={() => {}}
            profilePicture={dummyProfile.profilePicture}
          />
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('BioModal', () => {
  test('BioModal should exist', () => {
    render(<MockProfileUpdate />);
    //  expect(screen.getByRole('heading')).toBeInTheDocument;
    expect(screen.getAllByRole('bioInstructions')).toBeInTheDocument;
  });
});