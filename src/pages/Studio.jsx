import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth0} from '@auth0/auth0-react';
import Upload from '../components/Upload.jsx';
import { AllButtons, Button1, ButtonWrapper, ControlBarWrapper, Draft, DraftTitle, DraftWrapper, EditorWrapper, EffectButton, FastForward, Header, LeftAudioTrack, LeftPanel, MidPanel, Pause, Play, PlayerControls, Rewind, RightPanel, Stop, StudioHeader, StudioWrapper, VolumeDown, VolumeUp } from '../components/Studio/Styles/styles.js';
import WaveVisualizer from '../components/Studio/WaveVisualizer.jsx';


const Studio = () => {

  // const { user } = useAuth0();

  // //get query from url
  // //example, /studio?id=250, get the id number from the query
  // const query = new URLSearchParams(useLocation().search);

  //Nested routes

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
            <EffectButton>Fade In</EffectButton>
            <EffectButton>Fade Out</EffectButton>
          </AllButtons>
        </PlayerControls>
      </ControlBarWrapper>
    </StudioWrapper>
  );
};

export default Studio;
