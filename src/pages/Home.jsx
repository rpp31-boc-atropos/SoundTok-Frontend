import * as React from 'react';
import styled from 'styled-components';

import { PostsContext } from '../contexts/PostsContext.jsx';
import { useAuth0 } from '@auth0/auth0-react';

import WritePost from '../components/Home/WritePost.jsx';
import Post from '../components/Home/Post.jsx';

import dummy from '../components/Home/dummy.jsx';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth0();
  const [ posts, setPosts ] = React.useState(dummy);

  // React.useEffect(async () => {
  //   window.scroll(0, 0);
  //   const result = await axios(
  //     'http://localhost:1234/',
  //   );

  //   console.log(result.data)

  //   setPosts(result.data);
  // }, []);

  return (
    <PostsContext.Provider value={{posts, setPosts}}>
      <FeedWrapper>
        <Feed>
          {user && <WritePost username={user}/>}
          {posts.map((post, i) => {
            return (
              <Post
                key={i}
                index={i}
                userId={post.user_id}
                postId={post.post_id}
                projectId={post.project_id}
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
          <Spacer></Spacer>
        </Feed>
      </FeedWrapper>
    </PostsContext.Provider>
  );
};

const FeedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: scroll;
  overflow-x: hidden;
`;

const Feed = styled.div`
  max-width: var(--feed-width);
`;

const Spacer = styled.div`
  height: 60px;
`;

export default Home;

