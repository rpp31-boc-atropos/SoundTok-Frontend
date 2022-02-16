import * as React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import WritePost from '../components/Home/WritePost.jsx';
import Post from '../components/Home/Post.jsx';

import dummy from '../components/Home/dummy.jsx';
import axios from 'axios';

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

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [posts, setPosts] = React.useState(dummy);

  /* Example for fetching data from DB

  const [data, setData] = React.useState({ data: [] })
  console.log(data)
  React.useEffect(async () => {
    const result = await axios(
      'http://localhost:1234/',
    );
    setData(result.data);
  }, []);
  */
  // debugger;

  //start from the top on each page
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <FeedWrapper>
      <Feed>
        {user && <WritePost username={user}/>}
        {posts.map((post, i) => {
          return (
            <Post
              key={i}
              index={i}
              username={post.username}
              profilePicture={post.profilePicture}
              projectTitle={post.projectTitle}
              postText={post.postText}
              projectAudioLink={post.projectAudioLink}
              projectLength={post.projectLength}
              tags={post.tags}
              timePosted={post.timePosted}
            />
          );
        })}
        <Spacer></Spacer>
      </Feed>
    </FeedWrapper>
  );
};

export default Home;
