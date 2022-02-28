import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import PhotoCard from '../../src/components/hashtag/PhotoCard';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import dummy from '../../src/components/home/dummy';

const MockPhotoCard = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <PhotoCard post={dummy[0]} index={0} />
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};

describe('PhotoCard', () => {

  test('PhotoCard should exist', () => {

    render(<MockPhotoCard />);
    //  expect(screen.getByRole('heading')).toBeInTheDocument;
    expect(screen.getAllByRole('photoCardPlay')).toBeInTheDocument;

  });


});