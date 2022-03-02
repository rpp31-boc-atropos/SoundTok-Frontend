import * as React from 'react';
import styled from 'styled-components';

import { usePosts } from '../../contexts/PostsContext.jsx';

import dummy from './dummy.jsx';
import helper from './helperFunctions.js';

const FeedDrafts = (props) => {
  const { drafts } = usePosts();

  return (
    <Wrapper>
      <Spacer width="70" />
      <Content>
        {drafts.map((draft, i) => {
          return (
            <Draft
              key={i}
              type="button"
              onClick={(event) => {
                props.projectTitle.current.value = draft.projectTitle;
                props.projectText.current.value = draft.postText;
                props.setTextCharacterCount(draft.postText.length);
                props.setUploadedImage(draft.projectImageLink);
                props.setUploadedAudio(draft.projectAudioLink);
              }}
            >
              <img src={draft.projectImageLink}></img>
            </Draft>
          );
        })}
      </Content>
      <Spacer width="50" />
    </Wrapper>
  );
};

export default FeedDrafts;

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  border: 1px solid var(--font-line-color-yellow-transparent);
  border-bottom: none;
  background: var(--main-color-black);
`;

const Content = styled.div`
  display: inherit;
  align-items: center;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const Draft = styled.button`
  width: 96px;
  height: 96px;
  margin: 12px;
  border-radius: 12px;
  background: var(--main-color-blue-gradient-light);
  overflow: hidden;

  img {
    width: 96px;
    height: 96px;
    border-radius: 12px;
  }
`;

const Spacer = styled.div`
  width: ${(props) => props.width || 48}px;
  height: ${(props) => props.height || 48}px;
`;
