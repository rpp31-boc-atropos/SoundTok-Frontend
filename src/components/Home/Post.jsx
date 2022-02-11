import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* STYLED COMPONENTS */
const PostWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-line-color-yellow-transparent);
`;

const ProfilePicButton = styled.a`
  overflow: hidden;
`;

const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
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

const PostText = styled.p``;

const PostAudio = styled.div`
  width: 100%;
  height: 96px;
  border-radius: 12px;
  box-sizing: border-box;
  background: var(--main-color-blue-light);
`;

const PostAudioInfo = styled.div`
  font-size: 12px;
  margin-left: 12px;
  color: var(--font-line-color-yellow-transparent);
`;

const secondsToLength = (seconds) => {
  let length;
  if (seconds < 60) {
    length = seconds + 's';
  } else {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    if (sec < 10) {
      sec = '0' + sec;
    }

    length = min + ':' + sec;
  }

  return length;
};

const Post = (props) => {
  return (
    <PostWrapper>
      <ProfilePicButton>
        <ProfilePic src={props.profilePicture}></ProfilePic>
      </ProfilePicButton>
      <PostContent>
        <PostHeader>
          <PostUsernameAndTime>
            @{props.username} · <time>3h</time>
          </PostUsernameAndTime>
          <Link to='/studio'>
            <PostRemixButton>
              <i className='ri-sound-module-line'></i>
            </PostRemixButton>
          </Link>
        </PostHeader>
        <PostText>{props.postText}</PostText>
        <PostAudio></PostAudio>
        <PostAudioInfo>
          {props.projectTitle} · {secondsToLength(props.projectLength)}
        </PostAudioInfo>
      </PostContent>
    </PostWrapper>
  );
};

export default Post;
