import React from 'react';
// import { useAuth } from '../../contexts/AuthContext.jsx';
import styled from 'styled-components';

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

const Song = () => {

  // const { user } = useAuth();

  return (
    <SingleSong>
      <LogoButton>
        <Logo src='https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/56486518431_55caf6.jpg'></Logo>
      </LogoButton>
      {/* <img alt='logo' src='https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/56486518431_55caf6.jpg'></img> */}
      <div>@Eiffel 65</div>
      <div>This song is great #meowmix</div>
      <h2>Blue (Da Ba Dee)</h2>
      {/* <div>2:45</div> */}
      <button>Play Song</button>
      <button>Use Track in Studio</button>

    </SingleSong>
  );
};

export default Song;