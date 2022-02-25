// modules
import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// contexts
import { useAuth0 } from '@auth0/auth0-react';
import { usePosts } from '../contexts/PostsContext.jsx';

// components
import WritePost from '../components/home/WritePost.jsx';
import FeedDrafts from '../components/home/FeedDrafts.jsx';
import Post from '../components/home/Post.jsx';
import dummy from '../components/home/dummy.jsx';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const { posts } = usePosts();

  // state
  const [textCharacterCount, setTextCharacterCount] = React.useState(0);
  const [postTitle, setPostTitle] = React.useState(null);
  const [uploadedAudio, setUploadedAudio] = React.useState(null);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [infoMessage, setInfoMessage] = React.useState(null);
  const [isDraftToggled, setIsDraftToggled] = React.useState(false);

  // refs
  const projectTitle = React.useRef(null);
  const projectText = React.useRef(null);

  React.useEffect(async () => {
    window.scroll(0, 0);
  }, []);

  return (
    <FeedWrapper>
      <Feed>
        {user && (
          <WritePost
            projectTitle={projectTitle}
            projectText={projectText}
            textCharacterCount={textCharacterCount}
            setTextCharacterCount={setTextCharacterCount}
            uploadedAudio={uploadedAudio}
            setUploadedAudio={setUploadedAudio}
            audioDuration={audioDuration}
            setAudioDuration={setAudioDuration}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            infoMessage={infoMessage}
            setInfoMessage={setInfoMessage}
            isDraftToggled={isDraftToggled}
            setIsDraftToggled={setIsDraftToggled}
          />
        )}
        {isDraftToggled && (
          <FeedDrafts
            projectTitle={projectTitle}
            projectText={projectText}
            textCharacterCount={textCharacterCount}
            setTextCharacterCount={setTextCharacterCount}
            uploadedAudio={uploadedAudio}
            setUploadedAudio={setUploadedAudio}
            audioDuration={audioDuration}
            setAudioDuration={setAudioDuration}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        )}
        {posts.map((post, i) => {
          return (
            <Post
              key={i}
              index={i}
              postId={post.postId}
              userEmail={post.userEmail}
              username={post.username}
              profilePicture={post.profilePicture}
              projectTitle={post.projectTitle}
              postText={post.postText}
              projectAudioLink={post.projectAudioLink}
              projectLength={post.projectLength}
              projectImageLink={post.projectImageLink}
              tags={post.tags}
              timePosted={post.timePosted}
            />
          );
        })}
      </Feed>
    </FeedWrapper>
  );
};

const FeedWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: scroll;
  overflow-x: hidden;
`;

const Feed = styled.div`
  max-width: var(--feed-width);
`;

export default Home;
