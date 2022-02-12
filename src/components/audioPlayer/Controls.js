import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../contexts/player/playerContext';
import styled from 'styled-components';

const PlayerControls = () => {
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

  const audio = useRef('audio_tag');

  const [statevolum, setStateVolum] = useState(0.3);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s;
  };

  const toggleAudio = () =>
    audio.current.paused ? audio.current.play() : audio.current.pause();

  const handleVolume = (q) => {
    setStateVolum(q);
    audio.current.volume = q;
  };

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };

  useEffect(() => {
    audio.current.volume = statevolum;
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
        ref={audio}
        type='audio/mpeg'
        preload='true'
<<<<<<< HEAD
        src={songs[currentSong] ? songs[currentSong].projectAudioLink : ''} />
      <div className="vlme">

        <span className="volum"><i className="fas fa-volume-down"></i></span>
        <input value={Math.round(statevolum * 100)} type="range" name="volBar" id="volBar" onChange={(e) => handleVolume(e.target.value / 100)} />

      </div>
      <div className="musicControls">
        <span className="prev" onClick={prevSong}><i className="fas fa-step-backward"></i></span>

        <span className="play" onClick={() => { togglePlaying(); toggleAudio(); }}>
          <span className={!playing ? '' : 'hide'}><i className="fas fa-play"></i></span>
          <span className={!playing ? 'hide' : ''}><i className="fas fa-pause"></i></span>
        </span>

        <span className="next" onClick={nextSong}><i className="fas fa-step-forward"></i></span>
      </div>
      <div className="progressb">
        <span className='songtitle'>{songs[currentSong] ? songs[currentSong].projectTitle : ''}</span>
        <span className="currentT">{fmtMSS(currentTime)}</span>
        <input
          onChange={handleProgress}
          value={dur ? (currentTime * 100) / dur : 0}
          type="range" name="progresBar" id="prgbar" />
        <span className="totalT">{fmtMSS(dur)}</span>

      </div>
      <div className="plsoptions">

        <span onClick={toggleRandom} className={"random " + (random ? 'active' : '')}>
          <i className="fas fa-random"></i>
        </span>
        <span onClick={toggleRepeat} className={"repeat " + (repeat ? 'active' : '')}>
          <i className="fas fa-redo-alt"></i>
        </span>
      </div>
    </div>
  );
};

export default Controls;


































=======
        src={songs[currentSong] ? songs[currentSong].projectAudioLink : ''}
      />
      <FeedWidth>
        <ControlButtons>
          <div className='ri-skip-back-fill' onClick={prevSong} />
          <Spacer />
          <div
            className={`playPause ${
              !playing ? 'ri-play-circle-fill' : 'ri-pause-circle-fill'
            }`}
            onClick={() => {
              togglePlaying();
              toggleAudio();
            }}
          />
          <Spacer />
          <div className='ri-skip-forward-fill' onClick={nextSong} />
          <Spacer />
          <div
            className={`random ri-shuffle-line ${random ? 'active' : ''}`}
            onClick={toggleRandom}
          />
          <Spacer />
          <div
            className={`repeat ri-repeat-line ${repeat ? 'active' : ''}`}
            onClick={toggleRepeat}
          />
        </ControlButtons>
        <Spacer size='5' />
        <BarWrapper>
          <div className='currentT'>{fmtMSS(currentTime)}</div>
          <Spacer size='2' />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <input
              onChange={handleProgress}
              value={dur ? (currentTime * 100) / dur : 0}
              type='range'
              name='progresBar'
              id='progressBar'
            />
            <div
              className='songtitle'
              style={{ position: 'absolute', bottom: 6, fontSize: 12 }}
            >
              {songs[currentSong] ? songs[currentSong].projectTitle : ''}
            </div>
          </div>
          <Spacer size='2' />
          <div className='totalT'>{fmtMSS(dur)}</div>
        </BarWrapper>
        <Spacer size='5' />
        <Volume>
          <div className='ri-volume-up-fill' />
          <Spacer />
          <input
            value={Math.round(statevolum * 100)}
            type='range'
            name='volBar'
            id='volBar'
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
  width: var(--feed-width);
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
    background: transparent;
    width: 100%;
  }

  .currentT,
  .totalT {
    width: 30px;
    line-height: 25px;
  }
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
>>>>>>> 1fadfa7d9ed72a0e49af59abe1238cc91af1c3b9
