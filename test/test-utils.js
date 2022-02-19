//Create customized render to incorporate router and context providers

import React, { useState, useReducer } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from '../src/contexts/AuthContext'
import { PlayerProvider } from '../src/contexts/player/PlayerContext'
import playerReducer from '../src/contexts/player/playerReducer';
import dummy from '../src/components/Home/dummy';

const Providers = ({ children }) => {

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('visitor')

  const initialState = {
    currentSong: -1,
    songs: dummy,
    repeat: false,
    random: false,
    playing: false,
    audio: null,
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Set playing state
  const togglePlaying = () =>
    dispatch({ type: 'TOGGLE_PLAYING', data: state.playing ? false : true });
  // Set current song
  const SetCurrent = (id) => dispatch({ type: 'SET_CURRENT_SONG', data: id });

  // Prev song
  const prevSong = () => {
    if (state.currentSong === 0) {
      SetCurrent(state.songs.length - 1);
    } else {
      SetCurrent(state.currentSong - 1);
    }
  };
  // Next song
  const nextSong = () => {
    if (state.currentSong === state.songs.length - 1) {
      SetCurrent(0);
    } else {
      SetCurrent(state.currentSong + 1);
    }
  };

  // Repeat and Random
  const toggleRepeat = (id) =>
    dispatch({ type: 'TOGGLE_REPEAT', data: state.repeat ? false : true });
  const toggleRandom = (id) =>
    dispatch({ type: 'TOGGLE_RANDOM', data: state.random ? false : true });

  // End of Song
  const handleEnd = () => {
    // Check for random and repeat options
    if (state.random) {
      return dispatch({
        type: 'SET_CURRENT_SONG',
        data: ~~(Math.random() * state.songs.length),
      });
    } else {
      if (state.repeat) {
        nextSong();
      } else if (state.currentSong === state.songs.length - 1) {
        return;
      } else {
        nextSong();
      }
    }
  };




  const authContextValue = { login, setLogin, user, setUser }

  const playerContextValue = {
    currentSong: state.currentSong,
    songs: state.songs,
    repeat: state.repeat,
    random: state.random,
    playing: state.playing,
    audio: state.audio,
    nextSong,
    prevSong,
    SetCurrent,
    toggleRandom,
    toggleRepeat,
    togglePlaying,
    handleEnd,
  };



  return (
    <PlayerProvider value={playerContextValue}>
      <AuthProvider value={authContextValue}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </AuthProvider>
    </PlayerProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }