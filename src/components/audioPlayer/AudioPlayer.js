import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './AudioPlayer.css';
import './input.css';
// import Playlist from './playlist/Playlist';
import PlayerControls from './Controls';
import { useLocation } from "react-router-dom";


const Main = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

const AudioPlayer = () => {

  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(
    path !== "/studio" ? true : false
  );

  useEffect(() => {
    setDisplay(path !== "/studio" ? true : false);
  }, [path]);


  return (

    <Main>
      {display && <PlayerControls />}
    </Main>

  );
};

export default AudioPlayer;







