import React, { useState, useEffect } from 'react';
import { AddAudioTrackWrapper, AllButtons, Button1, ButtonWrapper, ControlBarWrapper, Draft, DraftTitle, DraftWrapper, EditorWrapper, EffectButton, FastForward, Header, Highligther, LeftPanel, MidPanel, MoveAudio, Pause, Play, PlayerControls, Rewind, RightPanel, Stop, StudioHeader, StudioWrapper, UploadAudioWrapper, UploadIcon, VolumeDown, VolumeUp } from '../components/studio/Styles/styles.js';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';
import WaveformPlaylist from 'waveform-playlist';
import axios from 'axios';

const Studio = () => {

  const [playlist, setPlayList] = useState(null);
  const [count, setCount] = useState(1);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'erjfh8e7');

    axios.post('https://api.cloudinary.com/v1_1/poyraz96/video/upload', formData)
      .then(result => {
        // console.log(result);
        playlist.load([{
          src: result.data.url,
          name: `Track #${count}`
        }]);
        setCount(count + 1);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  useEffect(() => {
    setPlayList(WaveformPlaylist({
      samplesPerPixel: 1000,
      waveHeight: 164,
      barWidth: 3,
      barGap: 1,
      timescale: true,
      container: document.getElementById('editor'),
      state: 'cursor',
      colors: {
        waveOutlineColor: 'rgb(255, 250, 206)',
        timeColor: 'purple',
        fadeColor: 'purple',
      },
      controls: {
        show: true,
        width: 180,
        widgets: {
          stereoPan: false,
          collapse: false
        }
      },
      zoomLevels: [1000],
    }));
  }, []);


  return (
    <StudioWrapper>
      <StudioHeader>
        <div>
          <Header>Audio Creation Tool</Header>
        </div>
        <ButtonWrapper>
          <Button1>Download</Button1>
          <Button1>Save</Button1>
          <Button1>Post</Button1>
        </ButtonWrapper>
      </StudioHeader>
      <EditorWrapper>
        <MidPanel id='editor'>


        </MidPanel>
        <RightPanel>
          <DraftTitle>Drafts</DraftTitle>
          <DraftWrapper>
            <Draft>Project #1</Draft>
            <Draft>Project #2</Draft>
            <Draft>Project #3</Draft>
            <Draft>Project #4</Draft>
            <Draft>Project #5</Draft>
            <Draft>Project #6</Draft>
          </DraftWrapper>
        </RightPanel>
      </EditorWrapper>
      <ControlBarWrapper>
        <AddAudioTrackWrapper>
          <div className='audio-upload'>
            <input
              type='file'
              id='upload-audio'
              accept='audio/*'
              onChange={handleUpload}
            ></input>
            <label htmlFor='upload-audio'>
              <UploadIcon></UploadIcon>
            </label>
          </div>
          <div >Add a new track</div>
        </AddAudioTrackWrapper>
        <PlayerControls>
          <AllButtons>
            <Pause onClick={() => { playlist.getEventEmitter().emit('pause'); }}></Pause>
            <Play onClick={() => { playlist.getEventEmitter().emit('play'); playlist.getEventEmitter().emit('automaticscroll', 'true'); }}></Play>
            <Stop onClick={() => { playlist.getEventEmitter().emit('stop'); }}></Stop>
            <Rewind onClick={() => { playlist.getEventEmitter().emit('rewind'); }}></Rewind>
            <FastForward onClick={() => { playlist.getEventEmitter().emit('fastforward'); }}></FastForward>
            <MoveAudio></MoveAudio>
            <Highligther></Highligther>
            <EffectButton>Fade In</EffectButton>
            <EffectButton>Fade Out</EffectButton>
            <EffectButton>Trim</EffectButton>
          </AllButtons>
        </PlayerControls>
      </ControlBarWrapper>
    </StudioWrapper>
  );
};

export default withAuthenticationRequired(Studio, {
  onRedirecting: () => <Loading />,
});
