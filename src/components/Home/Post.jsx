import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { usePlayer } from '../../contexts/player/playerContext';
import ProfilePicture from '../ProfilePicture.jsx';
import helpers from './helperFunctions.js';

const Post = (props) => {
  const { SetCurrent, currentSong, songs } = usePlayer();

  // const handlePlaySong = () => {
  //   SetCurrent(props.index);
  // };

  return (
    <PostWrapper>
      <ProfilePicture username={props.username} profilePicture={props.profilePicture}/>
      <PostContent>
        <PostHeader>
          <PostUsernameAndTime>
            <Link to={'/profile/' + props.username}>@{props.username}</Link>
            {' · '}
            <time>{helpers.isoToTimeAgo(props.timePosted)}</time>
          </PostUsernameAndTime>
          <Link to='/studio'>
            <PostRemixButton>
              <i className='ri-sound-module-line'></i>
            </PostRemixButton>
          </Link>
        </PostHeader>
        <PostText>{props.postText}</PostText>
        <PostAudio
          onClick={(event) => {
            SetCurrent(props.index);
          }}
        ></PostAudio>
        <PostAudioInfo>
          {props.projectTitle} · {helpers.secondsToLength(props.projectLength)}
        </PostAudioInfo>
      </PostContent>
    </PostWrapper>
  );
};

export default Post;

/* STYLED COMPONENTS */
const PostWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  background: var(--main-color-black);
  border: 1px solid var(--font-line-color-yellow-transparent);
  border-bottom: none;
`;

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
  overflow: hidden;
`;

const PostContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const PostUsernameAndTime = styled.button`
  color: var(--font-line-color-yellow-transparent);
`;

const PostRemixButton = styled.button`
  color: var(--font-line-color-yellow-transparent);
  font-size: 16px;

  &:hover {
    color: var(--font-line-color-yellow);
  }
`;

const PostText = styled.p`
  width: 480px;
`;

const PostAudio = styled.button`
  width: 480px;
  height: 96px;
  border-radius: 12px;
  box-sizing: border-box;
  background: var(--main-color-blue-light);
  background-image: url('./wave.png');
  margin-bottom: 4px;
`;

const PostAudioInfo = styled.div`
  font-size: 12px;
  margin-left: 12px;
  color: var(--font-line-color-yellow-transparent);
`;
