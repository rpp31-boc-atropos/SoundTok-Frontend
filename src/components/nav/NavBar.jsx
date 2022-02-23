import React, { useEffect, useState } from 'react';
import Search from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserInfo } from '../../contexts/UserContext.jsx';
import ProfilePicture from '../ProfilePicture.jsx';
import axios from 'axios';
// import { getId } from 'wavesurfer.js/src/util';

const NavBar = () => {
  const {
    loginWithRedirect,
    logout,
    isLoading,
    isAuthenticated,
  } = useAuth0();

  const { username, profilePic } = useUserInfo();
  return (
    <ul className="nav">
      <li className="logo" >
        <Link to="/">SoundTok</Link>
      </li>
      <li>
        <Link to="/studio">Studio</Link>
      </li>

      <Search />

      <li>
        <Link to="/profile">Profile</Link>
      </li>

      {!isLoading && !isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      {!isLoading && isAuthenticated && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
          <ProfilePicture username={username} profilePicture={profilePic} size={'30'} />
          <button onClick={() => logout()}>Log Out</button>
        </div>
      )}
    </ul>
  );
};

export default NavBar;

// <div
        //   style={{
        //     display: 'flex',
        //     justifyContent: 'space-evenly',
        //     alignItems: 'center',
        //   }}
        // >
        //   <img
        //     src={profilePic}
        //     style={{
        //       height: '30pt',
        //       borderRadius: '50%',
        //       paddingRight: '10px',
        //     }}
        //   />