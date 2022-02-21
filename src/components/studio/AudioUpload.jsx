import React from 'react';
import { AddAudioTrackWrapper, UploadIcon } from './Styles/styles';

const AudioUpload = ({HandleUpload}) => {

  return (
    <AddAudioTrackWrapper>
      <div className='audio-upload'>
        <input
          type='file'
          id='upload-audio'
          accept='audio/*'
          onChange={HandleUpload}
        ></input>
        <label htmlFor='upload-audio'>
          <UploadIcon></UploadIcon>
        </label>
      </div>
      <div >Add a new track</div>
    </AddAudioTrackWrapper>
  );
};

export default AudioUpload;