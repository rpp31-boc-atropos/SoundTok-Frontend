import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../contexts/player/playerContext';
import styled from 'styled-components';

import ProfilePicture from '../ProfilePicture.jsx';

const PlayerControls = (props) => {
  const {
    currentSong,
    songs,
    nextSong,
    prevSong,
    repeat,
    random,
    playing,
    toggleRandom,
    toggleRepeat,
    togglePlaying,
    handleEnd,
  } = usePlayer();

  // const props.mainAudio = useRef('audio_tag');

  const [statevolume, setStateVolume] = useState(0.3);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
  };

  const toggleAudio = () => {
    props.mainAudio.current.paused
      ? props.mainAudio.current.play()
      : props.mainAudio.current.pause();
  };

  const handleVolume = (q) => {
    setStateVolume(q);
    props.mainAudio.current.volume = q;
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    props.mainAudio.current.currentTime = compute;
  };

  useEffect(() => {
    props.mainAudio.current.volume = statevolume;
    if (playing) {
      toggleAudio();
    }
  }, [currentSong]);

  return (
    <Wrapper>
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDur(e.target.duration)}
        onEnded={handleEnd}
        ref={props.mainAudio}
        type="audio/mpeg"
        preload="true"
        src={songs[currentSong] ? songs[currentSong].projectAudioLink : ''}
      />
      <FeedWidth>
        <ControlButtons>
          <div className="ri-skip-back-fill" onClick={prevSong} role="prev" />
          <Spacer />
          <div
            className={`playPause ${
              !playing ? 'ri-play-circle-fill' : 'ri-pause-circle-fill'
            }`}
            onClick={() => {
              togglePlaying();
              toggleAudio();
            }}
            role="play"
          />
          <Spacer />
          <div
            className="ri-skip-forward-fill"
            onClick={nextSong}
            role="next"
          />
          <Spacer />
          <div
            className={`random ri-shuffle-line ${random ? 'active' : ''}`}
            onClick={toggleRandom}
            role="random"
          />
          <Spacer />
          <div
            className={`repeat ri-repeat-line ${repeat ? 'active' : ''}`}
            onClick={toggleRepeat}
            role="repeat"
          />
        </ControlButtons>
        <Spacer size="5" />
        <BarWrapper>
          <div className="currentT" role="currentTime">
            {fmtMSS(currentTime)}
          </div>
          <Spacer size="2" />
          <Bar>
            <input
              onChange={handleProgress}
              value={dur ? (currentTime * 100) / dur : 0}
              type="range"
              name="progresBar"
              id="progressBar"
              role="progressBar"
            />
            <div
              className="songtitle"
              style={{ position: 'absolute', bottom: 6, fontSize: 12 }}
              role="songTitle"
            >
              {songs[currentSong] ? songs[currentSong].projectTitle : ''}
            </div>
          </Bar>
          <Spacer size="2" />
          <div className="totalT" role="totalTime">
            {fmtMSS(dur)}
          </div>
        </BarWrapper>
        <Spacer size="3" />
        <ProfilePicture
          username={songs[currentSong] ? songs[currentSong].username : null}
          profilePicture={
            songs[currentSong] ? songs[currentSong].profilePicture : null
          }
          size="36"
        />
        <Volume role="volume">
          <div className="ri-volume-up-fill" />
          <Spacer />
          <input
            value={Math.round(statevolume * 100)}
            type="range"
            name="volBar"
            id="volBar"
            onChange={(e) => handleVolume(e.target.value / 100)}
          />
        </Volume>
      </FeedWidth>
    </Wrapper>
  );
};

export default PlayerControls;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: #128110;
  color: #ffface;
`;

const FeedWidth = styled.div`
  width: var(--bar-width);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;

  div {
    cursor: pointer;
  }
  .playPause {
    font-size: 36px;
  }

  div:hover {
    color: var(--main-color-blue-gradient-dark);
  }
  div.active {
    color: var(--main-color-blue-gradient-light);
  }
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  #progressBar {
    display: table;
    background: transparent;
    width: 100%;
  }

  .currentT,
  .totalT {
    width: 30px;
    line-height: 25px;
  }
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Volume = styled.div`
  display: flex;
  align-content: center;
  overflow: hidden;
  width: 25px;
  transition: all 500ms;

  &:hover {
    width: 90px;
    #volBar {
      display: block;
    }
  }

  #volBar {
    padding: 0;
    margin: 0;
    width: 50px;
    background: transparent;
    display: none;
  }

  #volBar::-moz-range-thumb {
    height: 10px;
    width: 3px;
    background: #ffface;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Spacer = styled.div`
  width: ${(props) => (props.size || 1) * 6}px;
`;
