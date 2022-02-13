import React, { useState } from 'react';
import { AllButtons, Button1, ButtonWrapper, ControlBarWrapper, Draft, DraftTitle, DraftWrapper, EditorWrapper, EffectButton, FastForward, Header, Highligther, LeftAudioTrack, LeftPanel, MidPanel, MoveAudio, Pause, Play, PlayerControls, Rewind, RightPanel, Stop, StudioHeader, StudioWrapper, VolumeDown, VolumeUp } from '../components/Studio/Styles/styles.js';
import WaveVisualizer from '../components/Studio/WaveVisualizer.jsx';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';

const Studio = () => {


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
        <LeftPanel>
          <LeftAudioTrack>
            <div>Mute</div>
            <div>
              <VolumeDown></VolumeDown>
              <VolumeUp></VolumeUp>
            </div>
          </LeftAudioTrack>
          <LeftAudioTrack>
            <div>Add a new track +</div>
          </LeftAudioTrack>
        </LeftPanel>
        <MidPanel>
          <WaveVisualizer />
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
        <PlayerControls>
          <AllButtons>
            <Pause></Pause>
            <Play></Play>
            <Stop></Stop>
            <Rewind></Rewind>
            <FastForward></FastForward>
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
