import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import { usePlayer } from '../../contexts/player/playerContext';
import { PostsContext } from '../../contexts/PostsContext.jsx';
import ProfilePicture from '../ProfilePicture.jsx';
import helper from './helperFunctions.js';

const WritePost = (props) => {
  const { user } = useAuth0();
  const { songs } = usePlayer();
  const { posts, setPosts } = React.useContext(PostsContext);


  const [textCharacterCount, setTextCharacterCount] = React.useState(0);
  const [uploadedAudio, setUploadedAudio] = React.useState(null);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const [uploadedImage, setUploadedImage] = React.useState(null);

  const projectTitle = React.useRef(null);
  const projectText = React.useRef(null);

  // clear content when a post is made
  React.useEffect(() => {
    if (props.isPosted) {
      setTextCharacterCount(0);
      setUploadedAudio(null);
      setAudioDuration(0);
      setUploadedImage(null);
      projectTitle.current.value = null;
      projectText.current.value = null;
      props.setIsPosted(false);
    }
  }, [props.isPosted]);

  const handleTitleCharacterCount = (event) => {
    event.preventDefault();
    const count = event.target.value.length;
    if (count > 45) {
      event.target.value = event.target.value.slice(0, 45);
    }
  };

  const handleTextCharacterCount = (event) => {
    const maxCharacters = 140;
    event.preventDefault();
    const count = event.target.value.length;
    setTextCharacterCount(count);

    if (count >= maxCharacters) {
      event.target.value = event.target.value.slice(0, maxCharacters - 1);
    }
  };

  const handleAudio = (event) => {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dllt65qw');

    axios.post('https://api.cloudinary.com/v1_1/xoxohorses/video/upload', formData)
      .then((response) => {
        setUploadedAudio(response.data.url);
        setAudioDuration(response.data.duration);
      });
  };

  const handleImage = (event) => {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dllt65qw');

    axios.post('https://api.cloudinary.com/v1_1/xoxohorses/image/upload', formData)
      .then((response) => {
        setUploadedImage(response.data.url);
      });
  };

  const handlePost = (event) => {
    event.preventDefault();
    let title = projectTitle.current.value;
    let text = projectText.current.value;
    let tags = helper.parseTags(text);

    // isDraft: false
    // postId: 1
    // postLikes: 3
    // postText: "this post has no tags or image attached"
    // profilePicture: "https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg"
    // projectAudioLink: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_08_-_Downfall.mp3"
    // projectImageLink: null
    // projectLength: 23
    // projectTitle: "real quick"
    // tags: []
    // timePosted: "2021-11-11T18:34:49.915-08:00"
    // tracks: []
    // userEmail: "leggo@gmail.com"
    // username: "leggo"

    const post = {
      profilePicture: user.picture,
      timePosted: new Date(Date.now()).toISOString(),
      username: user.nickname,
      userEmail: user.email,
      postLikes: 0,
      isDraft: false,
      postText: text,
      tags: tags,
      projectAudioLink: uploadedAudio,
      projectTitle: title,
      projectLength: audioDuration,
      projectImageLink: uploadedImage,
      tracks: []
    };

    // TODO get post id before posting

    setPosts([post].concat(posts));
    props.setIsPosted(true);
    songs.unshift(post);
  };

  return (
    <WritePostWrapper>
      <ProfilePicture username={user.nickname} profilePicture={user.picture}/>
      <Form onSubmit={handlePost}>
        <FlexColumn>
          <Inputs>
            <FlexColumn>
              <PostHeader>
                <label htmlFor='project-title'>
                  <ProjectTitle
                    ref={projectTitle}
                    type='text'
                    id='project-title'
                    name='projectTitle'
                    maxlength='45'
                    rows='1'
                    cols='45'
                    placeholder='Project Title'
                    onChange={handleTitleCharacterCount}
                  ></ProjectTitle>
                </label>
                <AudioIcons>
                  <PostAudioIcon type='button'>
                    <label htmlFor='post-audio'>
                      <div className='ri-upload-2-line'/>
                    </label>
                    <UploadFile
                      type='file'
                      id='post-audio'
                      name='projectAudio'
                      accept='audio/*'
                      onChange={handleAudio}
                    ></UploadFile>
                  </PostAudioIcon>
                  <PostAudioIcon type='button'>
                    <div className='ri-folder-upload-line'/>
                  </PostAudioIcon>
                  <PostAudioIcon type='button'>
                    <Link to='/studio'>
                      <div className='ri-mic-line'/>
                    </Link>
                  </PostAudioIcon>
                  <PostAudioIcon type='button'>
                    <label htmlFor='post-image'>
                      <div className='ri-image-2-line'/>
                    </label>
                    <UploadFile
                      type='file'
                      id='post-image'
                      name='projectImage'
                      accept='image/*'
                      onChange={handleImage}
                    ></UploadFile>
                  </PostAudioIcon>
                </AudioIcons>
              </PostHeader>
              <label htmlFor='post-text'>
                <TextInput
                  ref={projectText}
                  id='post-text'
                  name='postText'
                  maxlength='140'
                  rows='4'
                  cols='70'
                  placeholder='Share your sound'
                  onChange={handleTextCharacterCount}
                ></TextInput>
              </label>
              <CharacterCount>
                <span>{textCharacterCount}</span>/140
              </CharacterCount>
            </FlexColumn>
            <FlexColumn>
              <UploadedAudio style={uploadedAudio ? {border: '1px solid var(--font-line-color-yellow)'} : null}>
                {audioDuration > 300 ? 'Audio length must be less than 5 min' : null}
                {uploadedImage ? <img src={uploadedImage}></img> : null}
              </UploadedAudio>
              <Submit type='submit'>Post</Submit>
            </FlexColumn>
          </Inputs>
        </FlexColumn>
      </Form>
    </WritePostWrapper>
  );
};

export default WritePost;

/* STYLED COMPONENTS */
const WritePostWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  border: 1px solid var(--font-line-color-yellow-transparent);
  border-bottom: none;
`;

const Form = styled.form`
  width: 100%;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Inputs = styled.div`
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProjectTitle = styled.input`
  width: 300px;
  line-height: 24px;
  margin-bottom: 4px;
  cursor: text;
`;

const AudioIcons = styled.div`
  width: 84px;
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PostAudioIcon = styled.button`
  display: inherit;
  align-items: inherit;
  color: var(--font-line-color-yellow-transparent);
  &:hover {
    color: var(--font-line-color-yellow);
  }
`;

const UploadFile = styled.input`
  display: none;
`;

const TextInput = styled.textarea`
  width: 400px;
  min-height: 20px;
  max-height: 96px;
  background: none;
  box-sizing: border-box;
  border-top: 1px solid var(--font-line-color-yellow-transparent);
  border-bottom: 1px solid var(--font-line-color-yellow);
  padding: 4px 0px 12px 0px;
  font-family: inherit;
  font-size: 20px;
  color: var(--font-line-color-yellow);
  overflow-wrap: break-word;
  overflow: hidden;
  cursor: text;
`;

const CharacterCount = styled.span`
  font-size: 12px;
  color: var(--font-line-color-yellow-transparent);
`;

const UploadedAudio = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: var(--main-color-blue-light);
  margin-left: 12px;
  margin-bottom: 6px;

  img {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
`;

const Submit = styled.button`
  width: 96px;
  height: 24px;
  align-self: flex-end;
  text-align: center;
  background: var(--sound-bar-green);
  border-radius: 8px;

  &:hover {
    background: var(--sound-bar-green-light);
  }
`;

const Spacer = styled.div`
  width: ${(props) => (props.width || 1) * 6}px;
  height: ${(props) => (props.height || 1) * 6}px;
`;