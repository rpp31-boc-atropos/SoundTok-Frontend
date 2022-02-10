import * as React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import WritePost from '../components/Home/WritePost.jsx';
import Post from '../components/Home/Post.jsx';

const Feed = styled.div`
  max-width: 600px;
  height: 100%;
  border-left: solid 1px;
  border-right: solid 1px;
  background: var(--main-color-black);
  border-color: var(--font-line-color-yellow-transparent)
`;

const Component = () => {

  const { user } = useAuth0();

  //start from the top on each page
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);


  return (
    <Feed>
      <WritePost></WritePost>
      <Post></Post>
      <Post></Post>
    </Feed>
  );
};

export default Component;
