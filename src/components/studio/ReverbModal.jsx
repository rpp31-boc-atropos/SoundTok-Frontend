import React, { useEffect, useState } from 'react';
import { CloseModalIcon, EffectButton, ModalHeader, ReverbModalWrapper, TrackName, TrackNameWrapper } from './Styles/styles';
import Modal from 'react-modal';
import * as Tone from 'tone';

const ReverbModal = ({playlist, handleEffects}) => {

  const [open, Setopen] = useState(false);
  const [currentTracks, setcurrentTracks] = useState([]);

  useEffect(() => {
    console.log('useEffect modal: ', playlist);
    if (playlist.tracks.length > 0 || currentTracks.length > 0) {
      setcurrentTracks(playlist.getInfo().tracks);
    }
  }, [playlist.tracks]);

  console.log('playlist from modal component: ', playlist);
  console.log('curentTracks from modal component: ', currentTracks);
  const handleTrackSelection = (trackIndex) => {

    // console.log(trackIndex);

    currentTracks[trackIndex].effects = function(graphEnd, masterGainNode) {
      var effects = new Tone.Reverb(1.2);

      Tone.connect(graphEnd, effects);
      Tone.connect(effects, masterGainNode);

      return function cleanup() {
        effects.disconnect();
        effects.dispose();
      };
    };
    handleEffects(currentTracks);
    Setopen(false);

  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 250,
      left: 650,
      right: 650,
      bottom: 250,
      backgroundColor: 'rgb(255, 250, 206)',
      border: '2px solid rgb(255, 250, 206)',
      borderRadius: '5px',
      zIndex: 15
    },
    content: {
      top: '30px',
      left: '30px',
      right: '30px',
      bottom: '30px',
      zIndex: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  };



  return (
    <>
      <EffectButton onClick={() => { Setopen(true); }}>Reverb</EffectButton>
      <Modal style={modalStyles} isOpen={open}>
        <ReverbModalWrapper>
          <ModalHeader>Select Track</ModalHeader>
          <CloseModalIcon onClick={() => { Setopen(false); }}></CloseModalIcon>
        </ReverbModalWrapper>
        {currentTracks.length > 0 &&
        <TrackNameWrapper>
          {currentTracks.map((elem, i) => {
            return (
              <TrackName onClick={() => { handleTrackSelection(i); }} key={i}>Track {i + 1}</TrackName>
            );
          })}
        </TrackNameWrapper>}
      </Modal>
    </>
  );

};

export default ReverbModal;