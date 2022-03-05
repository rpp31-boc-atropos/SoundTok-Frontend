import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './input.css';
// import Playlist from './playlist/Playlist';
import PlayerControls from './Controls';
import { useLocation } from 'react-router-dom';

const Main = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
`;

const AudioPlayer = (props) => {
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(path !== '/studio' ? true : false);

  useEffect(() => {
    setDisplay(path !== '/studio' ? true : false);
  }, [path]);

  return (
    <Main>
      {display && (
        <PlayerControls
          mainAudio={props.mainAudio}
          currentAudio={props.currentAudio}
        />
      )}
    </Main>
  );
};

export default AudioPlayer;
