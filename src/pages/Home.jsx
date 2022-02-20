import * as React from 'react';
import styled from 'styled-components';

import { PostsContext } from '../contexts/PostsContext.jsx';
import { useAuth0 } from '@auth0/auth0-react';

import WritePost from '../components/home/WritePost.jsx';
import Post from '../components/home/Post.jsx';

import dummy from '../components/home/dummy.jsx';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth0();
  const [ isPosted, setIsPosted ] = React.useState(false);
  const [ posts, setPosts ] = React.useState(dummy);

  React.useEffect(async () => {
    window.scroll(0, 0);
    // const result = await axios(
    //   'http://54.91.250.255:1234/',
    // );

    // console.log(result.data)

    // setPosts(result.data);
  }, [isPosted]);

  return (
    <PostsContext.Provider value={{posts, setPosts}}>
      <FeedWrapper>
        <Feed>
          {
            user &&
          <WritePost
            username={user}
            isPosted={isPosted}
            setIsPosted={setIsPosted}
          />
          }
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
    </PostsContext.Provider>
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

