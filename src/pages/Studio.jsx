import React, { useState, useEffect } from 'react';
import { AllButtons, ButtonTop, ButtonWrapper, CloseModalIcon, ControlBarWrapper, DraftTitle, DraftWrapper, EditorWrapper, EffectButton, FastForward, Header, Highligther, MainPanel, ModalHeader, MoveAudio, Pause, Play, PlayerControls, ReverbModalWrapper, Rewind, RightPanel, Select, Stop, StudioHeader, StudioWrapper, TrackName, TrackNameWrapper } from '../components/studio/Styles/styles.js';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';
import WaveformPlaylist from 'waveform-playlist';
import AudioUpload from '../components/studio/AudioUpload.jsx';
import axios from 'axios';
import EventEmitter from 'events';
import { saveAs } from 'file-saver';
import * as Tone from 'tone';
import DraftList from '../components/studio/DraftList.jsx';
import Modal from 'react-modal';
import { useUserInfo } from '../contexts/UserContext.jsx';
import { usePosts } from '../contexts/PostsContext.jsx';
import ReverbFunc from '../components/studio/effectHelpers.js';

const Studio = () => {

  let toneCtx = Tone.getContext();
  let audioCtx = toneCtx.rawContext;
  let analyser = audioCtx.createAnalyser();

  const [ee] = useState(new EventEmitter());
  const [playlist, setPlayList] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User email from global context
  let {email} = useUserInfo();
  let {drafts, isDraftUpdated, setIsDraftUpdated, selectedProjectId, setSelectedProjectId} = usePosts();

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 300,
      left: 665,
      right: 665,
      bottom: 300,
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

  ee.on('audiorenderingstarting', function(offlineCtx) {
    // Set Tone offline to render effects properly.
    const offlineContext = new Tone.OfflineContext(offlineCtx);
    Tone.setContext(offlineContext);
  });

  ee.on('audiorenderingfinished', function (type, data) {
    //restore original ctx for further use.
    Tone.setContext(toneCtx);
    if (type === 'wav') {
      saveAs(data, 'track.wav');
    }
  });

  // ADDED METHODS
  const removeAllTracks = () => {
    let tracksToRemove = [...playlist.tracks];
    for (let i = 0; i < tracksToRemove.length; i++) {
      playlist.removeTrack(tracksToRemove[i]);
    }
  };

  // API METHODS
  const saveDraftToAPI = (tracks) => {
    if (tracks.length > 0) {

      let reqBody = {
        email: email,
        projectTitle: 'Draft #' + (drafts.length + 1),
        projectLength: 300,
        projectAudioLink: '',
        tracks: JSON.stringify(tracks),
        timePosted: new Date().toISOString()
      };

      //console.log(playlist.getInfo());
      console.log('saving: ', reqBody);
      axios.post('https://api.soundtok.live/drafts', reqBody)
        .then((response) => {
          console.log('save successful, ', response);
          setIsDraftUpdated(!isDraftUpdated);
        })
        .catch((error) => {
          console.log('save fail ', error);
        });
    }
    // console.log(playlist);
  };

  const handleSetDraft = (draft) => {
    removeAllTracks();

    console.log('draft: ', draft);

    setIsLoading(true);
    playlist.load(draft.tracks)
      .then(()=>{
        playlist.initExporter();
        setIsLoading(false);
      });
  };

  const handleSaveDraft = () => {

    let currPlaylist = playlist.getInfo().tracks;
    saveDraftToAPI(currPlaylist);

  };

  const handleEffects = (trackIndex) => {

    let updated = playlist.getInfo().tracks;

    for (let i = 0; i < updated.length; i++) {
      if (i === trackIndex) {
        updated[i].effects = ReverbFunc();
      }
    }

    removeAllTracks();
    playlist.load(updated);
    setModalIsOpen(false);
  };

  const handleUpload = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'erjfh8e7');

    axios.post('https://api.cloudinary.com/v1_1/poyraz96/video/upload', formData)
      .then(result => {
        // console.log(result);
        playlist.load([{
          src: result.data.secure_url,
          name: 'Track'
        }])
          .then(()=>{
            playlist.initExporter();
            setIsLoading(false);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setPlayList(WaveformPlaylist({
      ac: audioCtx,
      samplesPerPixel: 1000,
      waveHeight: 131,
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
      effects: function(masterGainNode, destination, isOffline) {
        // analyser nodes don't work offline.
        if (!isOffline) { masterGainNode.connect(analyser); }
        masterGainNode.connect(destination);
      }
    }, ee));

    Modal.setAppElement('#editor');
  }, []);

  useEffect(() => {

    if (selectedProjectId != null) {
      axios.get(`https://api.soundtok.live/drafts/id/${selectedProjectId}`)
        .then(result => {
          if (result.data[0].email !== email) {
            playlist.load([{
              src: result.data[0].projectaudiolink,
              name: `${result.data[0].username}'s track`
            }]);
          } else {
            playlist.load(result.data[0].tracks);
          }
          setSelectedProjectId(null);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [playlist]);


  return (
    <StudioWrapper>
      <StudioHeader>
        <div>
          <Header>Audio Creation Tool</Header>
        </div>
        <ButtonWrapper>
          <ButtonTop role='button' onClick={() => { ee.emit('clear'); }}>Clear</ButtonTop>
          <ButtonTop role='button' onClick={() => { ee.emit('startaudiorendering', 'wav'); }}>Download</ButtonTop>
          <ButtonTop role='button' onClick={handleSaveDraft}>Save</ButtonTop>
        </ButtonWrapper>
      </StudioHeader>
      <EditorWrapper>
        <MainPanel id='editor'>
          {isLoading ? <Loading /> : null}
        </MainPanel>
        <RightPanel style={{maxHeight: '100%'}}>
          <DraftTitle>Drafts</DraftTitle>
          <DraftWrapper>
            <DraftList setDraft={handleSetDraft} />
          </DraftWrapper>
        </RightPanel>
      </EditorWrapper>
      <ControlBarWrapper>
        <AudioUpload HandleUpload={handleUpload}/>
        <PlayerControls>
          <AllButtons>
            <Pause onClick={() => { ee.emit('pause'); }}></Pause>
            <Play onClick={() => { ee.emit('play'); ee.emit('automaticscroll', 'true'); }}></Play>
            <Stop onClick={() => { ee.emit('stop'); }}></Stop>
            <Rewind onClick={() => { ee.emit('rewind'); }}></Rewind>
            <FastForward onClick={() => { ee.emit('fastforward'); }}></FastForward>
            <MoveAudio onClick={() => { ee.emit('statechange', 'shift'); }}></MoveAudio>
            <Highligther onClick={() => { ee.emit('statechange', 'select'); }}></Highligther>
            <EffectButton onClick={() => { setModalIsOpen(true); }}>Reverb</EffectButton>
            <Modal style={modalStyles} isOpen={modalIsOpen}>
              <ReverbModalWrapper>
                <ModalHeader>Select Track</ModalHeader>
                <CloseModalIcon onClick={() => { setModalIsOpen(false); }}></CloseModalIcon>
              </ReverbModalWrapper>
              {playlist && playlist.tracks.length > 0 ?
                <TrackNameWrapper>
                  {playlist.tracks.map((elem, i) => {
                    return (
                      <TrackName onClick={() => { handleEffects(i); }} key={i}>Track {i + 1}</TrackName>
                    );
                  })}
                </TrackNameWrapper> : null}
            </Modal>
            <EffectButton onClick={() => { ee.emit('statechange', 'fadein'); }}>Fade In</EffectButton>
            <EffectButton onClick={() => { ee.emit('statechange', 'fadeout'); }}>Fade Out</EffectButton>
            <EffectButton onClick={() => { ee.emit('trim'); }}>Trim</EffectButton>
            <EffectButton onClick={() => { ee.emit('statechange', 'cursor'); }}>Cursor</EffectButton>
          </AllButtons>
        </PlayerControls>
      </ControlBarWrapper>
    </StudioWrapper>
  );
};

export default withAuthenticationRequired(Studio, {
  onRedirecting: () => <Loading />,
});
