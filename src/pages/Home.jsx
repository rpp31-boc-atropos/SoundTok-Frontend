import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { useAuth0 } from '@auth0/auth0-react';
import { usePosts } from '../contexts/PostsContext.jsx';

import WritePost from '../components/home/WritePost.jsx';
import Post from '../components/home/Post.jsx';
import dummy from '../components/home/dummy.jsx';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const { posts } = usePosts();

  React.useEffect(async () => {
    window.scroll(0, 0);
  }, []);

  return (
    <FeedWrapper>
      <Feed>
        {user && (
          <WritePost
            username={user}
            // isPostUpdated={isPostUpdated}
            // setIsPostUpdated={setIsPostUpdated}
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
              // isPostUpdated={isPostUpdated}
              // setIsPostUpdated={setIsPostUpdated}
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
