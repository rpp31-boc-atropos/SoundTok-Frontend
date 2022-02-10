import React, { useReducer, createContext } from 'react';
import playerReducer from './playerReducer';
import { songsArr } from '../../components/audioPlayer/playlist/songs';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {

  const initialState = {
    currentSong: 0,
    songs: songsArr,
    repeat: false,
    random: false,
    playing: false,
    audio: null
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Set playing state
  const togglePlaying = () => dispatch({ type: 'TOGGLE_PLAYING', data: state.playing ? false : true });
  // Set current song
  const SetCurrent = id => dispatch({ type: 'SET_CURRENT_SONG', data: id });

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
  const toggleRepeat = (id) => dispatch({ type: 'TOGGLE_REPEAT', data: state.repeat ? false : true });
  const toggleRandom = (id) => dispatch({ type: 'TOGGLE_RANDOM', data: state.random ? false : true });


  // End of Song
  const handleEnd = () => {
    // Check for random and repeat options
    if (state.random) {
      return dispatch({ type: 'SET_CURRENT_SONG', data: ~~(Math.random() * state.songs.length) });
    } else {
      if (state.repeat) {
        nextSong();
      } else if ((state.currentSong === state.songs.length - 1)) {
        return;
      } else {
        nextSong();
      }
    }
  };

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
    handleEnd
  };

  return <PlayerContext.Provider value={playerContextValue}>
    {children}
  </PlayerContext.Provider>;

};


const usePlayer = () => React.useContext(PlayerContext);

export { PlayerContext, PlayerProvider, usePlayer };