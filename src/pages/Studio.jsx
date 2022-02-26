import React, { useState, useEffect } from 'react';
import { AllButtons, ButtonTop, ButtonWrapper, ControlBarWrapper, DraftTitle, DraftWrapper, EditorWrapper, EffectButton, FastForward, Header, Highligther, MainPanel, MoveAudio, Pause, Play, PlayerControls, Rewind, RightPanel, Select, Stop, StudioHeader, StudioWrapper } from '../components/studio/Styles/styles.js';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading.jsx';
import WaveformPlaylist from 'waveform-playlist';
import AudioUpload from '../components/studio/AudioUpload.jsx';
import axios from 'axios';
import EventEmitter from 'events';
import { saveAs } from 'file-saver';
import * as Tone from 'tone';
import DraftList from '../components/studio/DraftList.jsx';
import ReverbModal from '../components/studio/ReverbModal.jsx';
import Modal from 'react-modal';
import { useUserInfo } from '../contexts/UserContext.jsx';
import { usePosts } from '../contexts/PostsContext.jsx';

const Studio = () => {

  let toneCtx = Tone.getContext();
  let audioCtx = toneCtx.rawContext;
  let analyser = audioCtx.createAnalyser();

  const [ee] = useState(new EventEmitter());
  const [playlist, setPlayList] = useState(null);
  const [trackSaver, setTrackSaver] = useState(1);

  // User email from global context
  let {email} = useUserInfo();
  let {drafts, isDraftUpdated, setIsDraftUpdated} = usePosts();

  ee.on('audiorenderingstarting', function(offlineCtx) {
    // Set Tone offline to render effects properly.
    const offlineContext = new Tone.OfflineContext(offlineCtx);
    Tone.setContext(offlineContext);
  });
  // const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  ee.on('audiorenderingfinished', function (type, data) {
    //restore original ctx for further use.
    Tone.setContext(toneCtx);
    if (type === 'wav') {
      saveAs(data, `track${trackSaver}.wav`);
      setTrackSaver(trackSaver + 1);
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
    // playlist.load(draft.tracks);
    console.log('draft: ', draft);

    // setFlag(true);
    setIsLoading(true);
    playlist.load(draft.tracks)
      .then(()=>{
        playlist.initExporter();
        setIsLoading(false);
      });
  };

  const handleNewDraft = () => {
    removeAllTracks();
  };

  const handleSaveDraft = () => {

    let hasEffect = false;

    if (playlist.tracks.length > 0) {
      let draftPlaylist = playlist.getInfo().tracks;

      draftPlaylist.forEach(elem => {
        if (elem.effects !== '') {
          hasEffect = true;
          return;
        }
      });

      if (hasEffect) {
        draftPlaylist.forEach(val => {
          if (val.effects !== '') {
            val.effects = function(graphEnd, masterGainNode) {
              var effects = new Tone.Reverb(1.2);

              Tone.connect(graphEnd, effects);
              Tone.connect(effects, masterGainNode);

              return function cleanup() {
                effects.disconnect();
                effects.dispose();
              };
            };
          }
        });

        //console.log(draftPlaylist);
        saveDraftToAPI(draftPlaylist);
      } else {
        //console.log(playlist.getInfo().tracks);
        saveDraftToAPI(playlist.getInfo().tracks);
      }
    }

  };

  const handleEffects = (updatedPlaylist) => {
    removeAllTracks();
    // ee.emit('clear');

    //console.log('playlist updated Playlist: ', updatedPlaylist);

    for (let i = 0; i < updatedPlaylist.length; i++) {
      //console.log(typeof updatedPlaylist[i].effects === 'string');
      if (typeof updatedPlaylist[i].effects === 'string' && updatedPlaylist[i].effects !== '') {

        updatedPlaylist[i].effects = function(graphEnd, masterGainNode) {
          var effects = new Tone.Reverb(5);

          Tone.connect(graphEnd, effects);
          Tone.connect(effects, masterGainNode);

          return function cleanup() {
            effects.disconnect();
            effects.dispose();
          };
        };


      }
    }

    playlist.load(updatedPlaylist);

  };

  const handleUpload = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'erjfh8e7');

    axios.post('https://api.cloudinary.com/v1_1/poyraz96/video/upload', formData)
      .then(result => {
        console.log(result);
        playlist.load([{
          src: result.data.url,
          name: 'Track'
        }])
          .then(()=>{
            playlist.initExporter();
            console.log(playlist);
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


  return (
    <StudioWrapper>
      <StudioHeader>
        <div>
          <Header>Audio Creation Tool</Header>
        </div>
        <ButtonWrapper>
          <ButtonTop onClick={() => { ee.emit('clear'); }}>Clear</ButtonTop>
          <ButtonTop role='download' onClick={() => { ee.emit('startaudiorendering', 'wav'); }}>Download</ButtonTop>
          <ButtonTop onClick={handleSaveDraft}>Save</ButtonTop>
        </ButtonWrapper>
      </StudioHeader>
      <EditorWrapper>
        <MainPanel id='editor'>
          {isLoading ? <Loading /> : null}
        </MainPanel>
        <RightPanel style={{maxHeight: '100%'}}>
          <DraftTitle>Drafts</DraftTitle>
          <DraftWrapper>
            <DraftList setDraft={handleSetDraft} newDraft={handleNewDraft} />
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
            {playlist ? <ReverbModal playlist={playlist} handleEffects={handleEffects}/> : <EffectButton>Reverb</EffectButton>}
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
