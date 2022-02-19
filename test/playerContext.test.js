/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { PlayerContext, PlayerProvider } from '../src/contexts/player/playerContext';

describe('AuthProvider', () => {
  it('No defaut currentSong', () => {


    render(
      <PlayerProvider>
        <PlayerContext.Consumer>
          {(value) => <span>Defaut currentSong index is: {value.currentSong.toString()}</span>}
        </PlayerContext.Consumer>
      </PlayerProvider>
    );

    expect(screen.getByText('Defaut currentSong index is: -1')).toBeTruthy();
  });
});