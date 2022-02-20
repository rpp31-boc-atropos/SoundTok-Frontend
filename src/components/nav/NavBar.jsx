import React from 'react';
import Search from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
// import { getId } from 'wavesurfer.js/src/util';


const NavBar = () => {

  const {loginWithRedirect, logout, isLoading, user, getAccessTokenSilently, isAuthenticated} = useAuth0();


  return (
    <ul className="nav">
      <li className="logo">
        <Link to="/">SoundTok</Link>
      </li>
      <li>
        <Link to="/studio">Studio</Link>
      </li>

      <Search />

      <li>
        <Link to="/profile">Profile</Link>
      </li>

      {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}


      {!isLoading && user && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img
            src={user.picture}
            style={{
              height: "30pt",
              borderRadius: "50%",
              paddingRight: "10px",
            }}
          />
          <button onClick={() => logout()}>Log Out</button>
        </div>
      )}

    </ul>
  );
};

export default NavBar;
