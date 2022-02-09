import * as React from 'react';
import styled from 'styled-components';

import Post from './Post.jsx';

const Feed = styled.section`
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Component = () => {
  return (
    <Feed>
      <Post></Post>
    </Feed>
  );
};

export default Component;