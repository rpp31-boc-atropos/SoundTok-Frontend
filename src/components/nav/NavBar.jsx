import React from 'react';
import Search from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserInfo } from '../../contexts/UserContext.jsx';
import ProfilePicture from '../ProfilePicture.jsx';

// const Nav = styled.div`
//   width: 100%;
//   min-height: 1.5em;
//   display: flex;
//   align-items: center;
//   padding: 2px 15px;
// `;


const NavBar = () => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  const { username, profilePic } = useUserInfo();

  return (
    <div className="nav">
      <div className="logo" >
        <Link to="/">SoundTok</Link>
      </div>
      <div>
        <Link to="/studio">Studio</Link>
      </div>
      <Search />
      <div>
        <Link to={`/profile/${username}`}>Profile</Link>
      </div>

      {!isLoading && !isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      {!isLoading && isAuthenticated && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <ProfilePicture
            username={username}
            profilePicture={profilePic}
            size={"30"}
          />
          <button onClick={() => logout()}>Log Out</button>
        </div>
      )}

    </div>
  );
};

export default NavBar;
