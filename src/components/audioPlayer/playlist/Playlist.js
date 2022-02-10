import React from 'react';
import { usePlayer } from '../../../contexts/player/playerContext';


import { songsArr } from './songs';

//Playlist will be replaced by the feeds

const Playlist = () => {
  const { SetCurrent, currentSong, songs } = usePlayer();

  return (
    <div className="playlist">

      <span>Play List</span>

      <div className="songlist">
        <ul className="loi">
          {
            songsArr.map((song, i) =>
              <li className={'songContainer ' + (currentSong === i ? 'selected' : '')} key={i} onClick={() => { SetCurrent(i); }}>
                <i className="fas fa-music"></i>
                <span className="song">{song[0]}</span>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
