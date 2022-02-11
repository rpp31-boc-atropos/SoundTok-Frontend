import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';

const DraftWrapper = styled.div`
  width: 30%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-line-color-yellow-transparent);
`;

const DraftHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const PostRemixButton = styled.button`
  color: var(--font-line-color-yellow-transparent);
  font-size: 16px;

  &:hover {
    color: var(--font-line-color-yellow);
  }
`;

const DraftText = styled.p``;
const Draft = () => {

  // const { user } = useAuth();

  return (
    <DraftWrapper>
      <DraftHeader>
        <DraftText>2:34</DraftText>
        <PostRemixButton>
          <i className='ri-sound-module-line'></i>
        </PostRemixButton>
      </DraftHeader>
      <DraftText>This draft is great #meowinprogress</DraftText>
      <button>Play Draft</button>
    </DraftWrapper>
  );
};

export default Draft;