import React from 'react';
import styled from 'styled-components';
import './AudioPlayer.css';
import './input.css';
import Playlist from './playlist/Playlist';
import PlayerControls from './Controls';

//Replace the playlist with feeds

const Main = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

const AudioPlayer = () => {
  return (
    <Main>
      <PlayerControls />
    </Main>
  );
};

export default AudioPlayer;
