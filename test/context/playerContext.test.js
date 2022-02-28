import { render, screen } from '@testing-library/react';
import { PlayerContext, PlayerProvider } from '../../src/contexts/player/playerContext';
import { PostsProvider } from '../../src/contexts/PostsContext';
import { UserInfoProvider } from '../../src/contexts/UserContext';

describe('AuthProvider', () => {
  it('No defaut currentSong', () => {


    render(
      <UserInfoProvider>
        <PostsProvider>
          <PlayerProvider>
            <PlayerContext.Consumer>
              {(value) => <span>Defaut currentSong index is: {value.currentSong.toString()}</span>}
            </PlayerContext.Consumer>
          </PlayerProvider>
        </PostsProvider>
      </UserInfoProvider>
    );

    expect(screen.getByText('Defaut currentSong index is: -1')).toBeTruthy();
  });
});