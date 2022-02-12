import React from 'react';
import styled from 'styled-components';
import Search from './SearchBar.jsx'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// const NavStyle = styled.div`
//   max-width: 850px;
//   height: 20px;
//   position: fixed;
//   border-color: var(--font-line-color-yellow-transparent)
// `;


const NavBar = () => {

  const {loginWithRedirect, logout, isLoading, user} = useAuth0();

  return (

    <ul className='nav'>
      <li className='logo'>
        <Link to='/'>SoundTok</Link>
      </li>
      <li>
        <Link to='/studio'>Studio</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <Search />
      {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      {!isLoading && user && (
        <button onClick={() => logout()}>Log Out</button>
      )}
    </ul>

  );
};

export default NavBar;
