import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import Draft from '../../src/components/profile/Draft.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import dummySongs from '../../src/components/profile/dummySongs.jsx';

const MockDraft = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <Draft
            key={1}
            postId={dummySongs[0].postId}
            projectTitle={dummySongs[0].projectTitle}
            songDescription={dummySongs[0].projectDescription}
            projectAudioLink={dummySongs[0].projectAudioLink}
            projectLength={dummySongs[0].projectLength}
            tags={dummySongs[0].tags}
            removeDraft={() => {}}
          />
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('SingleDraft', () => {
  test('SingleDraft should exist', () => {
    render(<MockDraft />);
    //  expect(screen.getByRole('heading')).toBeInTheDocument;
    expect(screen.getAllByRole('draftTitle')).toBeInTheDocument;
  });
});