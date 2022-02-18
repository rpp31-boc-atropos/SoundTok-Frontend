import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleSong = styled.div`
  width: 30%;
  height: 220px;
  padding: 16px;
  margin: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid var(--font-line-color-yellow-transparent);
`;

const LogoButton = styled.button`
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 2px solid var(--font-line-color-yellow);
`;

const SongHeader = styled.div`
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

const CornerWrapper = styled.div`
  display:flex;
  flex-direction: column;
`;

const SongText = styled.p``;

const Song = (props) => {
  // const { user } = useAuth();

  const deleteSong = () => {
    props.removeSong(props.songId, 'Posts');

  };
  //possibly make song image the background
  return (
    <SingleSong>
      <SongHeader>
        <LogoButton>
          <Logo src={props.songImage}></Logo>
        </LogoButton>
        <div>{props.projectLength}</div>
        <CornerWrapper>
          <Link to='/studio'>
            <PostRemixButton>
              <i className='ri-sound-module-line'></i>
            </PostRemixButton>
          </Link>
          {props.isCurrentUser && <button onClick={() => deleteSong()}>XX</button>}
        </CornerWrapper>
      </SongHeader>
      <button>Play Song</button>
      <div>{props.songDescription}</div>
      <SongText>{props.projectTitle}</SongText>
    </SingleSong>
  );
};

export default Song;