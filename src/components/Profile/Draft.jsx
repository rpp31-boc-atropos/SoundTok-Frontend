import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DraftWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
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

const Draft = (props) => {
  // const { user } = useAuth();
  const deleteDraft = () => {
    // Stretch goal - add confirmation popup
    props.removeDraft(props.songId, 'Drafts');
  };

  return (
    <DraftWrapper>
      <DraftHeader>
        <DraftText>{props.projectLength}</DraftText>
        <Link to='/studio'>
          <PostRemixButton>
            <i className='ri-sound-module-line'></i>
          </PostRemixButton>
        </Link>
        <button onClick={() => deleteDraft()}>XX</button>
      </DraftHeader>
      <DraftText>{props.projectTitle}</DraftText>
      <DraftText>{props.postDescription}</DraftText>
      <button>Play Draft</button>
    </DraftWrapper>
  );
};

export default Draft;