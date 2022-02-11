import React from 'react';
import './AudioPlayer.css';
import './input.css';
import Playlist from './playlist/Playlist';
import Controls from './Controls';

//Replace the playlist with feeds

const AudioPlayer = () => {
  return (
    <div className='main'>
      <div className='right'>{/* <Playlist /> */}</div>
      <Controls />
    </div>
  );
};

export default AudioPlayer;
