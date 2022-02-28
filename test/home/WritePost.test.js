import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, act } from '../test-utils';
import WritePost from '../../src/components/home/WritePost.jsx';
import { PlayerProvider } from '../../src/contexts/player/playerContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';




const MockWritePost = () => {

  return (
    <UserInfoProvider>
      <PostsProvider>
        <PlayerProvider>
          <WritePost />
        </PlayerProvider>
      </PostsProvider>
    </UserInfoProvider>
  );
};



describe('WritePost', () => {


  test('WritePost should exist', () => {

    render(<MockWritePost />);

    expect(screen.getByRole('button', {
      name: /Post/i
    })).toBeInTheDocument;


    const postText = screen.getByPlaceholderText(/Project Title/i);
    fireEvent.change(postText, { target: { value: 'Good Day' } });
    expect(postText.value).toBe('Good Day');



  });




});
