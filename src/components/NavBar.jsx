import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {

  const {loginWithRedirect, logout, isLoading, user} = useAuth0();
  console.log(user)
  return (
    <div>
      <ul className='nav'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/studio'>Studio</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>

        {!isLoading && !user && (
          <button
            onClick={()=> loginWithRedirect()}>
          Log In
          </button>
        )}

        {!isLoading && user && (
          <button
            onClick={()=> logout()}>
          Log Out
          </button>
        )}

      </ul>

    </div >
  );
};

export default NavBar;
