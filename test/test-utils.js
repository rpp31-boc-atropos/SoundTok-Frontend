//Create customized render to incorporate router and context providers

import React, { useState, useReducer } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from '../src/contexts/AuthContext'
import { PlayerProvider } from '../src/contexts/player/PlayerContext'
import playerReducer from '../src/contexts/player/playerReducer';
import dummy from '../src/components/Home/dummy';

const Providers = ({ children }) => {


  //   const authContextValue = { login, setLogin, user, setUser }

  //   const playerContextValue = {
  //     currentSong: state.currentSong,
  //     songs: state.songs,
  //     repeat: state.repeat,
  //     random: state.random,
  //     playing: state.playing,
  //     audio: state.audio,
  //     nextSong,
  //     prevSong,
  //     SetCurrent,
  //     toggleRandom,
  //     toggleRepeat,
  //     togglePlaying,
  //     handleEnd,
  //   };


  //only keep the react router provider, and comment out the optional providers

  return (
    // <PlayerProvider value={playerContextValue}>
    // <AuthProvider value={authContextValue}>
    < MemoryRouter >
      {children}
    </MemoryRouter >
    // </AuthProvider>
    // </PlayerProvider >
  )

}

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }




