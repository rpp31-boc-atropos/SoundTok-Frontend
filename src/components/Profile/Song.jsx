import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';

const SingleSong = styled.div`
  width: 30%;
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

const Song = () => {
  // const { user } = useAuth();
  return (
    <SingleSong>
      <SongHeader>
        <LogoButton>
          <Logo src='https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/56486518431_55caf6.jpg'></Logo>
        </LogoButton>
        <SongText>@Eiffel 65</SongText>
        <div>2:45</div>
        <PostRemixButton>
          <i className='ri-sound-module-line'></i>
        </PostRemixButton>
        <button>Select song for deletion</button>
      </SongHeader>
      <button>Play Song</button>
      <div>This song is great #meowmix</div>
      <SongText>Blue (Da Ba Dee)</SongText>
    </SingleSong>
  );
};

export default Song;