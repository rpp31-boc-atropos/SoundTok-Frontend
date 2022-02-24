import * as React from 'react';
import styled from 'styled-components';
import dummy from './dummy.jsx';

const FeedDrafts = (props) => {
  const [drafts, setDrafts] = React.useState([]);

  return (
    <Wrapper>
      <Spacer width="80" height="80" />
      <Content>
        {dummy.map((draft, i) => {
          return <Draft key={i}>{draft.projectTitle}</Draft>;
        })}
      </Content>
      <Spacer width="80" height="80" />
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
`;

const Content = styled.div`
  display: inherit;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const Draft = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 12px;
  background: var(--main-color-blue-gradient-light);
`;

const Spacer = styled.div`
  width: ${(props) => props.width || 1}px;
  height: ${(props) => props.height || 1}px;
`;
