import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import Song from '../../src/components/profile/Song.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import dummySongs from '../../src/components/profile/dummySongs.jsx';

const MockSong = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <Song
            key={1}
            postId={dummySongs[0].postId}
            projectImageLink={dummySongs[0].projectImageLink}
            projectTitle={dummySongs[0].projectTitle}
            songDescription={dummySongs[0].projectDescription}
            projectAudioLink={dummySongs[0].projectAudioLink}
            projectLength={dummySongs[0].projectLength}
            tags={dummySongs[0].tags}
            removeSong={() => {}}  //how do you mock these??
            isCurrentUser={() => {}}
          />
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('SingleSong', () => {
  test('SingleSong should exist', () => {
    render(<MockSong />);
    //  expect(screen.getByRole('heading')).toBeInTheDocument;
    expect(screen.getAllByRole('profilePlaySong')).toBeInTheDocument;
  });
});