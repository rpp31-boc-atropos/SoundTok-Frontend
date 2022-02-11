import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleSong = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid var(--font-line-color-yellow-transparent);
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

const SongText = styled.p``;

const Song = (props) => {
  // const { user } = useAuth();

  const deleteSong = () => {
    // add confirmation popup?
    props.removeSong(props.songId, 'Posts');
  };

  return (
    <SingleSong>
      <SongHeader>
        <LogoButton>
          <Logo src={props.profilePicture}></Logo>
        </LogoButton>
        <SongText>{props.username}</SongText>
        <div>{props.projectLength}</div>
        <Link to='/studio'>
          <PostRemixButton>
            <i className='ri-sound-module-line'></i>
          </PostRemixButton>
        </Link>
        <button onClick={() => deleteSong()}>XX</button>
      </SongHeader>
      <button>Play Song</button>
      <div>{props.postDescription}</div>
      <SongText>{props.projectTitle}</SongText>
    </SingleSong>
  );
};

export default Song;