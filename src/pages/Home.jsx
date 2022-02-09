import * as React from 'react';
import styled from 'styled-components';

import { useAuth } from '../contexts/AuthContext.jsx';
import Feed from '../components/Home/Feed.jsx';

const Home = styled.div`
  max-width: 600px;
  height: 100%;
  border: solid 1px;
  background: var(--main-color-black);
  border-color: var(--font-line-color-yellow-transparent)
`;

const Component = () => {

  const { user } = useAuth();

  //start from the top on each page
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);


  return (
    <Home>
      <Feed></Feed>
    </Home>
  );
};

export default Component;
