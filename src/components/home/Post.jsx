import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { useUserInfo } from '../../contexts/UserContext.jsx';
import { PostsContext } from '../../contexts/PostsContext.jsx';
import { usePlayer } from '../../contexts/player/playerContext';

import ProfilePicture from '../ProfilePicture.jsx';
import helpers from './helperFunctions.js';

const Post = (props) => {
  const { user } = useAuth0();
  const { username, email, profilePic } = useUserInfo();
  const { SetCurrent, currentSong, songs } = usePlayer();
  const { posts, setPosts } = React.useContext(PostsContext);

  // console.log({ username, email, profilePic });

  const handleDeletePost = (event) => {
    const postId = props.postId;
    // axios.post('http://localhost:1234/', {userEmail: props.userEmail})
    // .then((response) => {
    // setPosts(posts.filter((post) => {post.postId !== postId}))
    // })
    // .catch((error) => {

    // })
  };

  return (
    <PostWrapper>
      <ProfilePicture
        username={props.username}
        profilePicture={props.profilePicture}
      />
      <PostContent>
        <PostHeader>
          <PostUsernameAndTime>
            <Link to={'/profile/' + props.username}>@{props.username}</Link>
            {' · '}
            <time>{helpers.isoToTimeAgo(props.timePosted)}</time>
          </PostUsernameAndTime>
          <Link to="/studio">
            {/* TODO: implement trash functionality if post is by user */}
            {/* {(user.isAuthenticated && (props.userEmail === user.email)) ?
              <PostIcon onClick={handleDeletePost}><div className="ri-close-line"/></PostIcon> : null
            } */}
            <PostIcon>
              <div className="ri-sound-module-line" />
            </PostIcon>
          </Link>
        </PostHeader>
        <PostText>{props.postText}</PostText>
        <PostMedia>
          <PostImage>
            {props.projectImageLink ? (
              <img src={props.projectImageLink}></img>
            ) : null}
          </PostImage>
          <Spacer width="2" height="0" />
          <PostAudio
            onClick={() => {
              SetCurrent(props.index);
            }}
          />
          <Spacer width="2.5" height="0" />
        </PostMedia>
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

const PostIcon = styled.button`
  color: var(--font-line-color-yellow-transparent);
  font-size: 16px;

  &:hover {
    color: var(--font-line-color-yellow);
  }
`;

const PostText = styled.p`
  width: 480px;
`;

const PostMedia = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostImage = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 12px;
  background: var(--main-color-blue-gradient-light);

  img {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
`;

const PostAudio = styled.button`
  flex-grow: 1;
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

const Spacer = styled.div`
  width: ${(props) => (props.width || 1) * 6}px;
  height: ${(props) => (props.height || 1) * 6}px;
`;
