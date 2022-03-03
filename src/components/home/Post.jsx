// modules
import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// global contexts
import { useUserInfo } from '../../contexts/UserContext.jsx';
import { usePosts } from '../../contexts/PostsContext.jsx';
import { usePlayer } from '../../contexts/player/playerContext';

// components
import ProfilePicture from '../ProfilePicture.jsx';
import { Hashtag } from './Hashtag.jsx';
import helpers from './helperFunctions.js';

const Post = (props) => {
  const { email } = useUserInfo();
  const {
    isPostUpdated,
    setIsPostUpdated,
    selectedProjectId,
    setSelectedProjectId,
  } = usePosts();
  const { SetCurrent, currentSong, songs, playing, togglePlaying } =
    usePlayer();

  // refs
  const canvas = React.useRef(null);
  const audio = React.useRef(null);

  const handleDeletePost = async (event) => {
    event.preventDefault();
    const postId = props.postId;
    await axios
      .post('https://api.soundtok.live/deletePost', { postId })
      .then((response) => {})
      .catch((error) => {});

    setIsPostUpdated(!isPostUpdated);
  };

  const handleRemix = (event) => {
    const postId = props.postId;
    setSelectedProjectId(postId);
  };

  const visualize = () => {
    audio.current.play();
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio.current);
    let analyser = context.createAnalyser();

    let ctx = canvas.current.getContext('2d');
    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    let bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.current.width;
    let HEIGHT = canvas.current.height;

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    let renderFrame = () => {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#253a4e';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        let r = 40;
        let g = 130 + 100 * (i / bufferLength);
        let b = 250 * (i / bufferLength);

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    renderFrame();
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
          <PostHeaderIconWrap>
            {props.userEmail === email ? (
              <PostIcon type="button" onClick={handleDeletePost}>
                <div className="ri-close-line" />
              </PostIcon>
            ) : null}
            <Spacer width="6" height="0" />
            <Link to="/studio">
              <PostIcon type="button" onClick={handleRemix}>
                <div className="ri-sound-module-line" />
              </PostIcon>
            </Link>
          </PostHeaderIconWrap>
        </PostHeader>
        <Hashtag text={props.postText}></Hashtag>
        <PostMedia>
          <PostImage>
            {props.projectImageLink ? (
              <img src={props.projectImageLink}></img>
            ) : null}
          </PostImage>
          <Spacer width="12" height="0" />
          <PostAudio
            onClick={() => {
              SetCurrent(props.index);
              visualize();
            }}
          >
            <Canvas ref={canvas}></Canvas>
            <audio
              ref={audio}
              src={props.projectAudioLink}
              crossOrigin="anonymous"
            ></audio>
          </PostAudio>
          <Spacer width="16" height="0" />
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

  p {
    width: 480px;

    a {
      color: #8ab4f8;
    }
  }
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

const PostHeaderIconWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostUsernameAndTime = styled.button`
  color: var(--font-line-color-yellow-transparent);
`;

const PostIcon = styled.button`
  display: flex;
  align-items: center;
  color: var(--font-line-color-yellow-transparent);
  font-size: 16px;

  &:hover {
    color: var(--font-line-color-yellow);
  }
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

const PostAudio = styled.div`
  flex-grow: 1;
  height: 96px;
  border-radius: 12px;
  box-sizing: border-box;
  background: transparent;
  margin-bottom: 4px;
  position: relative;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--main-color-blue-gradient-light);
  border-radius: inherit;
  z-index: 2;
`;

const PostAudioInfo = styled.div`
  font-size: 12px;
  margin-left: 12px;
  color: var(--font-line-color-yellow-transparent);
`;

const Spacer = styled.div`
  width: ${(props) => props.width || 1}px;
  height: ${(props) => props.height || 1}px;
`;
